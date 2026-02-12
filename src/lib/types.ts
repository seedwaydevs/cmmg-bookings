import { BookingService } from "./schemas";

export type ServicePackage = {
  id: string;
  service: BookingService;
  type: "TWO_HOURS" | "FOUR_HOURS" | "HALF_DAY_6H" | "HALF_DAY_7H" | "FULL_DAY";
  minutes: number;
  priceCents: number;
  currency: string;
  isActive: boolean;
};
