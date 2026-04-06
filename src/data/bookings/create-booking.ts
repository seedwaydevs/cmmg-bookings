"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/db";
import {
  bookingServerSchema,
  extrasPayloadSchema,
  type ExtrasPayload,
} from "@/lib/schemas";
import { sendBookingEmails } from "@/lib/emailService";

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
    bundleEligibilityConfirmed:
      String(formData.get("bundleEligibilityConfirmed") ?? "") === "true",
  };

  const parsed = bookingServerSchema.safeParse(raw);
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

  // ── Parse extras ───────────────────────────────────────────────
  // The client appends extras as a JSON string via FormData.
  // We validate it server-side with the same Zod schema so the DB
  // never receives malformed data.
  let extrasPayload: ExtrasPayload | null = null;
  let extrasCents: number | null = null;
  let grandTotalCents: number | null = null;

  const extrasRaw = formData.get("extras");
  if (extrasRaw && typeof extrasRaw === "string") {
    try {
      const extrasResult = extrasPayloadSchema.safeParse(JSON.parse(extrasRaw));
      if (extrasResult.success && extrasResult.data.items.length > 0) {
        extrasPayload = extrasResult.data;
        extrasCents = Math.round(extrasPayload.extrasTotal * 100);
        grandTotalCents = Math.round(extrasPayload.grandTotal * 100);
      }
    } catch {
      // Malformed JSON — proceed without extras rather than failing the booking
      console.warn("[create-booking] Could not parse extras payload");
    }
  }

  // ---- Load package from DB (server-side source of truth)
  const pkg = await db.servicePackage.findFirst({
    where: {
      id: parsed.data.packageId,
      service: parsed.data.service,
      isActive: true,
      isBookableOnline: true,
    },
    select: {
      id: true,
      name: true,
      category: true,
      durationLabel: true,
      description: true,
      includes: true,
      requiresPaidFullDayStudioBooking: true,
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

  if (
    pkg.requiresPaidFullDayStudioBooking &&
    !parsed.data.bundleEligibilityConfirmed
  ) {
    return {
      success: false as const,
      message:
        "Please confirm that a full-day music studio booking has already been paid for before choosing the studio bundle.",
    };
  }

  // Derive the true invoice total — use grandTotalCents when extras exist,
  // fall back to priceCents alone for bookings with no add-ons.
  const invoiceTotalCents = grandTotalCents ?? pkg.priceCents;

  // ---- Transaction: Booking (PENDING) + Invoice (ISSUED)
  const result = await db.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        service: parsed.data.service,
        date: bookingDate,
        bookingName: parsed.data.bookingName,
        bookingSurname: parsed.data.bookingSurname,
        email: parsed.data.email,
        idCopy: idCopyKey ?? "",
        packageId: pkg.id,
        packageName: pkg.name,
        packageCategory: pkg.category,
        packageDurationLabel: pkg.durationLabel,
        packageDescription: pkg.description,
        packageIncludes: pkg.includes,
        bundleEligibilityConfirmed:
          parsed.data.bundleEligibilityConfirmed ?? false,
        durationMinutes: pkg.minutes,
        priceCents: pkg.priceCents,
        currency: pkg.currency,

        // ── extras fields (null when no add-ons selected) ──
        extras: extrasPayload ?? undefined,
        extrasCents,
        grandTotalCents,

        status: "PENDING",
      },

      select: {
        id: true,
        currency: true,
        priceCents: true,
        bookingName: true,
        email: true,
        service: true,
        extras: true,
      },
    });

    const invoice = await tx.invoice.create({
      data: {
        bookingId: booking.id,
        number: makeInvoiceNumber(),
        status: "ISSUED",
        subtotalCents: invoiceTotalCents,
        vatCents: 0,
        totalCents: invoiceTotalCents,
        currency: booking.currency,
      },
      select: { id: true, number: true },
    });

    return { booking, invoice };
  });

  await sendBookingEmails({
    bookingId: result.booking.id,
    invoiceNumber: result.invoice.number,
    bookingName: parsed.data.bookingName,
    bookingSurname: parsed.data.bookingSurname,
    email: parsed.data.email,
    service: parsed.data.service,
    dateISO: bookingDate.toISOString(),
    status: "PENDING",
    pkg: {
      name: pkg.name,
      category: pkg.category,
      durationLabel: pkg.durationLabel,
      description: pkg.description,
      includes: pkg.includes,
      minutes: pkg.minutes,
      priceCents: pkg.priceCents,
      currency: pkg.currency,
    },
    // Pass extras through so the email template can render the line items
    // if your sendBookingEmails function supports it (optional — won't break if not).
    ...(extrasPayload ? { extras: extrasPayload } : {}),
  });

  revalidatePath("/");

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
