import "server-only";
import nodemailer from "nodemailer";

type BookingService = "STUDIO" | "GREENSCREEN" | "SOUNDMIXING" | "FINALMIX";
type PackageType =
  | "TWO_HOURS"
  | "FOUR_HOURS"
  | "HALF_DAY_6H"
  | "HALF_DAY_7H"
  | "FULL_DAY";

type ServicePackage = {
  type: PackageType;
  minutes: number;
  priceCents: number;
  currency: string;
};

type BookingEmailPayload = {
  bookingId: string;
  invoiceNumber: string;
  bookingName: string;
  bookingSurname: string;
  email: string;
  service: BookingService;
  dateISO: string; // booking date in ISO
  pkg: ServicePackage;
  status: "PENDING" | "CONFIRMED" | "FULFILLED" | "CANCELLED";
};

function formatZAR(cents: number, currency: string) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency }).format(
    cents / 100,
  );
}

function labelForPackageType(type: PackageType) {
  switch (type) {
    case "TWO_HOURS":
      return "2 Hours";
    case "FOUR_HOURS":
      return "4 Hours";
    case "HALF_DAY_6H":
      return "Half Day (6h)";
    case "HALF_DAY_7H":
      return "Half Day (7h)";
    case "FULL_DAY":
      return "Full Day";
  }
}

function bookingTableHTML(p: BookingEmailPayload) {
  const d = new Date(p.dateISO);
  const when = d.toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" });

  return `
  <table style="width:100%; border-collapse:collapse; font-family:ui-sans-serif, system-ui; font-size:14px;">
    <tbody>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Invoice</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${p.invoiceNumber}</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Status</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${p.status}</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Customer</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${escapeHtml(
          p.bookingName,
        )} ${escapeHtml(p.bookingSurname)} (${escapeHtml(p.email)})</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Service</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${p.service}</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Package</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${labelForPackageType(
          p.pkg.type,
        )} (${p.pkg.minutes} minutes)</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Date & Time</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${when}</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Amount Due</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;"><strong>${formatZAR(
          p.pkg.priceCents,
          p.pkg.currency,
        )}</strong></td>
      </tr>
    </tbody>
  </table>
  `;
}

function paymentInfoHTML(invoiceNumber: string) {
  // Replace these with your real banking details later
  return `
  <h3 style="margin:18px 0 10px; font-family:ui-sans-serif, system-ui;">Payment (EFT)</h3>
  <p style="margin:0 0 10px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
    Please pay via EFT using the details below. Your booking remains <strong>PENDING</strong> until payment is received.
  </p>
  <table style="width:100%; border-collapse:collapse; font-family:ui-sans-serif, system-ui; font-size:14px;">
    <tbody>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Bank</strong></td><td style="padding:10px; border:1px solid #e5e7eb;">YOUR BANK</td></tr>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Account Name</strong></td><td style="padding:10px; border:1px solid #e5e7eb;">YOUR ACCOUNT NAME</td></tr>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Account Number</strong></td><td style="padding:10px; border:1px solid #e5e7eb;">XXXXXX</td></tr>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Reference</strong></td><td style="padding:10px; border:1px solid #e5e7eb;"><strong>${invoiceNumber}</strong></td></tr>
    </tbody>
  </table>
  `;
}

function customerEmailHTML(p: BookingEmailPayload) {
  return `
  <div style="max-width:640px; margin:0 auto; padding:20px;">
    <h2 style="margin:0 0 12px; font-family:ui-sans-serif, system-ui;">Booking Received</h2>
    <p style="margin:0 0 16px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
      Hi ${escapeHtml(p.bookingName)}, your booking request has been received. We’ll confirm it once payment is received.
    </p>
    ${bookingTableHTML(p)}
    ${paymentInfoHTML(p.invoiceNumber)}
    <p style="margin:18px 0 0; font-family:ui-sans-serif, system-ui; font-size:12px; color:#6b7280;">
      If you have questions, reply to this email.
    </p>
  </div>
  `;
}

function adminEmailHTML(p: BookingEmailPayload) {
  return `
  <div style="max-width:640px; margin:0 auto; padding:20px;">
    <h2 style="margin:0 0 12px; font-family:ui-sans-serif, system-ui;">New Booking (PENDING)</h2>
    <p style="margin:0 0 16px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
      A new booking has been created and an invoice number has been issued.
    </p>
    ${bookingTableHTML(p)}
    ${paymentInfoHTML(p.invoiceNumber)}
  </div>
  `;
}

function getTransporter() {
  const host = process.env.MAILTRAP_HOST;
  const port = Number(process.env.MAILTRAP_PORT || 2525);
  const user = process.env.MAILTRAP_USER;
  const pass = process.env.MAILTRAP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Mailtrap SMTP env vars missing (MAILTRAP_HOST/USER/PASS)");
  }

  return nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });
}

export async function sendBookingEmails(payload: BookingEmailPayload) {
  const transporter = getTransporter();

  const from = process.env.MAILTRAP_FROM || "Bookings <info@cmmg.co.za>";
  const admin = process.env.MAILTRAP_ADMIN_EMAIL;
  if (!admin) throw new Error("ADMIN_EMAIL is not set");

  // Customer
  await transporter.sendMail({
    from,
    to: payload.email,
    subject: `Invoice ${payload.invoiceNumber} — Booking received`,
    html: customerEmailHTML(payload),
  });

  // Admin
  await transporter.sendMail({
    from,
    to: admin,
    subject: `New booking ${payload.invoiceNumber} — ${payload.service}`,
    html: adminEmailHTML(payload),
  });

  // Later: add PDF attachment
  // attachments: [{ filename: `Invoice-${payload.invoiceNumber}.pdf`, content: pdfBuffer }]
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
