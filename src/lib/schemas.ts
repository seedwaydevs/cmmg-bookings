import z from "zod";

export const BookingServiceEnum = z.enum([
  "STUDIO",
  "GREENSCREEN",
  "SOUNDMIXING",
  "FINALMIX",
]);
export type BookingService = z.infer<typeof BookingServiceEnum>;

export const PackageTypeEnum = z.enum(["HALF_DAY", "FULL_DAY"]);
export type PackageType = z.infer<typeof PackageTypeEnum>;

export const BookingStatusEnum = z.enum([
  "PENDING",
  "CONFIRMED",
  "FULFILLED",
  "CANCELLED",
]);

export type BookingStatus = z.infer<typeof BookingStatusEnum>;
// ── Extras ────────────────────────────────────────────────────────
export const extraLineItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  qty: z.number().int().min(1),
  pricePerUnit: z.number().nonnegative(),
  unit: z.string(),
  lineTotal: z.number().nonnegative(),
});

export const extrasPayloadSchema = z.object({
  items: z.array(extraLineItemSchema),
  extrasTotal: z.number().nonnegative(),
  grandTotal: z.number().nonnegative(),
});

export type ExtraLineItem = z.infer<typeof extraLineItemSchema>;
export type ExtrasPayload = z.infer<typeof extrasPayloadSchema>;

// ── Booking form schema (client) ──────────────────────────────────
export const bookingSchema = z.object({
  service: BookingServiceEnum,
  packageId: z.string().min(1, "Please choose a package"),

  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),

  bookingName: z.string().min(2, "Name is required"),
  bookingSurname: z.string().min(2, "Surname is required"),
  email: z.string().email("Enter a valid email"),

  idCopy: z
    .custom<File>((v) => v instanceof File, "Please upload your ID copy")
    .refine((f) => f.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .optional(),
});

// ── Server schema (strips client-only fields) ─────────────────────
export const bookingServerSchema = bookingSchema.omit({
  time: true,
  idCopy: true,
});

export type FormValues = z.infer<typeof bookingSchema>;
