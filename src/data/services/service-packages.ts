import { db } from "@/db/db";

export async function getActivePackages() {
  const packages = db.servicePackage.findMany({
    where: { isActive: true },
    orderBy: [{ service: "asc" }, { minutes: "asc" }],
    select: {
      id: true,
      service: true,
      type: true,
      minutes: true,
      priceCents: true,
      currency: true,
      isActive: true,
    },
  });
  return packages;
}
