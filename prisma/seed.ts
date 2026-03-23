import { db } from "@/db/db";

type BookingService = "STUDIO" | "GREENSCREEN" | "SOUNDMIXING" | "FINALMIX";
type PackageType = "HALF_DAY" | "FULL_DAY";

const minutesByType: Record<PackageType, number> = {
  HALF_DAY: 420,
  FULL_DAY: 720,
};

// ── Which package types are active per service ────────────────────
// STUDIO + GREENSCREEN: half day & full day only
// SOUNDMIXING + FINALMIX: hourly options kept for now
const activeTypesPerService: Record<BookingService, PackageType[]> = {
  STUDIO: ["HALF_DAY", "FULL_DAY"],
  GREENSCREEN: ["HALF_DAY", "FULL_DAY"],
  SOUNDMIXING: ["HALF_DAY", "FULL_DAY"],
  FINALMIX: ["HALF_DAY", "FULL_DAY"],
};

const priceList: Record<
  BookingService,
  Partial<Record<PackageType, number>>
> = {
  STUDIO: {
    HALF_DAY: 260000, // R2,600 — half of R5,200/day
    FULL_DAY: 520000, // R5,200
  },
  GREENSCREEN: {
    HALF_DAY: 450000, // R4,500
    FULL_DAY: 950000, // R9,500
  },
  SOUNDMIXING: {
    HALF_DAY: 250000,

    FULL_DAY: 420000,
  },
  FINALMIX: {
    HALF_DAY: 350000,
    FULL_DAY: 600000,
  },
};

async function main() {
  const currency = "ZAR" as const;
  let count = 0;

  const services = Object.keys(priceList) as BookingService[];

  for (const service of services) {
    const activeTypes = activeTypesPerService[service];

    for (const type of activeTypes) {
      const minutes = minutesByType[type];
      const priceCents = priceList[service][type]!;

      await db.servicePackage.upsert({
        where: { service_type: { service, type } },
        update: { minutes, priceCents, currency, isActive: true },
        create: {
          service,
          type,
          minutes,
          priceCents,
          currency,
          isActive: true,
        },
      });

      count++;
    }

    // Deactivate any types not in the active list for this service
    // (e.g. TWO_HOURS / FOUR_HOURS for STUDIO and GREENSCREEN)
    await db.servicePackage.updateMany({
      where: {
        service,
        type: { notIn: activeTypes },
      },
      data: { isActive: false },
    });
  }

  console.log(`✅ Seeded/updated ${count} ServicePackage rows`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
