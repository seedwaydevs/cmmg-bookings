"use server";

import { enquirySchema } from "@/lib/schemas";
import { sendEnquiryEmails } from "@/lib/emailService";

export async function createEnquiry(formData: FormData) {
  const selectedOfferingsRaw = String(formData.get("selectedOfferings") ?? "[]");

  let selectedOfferings: unknown = [];
  try {
    selectedOfferings = JSON.parse(selectedOfferingsRaw);
  } catch {
    selectedOfferings = [];
  }

  const parsed = enquirySchema.safeParse({
    selectedOfferings,
    customerName: String(formData.get("customerName") ?? "").trim(),
    customerEmail: String(formData.get("customerEmail") ?? "")
      .toLowerCase()
      .trim(),
    customerPhone: String(formData.get("customerPhone") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  });
  console.log(parsed)

  if (!parsed.success) {
    return {
      success: false as const,
      message: "Please complete all enquiry fields before submitting.",
    };
  }

  await sendEnquiryEmails(parsed.data);

  return {
    success: true as const,
    message: "Your enquiry has been sent. The team will reply by email soon.",
  };
}
