/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useState, useTransition, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ServicePackage } from "@/lib/types";
import { bookingSchema, FormValues } from "@/lib/schemas";
import { createBooking } from "@/data/bookings/create-booking";

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTION ADD-ONS CATALOGUE
// All prices in ZAR. These are placeholder market rates — replace with your own.
// ─────────────────────────────────────────────────────────────────────────────
export type ExtraCategory = "lighting" | "cameras" | "crew" | "other";

export interface ExtraItem {
  id: string;
  category: ExtraCategory;
  name: string;
  pricePerUnit: number; // ZAR
  unit: string; // display hint e.g. "per unit/day"
  maxQty: number;
}

export const EXTRAS_CATALOGUE: ExtraItem[] = [
  // Lighting
  {
    id: "led_panel",
    category: "lighting",
    name: "LED Panel",
    pricePerUnit: 800,
    unit: "per unit / day",
    maxQty: 20,
  },
  {
    id: "led_stick",
    category: "lighting",
    name: "LED Light Stick",
    pricePerUnit: 500,
    unit: "per unit / day",
    maxQty: 20,
  },
  {
    id: "arri_2k",
    category: "lighting",
    name: "2K Arri Light",
    pricePerUnit: 2000,
    unit: "per unit / day",
    maxQty: 10,
  },
  {
    id: "arri_skypanel",
    category: "lighting",
    name: "Arri SkyPanel S60",
    pricePerUnit: 2500,
    unit: "per unit / day",
    maxQty: 6,
  },
  // Cameras
  {
    id: "cam_standard",
    category: "cameras",
    name: "Standard Camera Kit",
    pricePerUnit: 4500,
    unit: "per unit / day",
    maxQty: 8,
  },
  {
    id: "cam_cinema",
    category: "cameras",
    name: "Cinema Camera (RED/ARRI)",
    pricePerUnit: 8000,
    unit: "per unit / day",
    maxQty: 4,
  },
  // Crew
  {
    id: "crew_cam_op",
    category: "crew",
    name: "Camera Operator",
    pricePerUnit: 3000,
    unit: "per person / day",
    maxQty: 6,
  },
  {
    id: "crew_sound",
    category: "crew",
    name: "Sound Technician",
    pricePerUnit: 2500,
    unit: "per person / day",
    maxQty: 4,
  },
  {
    id: "crew_gaffer",
    category: "crew",
    name: "Gaffer / Lighting Tech",
    pricePerUnit: 2000,
    unit: "per person / day",
    maxQty: 4,
  },
  {
    id: "crew_makeup",
    category: "crew",
    name: "Make-up Artist",
    pricePerUnit: 1800,
    unit: "per person / day",
    maxQty: 4,
  },
  {
    id: "crew_pa",
    category: "crew",
    name: "Production Assistant",
    pricePerUnit: 1200,
    unit: "per person / day",
    maxQty: 6,
  },
  // Other
  {
    id: "catering",
    category: "other",
    name: "Catering",
    pricePerUnit: 350,
    unit: "per head",
    maxQty: 50,
  },
];

