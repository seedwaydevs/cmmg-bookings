import { BookingService } from "./schemas";

export type ServicePackage = {
  id: string;
  service: BookingService;
  type: "HALF_DAY" | "FULL_DAY";
  minutes: number;
  priceCents: number;
  currency: string;
  isActive: boolean;
};

export interface ExtraLineItem {
  id: string; // matches EXTRAS_CATALOGUE item id
  name: string;
  category: string;
  qty: number;
  pricePerUnit: number; // ZAR (not cents)
  unit: string;
  lineTotal: number; // ZAR (not cents)
}

export interface ExtrasPayload {
  items: ExtraLineItem[];
  extrasTotal: number; // ZAR (not cents)
  grandTotal: number; // ZAR (not cents) — package + extras
}
