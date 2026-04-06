import "server-only";
import nodemailer from "nodemailer";

import { BookingService } from "./schemas";
import type {
  BookingStatus,
  EnquiryValues,
  ExtrasPayload,
} from "./schemas";

type ServicePackage = {
  name: string;
  category: string;
  durationLabel: string;
  description: string | null;
  includes: string[];
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
  dateISO: string;
  pkg: ServicePackage;
  status: BookingStatus;
  extras?: ExtrasPayload; // optional — present when add-ons were selected
};

function formatZAR(cents: number, currency: string) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency }).format(
    cents / 100,
  );
}

function serviceLabel(service: BookingService) {
  switch (service) {
    case "STUDIO":
      return "Music Studio";
    case "GREENSCREEN":
      return "Green Screen Studio";
    case "SOUNDMIXING":
      return "Sound Mixing";
    case "FINALMIX":
      return "Final Mix";
  }
}

// ── Extras line-items block (only rendered when extras exist) ─────
function extrasTableHTML(extras: ExtrasPayload, pkg: ServicePackage) {
  if (!extras.items.length) return "";

  const rows = extras.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 10px; border:1px solid #e5e7eb;">${escapeHtml(item.name)}</td>
        <td style="padding:8px 10px; border:1px solid #e5e7eb; text-align:center;">${item.qty}</td>
        <td style="padding:8px 10px; border:1px solid #e5e7eb; text-align:right;">${formatZAR(Math.round(item.pricePerUnit * 100), pkg.currency)}</td>
        <td style="padding:8px 10px; border:1px solid #e5e7eb; text-align:right;">${formatZAR(Math.round(item.lineTotal * 100), pkg.currency)}</td>
      </tr>`,
    )
    .join("");

  return `
  <h3 style="margin:18px 0 10px; font-family:ui-sans-serif, system-ui;">Production Add-ons</h3>
  <table style="width:100%; border-collapse:collapse; font-family:ui-sans-serif, system-ui; font-size:14px;">
    <thead>
      <tr style="background:#f9fafb;">
        <th style="padding:8px 10px; border:1px solid #e5e7eb; text-align:left;">Item</th>
        <th style="padding:8px 10px; border:1px solid #e5e7eb; text-align:center;">Qty</th>
        <th style="padding:8px 10px; border:1px solid #e5e7eb; text-align:right;">Unit Price</th>
        <th style="padding:8px 10px; border:1px solid #e5e7eb; text-align:right;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr>
        <td colspan="3" style="padding:8px 10px; border:1px solid #e5e7eb; text-align:right;"><strong>Package subtotal</strong></td>
        <td style="padding:8px 10px; border:1px solid #e5e7eb; text-align:right;">${formatZAR(pkg.priceCents, pkg.currency)}</td>
      </tr>
      <tr>
        <td colspan="3" style="padding:8px 10px; border:1px solid #e5e7eb; text-align:right;"><strong>Add-ons subtotal</strong></td>
        <td style="padding:8px 10px; border:1px solid #e5e7eb; text-align:right;">${formatZAR(Math.round(extras.extrasTotal * 100), pkg.currency)}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td colspan="3" style="padding:10px; border:1px solid #e5e7eb; text-align:right;"><strong>Grand Total</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb; text-align:right;"><strong>${formatZAR(Math.round(extras.grandTotal * 100), pkg.currency)}</strong></td>
      </tr>
    </tbody>
  </table>
  `;
}

function bookingTableHTML(p: BookingEmailPayload) {
  const d = new Date(p.dateISO);
  const when = d.toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" });

  // When extras exist, show package price + grand total separately.
  // When no extras, just show the single amount due.
  const amountRow = p.extras
    ? `
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Package Price</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${formatZAR(p.pkg.priceCents, p.pkg.currency)}</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Grand Total</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;"><strong>${formatZAR(Math.round(p.extras.grandTotal * 100), p.pkg.currency)}</strong></td>
      </tr>`
    : `
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Amount Due</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;"><strong>${formatZAR(p.pkg.priceCents, p.pkg.currency)}</strong></td>
      </tr>`;

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
        <td style="padding:10px; border:1px solid #e5e7eb;">${escapeHtml(p.bookingName)} ${escapeHtml(p.bookingSurname)} (${escapeHtml(p.email)})</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Service</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${serviceLabel(p.service)}</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Offering</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${escapeHtml(p.pkg.name)}</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Category</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${escapeHtml(p.pkg.category)}</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Duration</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${escapeHtml(p.pkg.durationLabel)} (${p.pkg.minutes} minutes)</td>
      </tr>
      <tr>
        <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Date & Time</strong></td>
        <td style="padding:10px; border:1px solid #e5e7eb;">${when}</td>
      </tr>
      ${amountRow}
    </tbody>
  </table>
  `;
}

