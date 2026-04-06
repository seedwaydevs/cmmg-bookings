import { db } from "@/db/db";

export async function getActivePackages() {
  const packages = db.servicePackage.findMany({
    where: { isActive: true, isBookableOnline: true },
    orderBy: [{ service: "asc" }, { displayOrder: "asc" }],
    select: {
      id: true,
      slug: true,
      service: true,
      category: true,
      name: true,
      durationLabel: true,
      description: true,
      includes: true,
      requiresPaidFullDayStudioBooking: true,
      isBookableOnline: true,
      displayOrder: true,
      minutes: true,
      priceCents: true,
      currency: true,
      isActive: true,
    },
  });
  return packages;
}
