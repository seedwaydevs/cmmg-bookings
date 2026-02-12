"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/db";
import { bookingSchema } from "@/lib/schemas";

function makeInvoiceNumber() {
  const year = new Date().getFullYear();
  return `INV-${year}-${Date.now()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
}

export async function createBooking(formData: FormData) {
  const raw = {
    service: String(formData.get("service") ?? ""),
    packageId: String(formData.get("packageId") ?? ""),
    date: String(formData.get("date") ?? ""),
    bookingName: String(formData.get("bookingName") ?? ""),
    bookingSurname: String(formData.get("bookingSurname") ?? ""),
    email: String(formData.get("email") ?? "")
      .toLowerCase()
      .trim(),
  };

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false as const,
      message: "Please correct the form and try again.",
    };
  }

  const bookingDate = new Date(parsed.data.date);
  if (Number.isNaN(bookingDate.getTime())) {
    return {
      success: false as const,
      message: "Invalid date/time.",
    };
  }

  // ---- File (optional for now)
  const idCopyFile = formData.get("IdCopy");
  let idCopyKey: string | null = null;
  if (idCopyFile instanceof File && idCopyFile.size > 0) {
    if (idCopyFile.size > 5 * 1024 * 1024) {
      return {
        success: false as const,
        message: "ID copy file must be under 5MB.",
      };
    }
    idCopyKey = await uploadToStorage(idCopyFile);
  }

  // ---- Load package from DB (server-side source of truth)
  const pkg = await db.servicePackage.findFirst({
    where: {
      id: parsed.data.packageId,
      service: parsed.data.service,
      isActive: true,
    },
    select: {
      id: true,
      minutes: true,
      priceCents: true,
      currency: true,
    },
  });

  if (!pkg) {
    return {
      success: false as const,
      message: "That package is not available.",
    };
  }
  const vatCents = Math.round(pkg.priceCents * 0.15);
  // ---- Transaction: Booking (PENDING) + Invoice (ISSUED)
  const result = await db.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        service: parsed.data.service,
        date: bookingDate,
        bookingName: parsed.data.bookingName,
        bookingSurname: parsed.data.bookingSurname,
        email: parsed.data.email,
        idCopy: idCopyKey,
        packageId: pkg.id,
        durationMinutes: pkg.minutes,
        priceCents: pkg.priceCents,
        currency: pkg.currency,
        vatCents: vatCents,
        totalCents: pkg.priceCents,
        status: "PENDING",
      },
      select: { id: true, currency: true, priceCents: true },
    });

    const invoice = await tx.invoice.create({
      data: {
        bookingId: booking.id,
        number: makeInvoiceNumber(),
        status: "ISSUED",
        subtotalCents: booking.priceCents,
        vatCents: 0,
        totalCents: booking.priceCents,
        currency: booking.currency,
      },
      select: { id: true, number: true },
    });

    return { booking, invoice };
  });

  revalidatePath("/bookings");

  return {
    success: true as const,
    message: `Booking created successfully.`,
    bookingId: result.booking.id,
    invoiceNumber: result.invoice.number,
  };
}

async function uploadToStorage(file: File): Promise<string> {
  const key = `id-copies/${Date.now()}-${file.name}`.replace(/\s+/g, "-");
  // TODO: replace with real storage (S3/R2/Supabase etc.)
  return key;
}