function paymentInfoHTML(invoiceNumber: string, amountHtml: string) {
  return `
  <h3 style="margin:18px 0 10px; font-family:ui-sans-serif, system-ui;">Payment (EFT)</h3>
  <p style="margin:0 0 10px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
    Please pay via EFT using the details below. Use your invoice number as the payment reference.
    Your booking remains <strong>PENDING</strong> until payment is received.
  </p>
  <table style="width:100%; border-collapse:collapse; font-family:ui-sans-serif, system-ui; font-size:14px;">
    <tbody>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Bank</strong></td><td style="padding:10px; border:1px solid #e5e7eb;">First National Bank</td></tr>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Account Name</strong></td><td style="padding:10px; border:1px solid #e5e7eb;">CMMG IN FULL PTY LTD</td></tr>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Account Number</strong></td><td style="padding:10px; border:1px solid #e5e7eb;">62716224986</td></tr>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Reference</strong></td><td style="padding:10px; border:1px solid #e5e7eb;"><strong>${invoiceNumber}</strong></td></tr>
      <tr><td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Amount</strong></td><td style="padding:10px; border:1px solid #e5e7eb;"><strong>${amountHtml}</strong></td></tr>
    </tbody>
  </table>
  `;
}

function customerEmailHTML(p: BookingEmailPayload) {
  const grandTotal = p.extras
    ? formatZAR(Math.round(p.extras.grandTotal * 100), p.pkg.currency)
    : formatZAR(p.pkg.priceCents, p.pkg.currency);
  const includesHtml = p.pkg.includes.length
    ? `<ul style="margin:10px 0 0; padding-left:18px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">${p.pkg.includes
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul>`
    : "";

  return `
  <div style="max-width:640px; margin:0 auto; padding:20px;">
    <h2 style="margin:0 0 12px; font-family:ui-sans-serif, system-ui;">Booking Received</h2>
    <p style="margin:0 0 16px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
      Hi ${escapeHtml(p.bookingName)}, your booking request has been received. We'll confirm it once payment is received.
    </p>
    ${bookingTableHTML(p)}
    ${
      p.pkg.description
        ? `<p style="margin:16px 0 0; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">${escapeHtml(p.pkg.description)}</p>`
        : ""
    }
    ${includesHtml}
    ${p.extras ? extrasTableHTML(p.extras, p.pkg) : ""}
    ${paymentInfoHTML(p.invoiceNumber, grandTotal)}
    <p style="margin:18px 0 0; font-family:ui-sans-serif, system-ui; font-size:12px; color:#6b7280;">
      If you have questions, reply to this email.
    </p>
  </div>
  `;
}

