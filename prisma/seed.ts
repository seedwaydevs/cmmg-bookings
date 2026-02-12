import { db } from "@/db/db";

type BookingService = "STUDIO" | "GREENSCREEN" | "SOUNDMIXING" | "FINALMIX";
type PackageType =
  | "TWO_HOURS"
  | "FOUR_HOURS"
  | "HALF_DAY_6H"
  | "HALF_DAY_7H"
  | "FULL_DAY";

const minutesByType: Record<PackageType, number> = {
  TWO_HOURS: 120,
  FOUR_HOURS: 240,
  HALF_DAY_6H: 360,
  HALF_DAY_7H: 420,
  FULL_DAY: 480, // change if your “full day” is different
};

const priceList: Record<BookingService, Record<PackageType, number>> = {
  STUDIO: {
    TWO_HOURS: 100000,
    FOUR_HOURS: 190000,
    HALF_DAY_6H: 270000,
    HALF_DAY_7H: 300000,
    FULL_DAY: 480000,
  },
  GREENSCREEN: {
    TWO_HOURS: 150000,
    FOUR_HOURS: 280000,
    HALF_DAY_6H: 400000,
    HALF_DAY_7H: 450000,
    FULL_DAY: 750000,
  },
  SOUNDMIXING: {
    TWO_HOURS: 90000,
    FOUR_HOURS: 170000,
    HALF_DAY_6H: 250000,
    HALF_DAY_7H: 290000,
    FULL_DAY: 420000,
  },
  FINALMIX: {
    TWO_HOURS: 120000,
    FOUR_HOURS: 230000,
    HALF_DAY_6H: 350000,
    HALF_DAY_7H: 390000,
    FULL_DAY: 600000,
  },
};

async function main() {
  const currency = "ZAR" as const;

  const services = Object.keys(priceList) as BookingService[];
  const types = Object.keys(minutesByType) as PackageType[];

  let count = 0;

  for (const service of services) {
    for (const type of types) {
      const minutes = minutesByType[type];
      const priceCents = priceList[service][type];

      await db.servicePackage.upsert({
        where: {
          // Prisma creates a compound unique input from @@unique([service, type])
          service_type: { service, type },
        },
        update: {
          minutes,
          priceCents,
          currency,
          isActive: true,
        },
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