const CATEGORY_LABELS: Record<ExtraCategory, string> = {
  lighting: "Lighting",
  cameras: "Cameras",
  crew: "Crew",
  other: "Other",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function labelForPackageType(type: ServicePackage["type"]) {
  switch (type) {
    case "HALF_DAY":
      return "Half Day";
    case "FULL_DAY":
      return "Full Day";
  }
}

/** Formats a plain ZAR number (not cents) */
function formatZAR(amount: number) {
  return `ZAR ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;
}

/** Formats priceCents stored in DB */
function formatMoneyZAR(cents: number, currency: string) {
  return `${currency} ${(cents / 100).toFixed(2)}`;
}

const SERVICES = [
  { value: "STUDIO", label: "Recording Studio", num: "01" },
  { value: "GREENSCREEN", label: "Green Screen", num: "02" },
  { value: "SOUNDMIXING", label: "Sound Mixing", num: "03" },
  { value: "FINALMIX", label: "Final Mix", num: "04" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function BookingSection({
  packages,
}: {
  packages: ServicePackage[];
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // { [itemId]: quantity }
  const [extraQty, setExtraQty] = useState<Record<string, number>>({});

  const form = useForm<FormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: "STUDIO",
      packageId: "",
      date: "",
      time: "",
      bookingName: "",
      bookingSurname: "",
      email: "",
      idCopy: undefined,
    },
  });

  const service = form.watch("service");
  const packageId = form.watch("packageId");

  const availablePackages = useMemo(
    () =>
      packages
        .filter((p) => p.isActive && p.service === service)
        .sort((a, b) => a.minutes - b.minutes),
    [packages, service],
  );

  const selectedPackage = useMemo(
    () => packages.find((p) => p.id === packageId) ?? null,
    [packages, packageId],
  );

  // Derive selected extras with line totals
  const selectedExtras = useMemo(
    () =>
      EXTRAS_CATALOGUE.filter((item) => (extraQty[item.id] ?? 0) > 0).map(
        (item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          qty: extraQty[item.id],
          pricePerUnit: item.pricePerUnit,
          unit: item.unit,
          lineTotal: item.pricePerUnit * extraQty[item.id],
        }),
      ),
    [extraQty],
  );

  const extrasTotal = useMemo(
    () => selectedExtras.reduce((s, e) => s + e.lineTotal, 0),
    [selectedExtras],
  );
  const packageTotal = selectedPackage ? selectedPackage.priceCents / 100 : 0;
  const grandTotal = packageTotal + extrasTotal;

  function changeQty(itemId: string, delta: number, max: number) {
    setExtraQty((prev) => {
      const next = Math.max(0, Math.min(max, (prev[itemId] ?? 0) + delta));
      if (next === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: next };
    });
  }

  function onSubmit(values: FormValues) {
    setError(undefined);
    startTransition(async () => {
      const pkg = packages.find((p) => p.id === values.packageId);
      if (!pkg) {
        form.setError("packageId", { message: "Package not found." });
        return;
      }

      const fd = new FormData();
      fd.append("service", values.service);
      fd.append(
        "date",
        new Date(`${values.date}T${values.time}:00`).toISOString(),
      );
      fd.append("bookingName", values.bookingName);
      fd.append("bookingSurname", values.bookingSurname);
      fd.append("email", values.email.toLowerCase().trim());
      fd.append("packageId", values.packageId);
      if (values.idCopy) fd.append("IdCopy", values.idCopy);

      // Extras — stored as JSON in the `extras` column.
      // Shape matches ExtrasPayload type below.
      fd.append(
        "extras",
        JSON.stringify({
          items: selectedExtras,
          extrasTotal,
          grandTotal,
        }),
      );

      const res = await createBooking(fd);
      if (!res.success) setError(res?.message);
      else {
        setSuccess(res.message);
        form.reset();
        setExtraQty({});
      }
    });
  }

  // Pre-group catalogue by category
  const categorisedExtras = useMemo(() => {
    const cats: ExtraCategory[] = ["lighting", "cameras", "crew", "other"];
    return cats.map((cat) => ({
      cat,
      label: CATEGORY_LABELS[cat],
      items: EXTRAS_CATALOGUE.filter((i) => i.category === cat),
    }));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');

        .bs-root {
          background: #fff;
          padding: 7rem 0 6rem;
          font-family: 'Syne', sans-serif;
          border-top: 1px solid rgba(0,0,0,0.07);
        }
        .bs-inner { max-width: 1260px; margin: 0 auto; padding: 0 2rem; }

        /* HEADER */
        .bs-header { margin-bottom: 4rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(0,0,0,0.08); }
        .bs-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .bs-eyebrow-line { width: 28px; height: 1px; background: #f05a1a; }
        .bs-eyebrow-text { font-family: 'Manrope', sans-serif; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(0,0,0,0.35); }
        .bs-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: clamp(5rem, 10vw, 7rem); letter-spacing: -0.02em; line-height: 0.95; text-transform: uppercase; color: #000; }
        .bs-title span { color: #f05a1a; }
        .bs-subtitle { font-family: 'Manrope', sans-serif; font-size: 0.85rem; line-height: 1.7; color: rgba(0,0,0,0.4); margin: 0; }

        .bs-form { max-width: 720px; margin: 0 auto; padding: 0 2rem; }

        /* STEP */
        .bs-step { margin-bottom: 2.75rem; }
        .bs-step-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
        .bs-step-num { font-family: 'Manrope', sans-serif; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.14em; color: rgba(0,0,0,0.2); }
        .bs-step-label { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #0a0a0a; margin: 0; }
        .bs-step-line { flex: 1; height: 1px; background: rgba(0,0,0,0.07); }

        /* SERVICE BUTTONS */
        .bs-services { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid rgba(0,0,0,0.1); }
        .bs-svc-btn { background: #fff; border: none; border-right: 1px solid rgba(0,0,0,0.1); padding: 1rem 1.25rem; cursor: pointer; text-align: left; transition: background 0.18s; position: relative; }
        .bs-svc-btn:last-child { border-right: none; }
        .bs-svc-btn:hover:not(.active) { background: #fafafa; }
        .bs-svc-btn.active { background: #0a0a0a; }
        .bs-svc-btn.active::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #f05a1a; }
        .bs-svc-num { display: block; font-family: 'Manrope', sans-serif; font-size: 0.52rem; font-weight: 600; letter-spacing: 0.14em; color: rgba(0,0,0,0.22); margin-bottom: 0.3rem; transition: color 0.18s; }
        .bs-svc-btn.active .bs-svc-num { color: rgba(255,255,255,0.28); }
        .bs-svc-name { font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 700; color: #0a0a0a; letter-spacing: -0.01em; transition: color 0.18s; }
        .bs-svc-btn.active .bs-svc-name { color: #fff; }

        /* SELECT */
        .bs-select-wrap { position: relative; }
        .bs-select { width: 100%; appearance: none; -webkit-appearance: none; background: #fff; border: 1px solid rgba(0,0,0,0.12); padding: 0.9rem 2.5rem 0.9rem 1rem; font-family: 'Manrope', sans-serif; font-size: 0.85rem; font-weight: 500; color: #0a0a0a; outline: none; cursor: pointer; transition: border-color 0.2s; }
        .bs-select:focus { border-color: #f05a1a; }
        .bs-select-caret { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); pointer-events: none; color: rgba(0,0,0,0.3); font-size: 0.65rem; }
        .bs-no-pkg { margin-top: 0.6rem; font-family: 'Manrope', sans-serif; font-size: 0.72rem; color: rgba(0,0,0,0.35); }

        /* PACKAGE SUMMARY STRIP */
        .bs-summary { background: #0a0a0a; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.75rem; }
        .bs-summary-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .bs-summary-key { font-family: 'Manrope', sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.25); }
        .bs-summary-val { font-family: 'Syne', sans-serif; font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.8); }
        .bs-summary-price { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 800; color: #f05a1a; letter-spacing: -0.02em; }

        /* TWO COL */
        .bs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        /* INPUT */
        .bs-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .bs-label { font-family: 'Manrope', sans-serif; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,0,0,0.38); }
        .bs-input { border: none; border-bottom: 1px solid rgba(0,0,0,0.14); padding: 0.7rem 0; font-family: 'Manrope', sans-serif; font-size: 0.88rem; font-weight: 500; color: #0a0a0a; background: transparent; outline: none; width: 100%; transition: border-color 0.2s; }
        .bs-input:focus { border-color: #f05a1a; }
        .bs-input::placeholder { color: rgba(0,0,0,0.22); }

        /* FILE UPLOAD */
        .bs-file { border: 1px dashed rgba(0,0,0,0.14); padding: 2rem; text-align: center; position: relative; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .bs-file:hover { border-color: #f05a1a; background: rgba(240,90,26,0.015); }
        .bs-file input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .bs-file-icon { display: block; font-size: 1.25rem; color: rgba(0,0,0,0.18); margin-bottom: 0.5rem; }
        .bs-file-text { font-family: 'Manrope', sans-serif; font-size: 0.78rem; font-weight: 500; color: rgba(0,0,0,0.4); }
        .bs-file-hint { display: block; font-family: 'Manrope', sans-serif; font-size: 0.6rem; color: rgba(0,0,0,0.22); margin-top: 0.3rem; }

        /* FIELD ERROR */
        .bs-err { font-family: 'Manrope', sans-serif; font-size: 0.67rem; color: #d93030; margin-top: 0.3rem; }

        /* ── PRODUCTION ADD-ONS ── */
        .bs-addons { display: flex; flex-direction: column; gap: 1.75rem; }
        .bs-addon-cat-label { font-family: 'Manrope', sans-serif; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(0,0,0,0.28); margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .bs-addon-items { display: flex; flex-direction: column; }
        .bs-addon-row { display: flex; align-items: center; justify-content: space-between; padding: 0.7rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 1rem; }
        .bs-addon-row:last-child { border-bottom: none; }
        .bs-addon-info { flex: 1; min-width: 0; }
        .bs-addon-name { font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 700; color: #0a0a0a; }
        .bs-addon-price-hint { font-family: 'Manrope', sans-serif; font-size: 0.62rem; color: rgba(0,0,0,0.32); margin-top: 0.1rem; }
        .bs-addon-right { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
        .bs-addon-line-total { font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 700; color: #0a0a0a; min-width: 90px; text-align: right; }
        .bs-addon-line-total.zero { color: rgba(0,0,0,0.18); }

        /* QTY STEPPER */
        .bs-qty { display: flex; align-items: center; border: 1px solid rgba(0,0,0,0.12); }
        .bs-qty-btn { width: 30px; height: 30px; background: none; border: none; cursor: pointer; font-family: 'Manrope', sans-serif; font-size: 0.9rem; font-weight: 600; color: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; transition: background 0.15s, color 0.15s; flex-shrink: 0; }
        .bs-qty-btn:hover:not(:disabled) { background: #f05a1a; color: #fff; }
        .bs-qty-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .bs-qty-val { width: 32px; text-align: center; font-family: 'Manrope', sans-serif; font-size: 0.8rem; font-weight: 600; color: #0a0a0a; border-left: 1px solid rgba(0,0,0,0.08); border-right: 1px solid rgba(0,0,0,0.08); line-height: 30px; }

        /* RECEIPT */
        .bs-receipt { background: #0a0a0a; padding: 1.5rem; margin-top: 1.5rem; }
        .bs-receipt-title { font-family: 'Manrope', sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 1rem; }
        .bs-receipt-row { display: flex; justify-content: space-between; align-items: center; padding: 0.45rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .bs-receipt-row:last-of-type { border-bottom: none; }
        .bs-receipt-name { font-family: 'Manrope', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.55); flex: 1; }
        .bs-receipt-qty { font-family: 'Manrope', sans-serif; font-size: 0.65rem; color: rgba(255,255,255,0.25); margin: 0 0.75rem; }
        .bs-receipt-amt { font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 700; color: rgba(255,255,255,0.7); }
        .bs-receipt-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 0.75rem 0; }
        .bs-receipt-subtotal-row { display: flex; justify-content: space-between; padding: 0.35rem 0; }
        .bs-receipt-sub-label { font-family: 'Manrope', sans-serif; font-size: 0.68rem; color: rgba(255,255,255,0.3); }
        .bs-receipt-sub-val { font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 700; color: rgba(255,255,255,0.5); }
        .bs-receipt-total-row { display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; margin-top: 0.25rem; border-top: 1px solid rgba(255,255,255,0.1); }
        .bs-receipt-total-label { font-family: 'Syne', sans-serif; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,0.45); letter-spacing: 0.08em; }
        .bs-receipt-total-val { font-family: 'Syne', sans-serif; font-size: 1.35rem; font-weight: 800; color: #f05a1a; letter-spacing: -0.02em; }
        .bs-receipt-empty { font-family: 'Manrope', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.18); text-align: center; padding: 0.5rem 0; }

        /* FOOTER */
        .bs-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 2.5rem; border-top: 1px solid rgba(0,0,0,0.07); gap: 1.5rem; flex-wrap: wrap; }
        .bs-footer-note { font-family: 'Manrope', sans-serif; font-size: 0.7rem; color: rgba(0,0,0,0.28); line-height: 1.55; max-width: 260px; }
        .bs-submit { display: inline-flex; align-items: center; gap: 0.5rem; background: #0a0a0a; color: #fff; font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 2.25rem; border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; position: relative; overflow: hidden; }
        .bs-submit::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #f05a1a; transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
        .bs-submit:hover::before { transform: scaleX(1); }
        .bs-submit:hover { background: #1a1a1a; transform: translateY(-1px); }
        .bs-submit:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

        /* STATUS */
        .bs-msg { font-family: 'Manrope', sans-serif; font-size: 0.78rem; font-weight: 500; margin-top: 1.25rem; padding: 0.85rem 1.25rem; border-left: 3px solid; }
        .bs-msg.error   { border-color: #d93030; color: #d93030; background: rgba(217,48,48,0.04); }
        .bs-msg.success { border-color: #22c55e; color: #16a34a; background: rgba(34,197,94,0.04); }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .bs-root { padding: 5rem 0 4rem; }
          .bs-inner { padding: 0 1.25rem; }
          .bs-services { grid-template-columns: 1fr 1fr; }
          .bs-svc-btn { border-bottom: 1px solid rgba(0,0,0,0.1); }
          .bs-svc-btn:nth-child(2) { border-right: none; }
          .bs-row { grid-template-columns: 1fr; gap: 1.25rem; }
          .bs-footer { flex-direction: column; align-items: flex-start; }
          .bs-submit { width: 100%; justify-content: center; }
          .bs-addon-row { flex-wrap: wrap; }
          .bs-addon-right { width: 100%; justify-content: flex-end; }
        }
      `}</style>

      <section className="bs-root" id="book">
        <div className="bs-inner">
          {/* Header */}
          <div className="bs-header">
            <div className="bs-eyebrow">
              <div className="bs-eyebrow-line" />
              <span className="bs-eyebrow-text">Get Started</span>
            </div>
            <h2 className="bs-title">
              Book Your <span>Session</span>
            </h2>
            <p className="bs-subtitle">
              Choose a service and package. We&apos;ll confirm your booking
              within 24 hours.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bs-form">
              {/* 01 — Service */}
              <div className="bs-step">
                <div className="bs-step-header">
                  <span className="bs-step-num">01</span>
                  <h3 className="bs-step-label">Select Service</h3>
                  <div className="bs-step-line" />
                </div>
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="bs-services">
                          {SERVICES.map((s) => (
                            <button
                              key={s.value}
                              type="button"
                              className={`bs-svc-btn ${field.value === s.value ? "active" : ""}`}
                              onClick={() => {
                                field.onChange(s.value);
                                form.setValue("packageId", "");
                              }}
                            >
                              <span className="bs-svc-num">{s.num}</span>
                              <span className="bs-svc-name">{s.label}</span>
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage className="bs-err" />
                    </FormItem>
                  )}
                />
              </div>

              {/* 02 — Package */}
              <div className="bs-step">
                <div className="bs-step-header">
                  <span className="bs-step-num">02</span>
                  <h3 className="bs-step-label">Choose Package</h3>
                  <div className="bs-step-line" />
                </div>
                <FormField
                  control={form.control}
                  name="packageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="bs-select-wrap">
                          <select
                            className="bs-select"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          >
                            <option value="">Select a package...</option>
                            {availablePackages.map((p) => (
                              <option key={p.id} value={p.id}>
                                {labelForPackageType(p.type)} — {p.minutes} min
                                — {formatMoneyZAR(p.priceCents, p.currency)}
                              </option>
                            ))}
                          </select>
                          <span className="bs-select-caret">▾</span>
                        </div>
                      </FormControl>
                      {availablePackages.length === 0 && (
                        <p className="bs-no-pkg">
                          No active packages for this service.
                        </p>
                      )}
                      <FormMessage className="bs-err" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Package summary strip */}
              {selectedPackage && (
                <div className="bs-summary">
                  <div className="bs-summary-item">
                    <span className="bs-summary-key">Package</span>
                    <span className="bs-summary-val">
                      {labelForPackageType(selectedPackage.type)}
                    </span>
                  </div>
                  <div className="bs-summary-item">
                    <span className="bs-summary-key">Duration</span>
                    <span className="bs-summary-val">
                      {selectedPackage.minutes} min
                    </span>
                  </div>
                  <div className="bs-summary-item">
                    <span className="bs-summary-key">Package Price</span>
                    <span className="bs-summary-price">
                      {formatMoneyZAR(
                        selectedPackage.priceCents,
                        selectedPackage.currency,
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* 03 — Date & Time */}
              <div className="bs-step">
                <div className="bs-step-header">
                  <span className="bs-step-num">03</span>
                  <h3 className="bs-step-label">Date & Time</h3>
                  <div className="bs-step-line" />
                </div>
                <div className="bs-row">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="bs-field">
                            <label className="bs-label">Date</label>
                            <input
                              type="date"
                              min={today}
                              className="bs-input"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="bs-err" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="bs-field">
                            <label className="bs-label">Time</label>
                            <input
                              type="time"
                              className="bs-input"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="bs-err" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* 04 — Your Details */}
              <div className="bs-step">
                <div className="bs-step-header">
                  <span className="bs-step-num">04</span>
                  <h3 className="bs-step-label">Your Details</h3>
                  <div className="bs-step-line" />
                </div>
                <div className="bs-row" style={{ marginBottom: "1.5rem" }}>
                  <FormField
                    control={form.control}
                    name="bookingName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="bs-field">
                            <label className="bs-label">First Name</label>
                            <input
                              className="bs-input"
                              placeholder="John"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="bs-err" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bookingSurname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="bs-field">
                            <label className="bs-label">Surname</label>
                            <input
                              className="bs-input"
                              placeholder="Doe"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="bs-err" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="bs-field">
                          <label className="bs-label">Email Address</label>
                          <input
                            type="email"
                            className="bs-input"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="bs-err" />
                    </FormItem>
                  )}
                />
              </div>

              {/* 05 — ID Document */}
              <div className="bs-step">
                <div className="bs-step-header">
                  <span className="bs-step-num">05</span>
                  <h3 className="bs-step-label">ID Document</h3>
                  <div className="bs-step-line" />
                </div>
                <FormField
                  control={form.control}
                  name="idCopy"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="bs-file">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                          <span className="bs-file-icon">↑</span>
                          <span className="bs-file-text">
                            {field.value instanceof File
                              ? field.value.name
                              : "Click to upload ID copy"}
                          </span>
                          <span className="bs-file-hint">
                            JPG, PNG, PDF — max 5MB
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="bs-err" />
                    </FormItem>
                  )}
                />
              </div>

              {/* 06 — Production Add-ons */}
              <div className="bs-step">
                <div className="bs-step-header">
                  <span className="bs-step-num">06</span>
                  <h3 className="bs-step-label">Production Add-ons</h3>
                  <div className="bs-step-line" />
                </div>

                <div className="bs-addons">
                  {categorisedExtras.map(({ cat, label, items }) => (
                    <div key={cat}>
                      <div className="bs-addon-cat-label">{label}</div>
                      <div className="bs-addon-items">
                        {items.map((item) => {
                          const qty = extraQty[item.id] ?? 0;
                          const total = qty * item.pricePerUnit;
                          return (
                            <div key={item.id} className="bs-addon-row">
                              <div className="bs-addon-info">
                                <div className="bs-addon-name">{item.name}</div>
                                <div className="bs-addon-price-hint">
                                  {formatZAR(item.pricePerUnit)} {item.unit}
                                </div>
                              </div>
                              <div className="bs-addon-right">
                                <span
                                  className={`bs-addon-line-total ${qty === 0 ? "zero" : ""}`}
                                >
                                  {qty > 0 ? formatZAR(total) : "—"}
                                </span>
                                <div className="bs-qty">
                                  <button
                                    type="button"
                                    className="bs-qty-btn"
                                    onClick={() =>
                                      changeQty(item.id, -1, item.maxQty)
                                    }
                                    disabled={qty === 0}
                                  >
                                    −
                                  </button>
                                  <span className="bs-qty-val">{qty}</span>
                                  <button
                                    type="button"
                                    className="bs-qty-btn"
                                    onClick={() =>
                                      changeQty(item.id, +1, item.maxQty)
                                    }
                                    disabled={qty >= item.maxQty}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Receipt / running total */}
                <div className="bs-receipt">
                  <div className="bs-receipt-title">Booking Summary</div>

                  {selectedPackage && (
                    <div className="bs-receipt-row">
                      <span className="bs-receipt-name">
                        {labelForPackageType(selectedPackage.type)} Package
                      </span>
                      <span className="bs-receipt-amt">
                        {formatMoneyZAR(
                          selectedPackage.priceCents,
                          selectedPackage.currency,
                        )}
                      </span>
                    </div>
                  )}

                  {selectedExtras.length > 0
                    ? selectedExtras.map((e) => (
                        <div key={e.id} className="bs-receipt-row">
                          <span className="bs-receipt-name">{e.name}</span>
                          <span className="bs-receipt-qty">× {e.qty}</span>
                          <span className="bs-receipt-amt">
                            {formatZAR(e.lineTotal)}
                          </span>
                        </div>
                      ))
                    : !selectedPackage && (
                        <div className="bs-receipt-empty">
                          No items selected yet
                        </div>
                      )}

                  {(selectedPackage || selectedExtras.length > 0) && (
                    <>
                      <div className="bs-receipt-divider" />
                      {selectedPackage && extrasTotal > 0 && (
                        <>
                          <div className="bs-receipt-subtotal-row">
                            <span className="bs-receipt-sub-label">
                              Package
                            </span>
                            <span className="bs-receipt-sub-val">
                              {formatMoneyZAR(
                                selectedPackage.priceCents,
                                selectedPackage.currency,
                              )}
                            </span>
                          </div>
                          <div className="bs-receipt-subtotal-row">
                            <span className="bs-receipt-sub-label">
                              Add-ons
                            </span>
                            <span className="bs-receipt-sub-val">
                              {formatZAR(extrasTotal)}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="bs-receipt-total-row">
                        <span className="bs-receipt-total-label">Total</span>
                        <span className="bs-receipt-total-val">
                          {formatZAR(grandTotal)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bs-footer">
                <p className="bs-footer-note">
                  We&apos;ll confirm your booking via email within 24 hours.
                </p>
                <button type="submit" className="bs-submit" disabled={pending}>
                  {pending ? "Submitting..." : "Confirm Booking →"}
                </button>
              </div>

              {error && <div className="bs-msg error">{error}</div>}
              {success && <div className="bs-msg success">{success}</div>}
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
