import z from "zod";

export const BookingServiceEnum = z.enum([
  "STUDIO",
  "GREENSCREEN",
  "SOUNDMIXING",
  "FINALMIX",
]);
export type BookingService = z.infer<typeof BookingServiceEnum>;

export const bookingSchema = z.object({
  service: BookingServiceEnum,
  packageId: z.string().min(1, "Please choose a package"),

  // We'll combine these into a DateTime for Prisma
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
export type FormValues = z.infer<typeof bookingSchema>;