function adminEmailHTML(p: BookingEmailPayload) {
  const grandTotal = p.extras
    ? formatZAR(Math.round(p.extras.grandTotal * 100), p.pkg.currency)
    : formatZAR(p.pkg.priceCents, p.pkg.currency);
  const includesHtml = p.pkg.includes.length
    ? `<ul style="margin:10px 0 0; padding-left:18px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">${p.pkg.includes
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul>`
    : "";

  return `
  <div style="max-width:640px; margin:0 auto; padding:20px;">
    <h2 style="margin:0 0 12px; font-family:ui-sans-serif, system-ui;">New Booking (PENDING)</h2>
    <p style="margin:0 0 16px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
      A new booking has been created and an invoice number has been issued.
    </p>
    ${bookingTableHTML(p)}
    ${
      p.pkg.description
        ? `<p style="margin:16px 0 0; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">${escapeHtml(p.pkg.description)}</p>`
        : ""
    }
    ${includesHtml}
    ${p.extras ? extrasTableHTML(p.extras, p.pkg) : ""}
    ${paymentInfoHTML(p.invoiceNumber, grandTotal)}
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

  return nodemailer.createTransport({ host, port, auth: { user, pass } });
}

export async function sendBookingEmails(payload: BookingEmailPayload) {
  const transporter = getTransporter();

  const from = "Bookings <bookings@cmmg.co.za>";
  const admin = process.env.MAILTRAP_ADMIN_EMAIL;
  if (!admin) throw new Error("ADMIN_EMAIL is not set");

  await transporter.sendMail({
    from,
    to: payload.email,
    subject: `Invoice ${payload.invoiceNumber} — Booking received`,
    html: customerEmailHTML(payload),
  });

  await transporter.sendMail({
    from,
    to: admin,
    subject: `New booking ${payload.invoiceNumber} — ${payload.service}`,
    html: adminEmailHTML(payload),
  });
}

function enquirySelectionsHTML(selections: EnquiryValues["selectedOfferings"]) {
  return `
  <ul style="margin:10px 0 0; padding-left:18px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
    ${selections.map((item) => `<li>${escapeHtml(item.label)}</li>`).join("")}
  </ul>
  `;
}

function enquiryAdminEmailHTML(payload: EnquiryValues) {
  return `
  <div style="max-width:640px; margin:0 auto; padding:20px;">
    <h2 style="margin:0 0 12px; font-family:ui-sans-serif, system-ui;">New Service Enquiry</h2>
    <p style="margin:0 0 16px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
      A customer has submitted a new website enquiry.
    </p>
    <table style="width:100%; border-collapse:collapse; font-family:ui-sans-serif, system-ui; font-size:14px;">
      <tbody>
        <tr>
          <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Name</strong></td>
          <td style="padding:10px; border:1px solid #e5e7eb;">${escapeHtml(payload.customerName)}</td>
        </tr>
        <tr>
          <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Email</strong></td>
          <td style="padding:10px; border:1px solid #e5e7eb;">${escapeHtml(payload.customerEmail)}</td>
        </tr>
        <tr>
          <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Phone</strong></td>
          <td style="padding:10px; border:1px solid #e5e7eb;">${escapeHtml(payload.customerPhone)}</td>
        </tr>
        <tr>
          <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb;"><strong>Message</strong></td>
          <td style="padding:10px; border:1px solid #e5e7eb; white-space:pre-wrap;">${escapeHtml(payload.message)}</td>
        </tr>
      </tbody>
    </table>
    <h3 style="margin:18px 0 10px; font-family:ui-sans-serif, system-ui;">Selected Services</h3>
    ${enquirySelectionsHTML(payload.selectedOfferings)}
  </div>
  `;
}

function enquiryCustomerEmailHTML(payload: EnquiryValues) {
  return `
  <div style="max-width:640px; margin:0 auto; padding:20px;">
    <h2 style="margin:0 0 12px; font-family:ui-sans-serif, system-ui;">Enquiry Received</h2>
    <p style="margin:0 0 16px; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827;">
      Hi ${escapeHtml(payload.customerName)}, thanks for your enquiry. The team will review your request and reply soon.
    </p>
    <h3 style="margin:18px 0 10px; font-family:ui-sans-serif, system-ui;">You enquired about</h3>
    ${enquirySelectionsHTML(payload.selectedOfferings)}
    <p style="margin:18px 0 0; font-family:ui-sans-serif, system-ui; font-size:14px; color:#111827; white-space:pre-wrap;">
      ${escapeHtml(payload.message)}
    </p>
  </div>
  `;
}

export async function sendEnquiryEmails(payload: EnquiryValues) {
  const transporter = getTransporter();
  const from = "Bookings <bookings@cmmg.co.za>";
  const admin = process.env.MAILTRAP_ADMIN_EMAIL;
  if (!admin) throw new Error("ADMIN_EMAIL is not set");

  await transporter.sendMail({
    from,
    to: payload.customerEmail,
    subject: "CMMG enquiry received",
    html: enquiryCustomerEmailHTML(payload),
  });

  await transporter.sendMail({
    from,
    to: admin,
    subject: `New enquiry — ${payload.selectedOfferings.map((item) => item.label).join(", ")}`,
    html: enquiryAdminEmailHTML(payload),
  });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
