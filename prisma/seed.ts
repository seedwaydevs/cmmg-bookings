import { db } from "@/db/db";
import { BOOKABLE_OFFERINGS } from "@/data/services/offering-catalog";

async function main() {
  let count = 0;

  for (const offering of BOOKABLE_OFFERINGS) {
    await db.servicePackage.upsert({
      where: { slug: offering.slug },
      update: {
        service: offering.service,
        category: offering.category,
        name: offering.name,
        durationLabel: offering.durationLabel,
        description: offering.description,
        includes: offering.includes,
        requiresPaidFullDayStudioBooking:
          offering.requiresPaidFullDayStudioBooking ?? false,
        displayOrder: offering.displayOrder,
        minutes: offering.minutes,
        priceCents: offering.priceCents,
        currency: "ZAR",
        isBookableOnline: true,
        isActive: true,
      },
      create: {
        slug: offering.slug,
        service: offering.service,
        category: offering.category,
        name: offering.name,
        durationLabel: offering.durationLabel,
        description: offering.description,
        includes: offering.includes,
        requiresPaidFullDayStudioBooking:
          offering.requiresPaidFullDayStudioBooking ?? false,
        displayOrder: offering.displayOrder,
        minutes: offering.minutes,
        priceCents: offering.priceCents,
        currency: "ZAR",
        isBookableOnline: true,
        isActive: true,
      },
    });

    count++;
  }

  await db.servicePackage.updateMany({
    where: {
      slug: { notIn: BOOKABLE_OFFERINGS.map((offering) => offering.slug) },
    },
    data: { isActive: false },
  });

  console.log(`Seeded/updated ${count} online bookable offerings`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
