/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useMemo, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BOOKING_SERVICES } from "@/data/services/offering-catalog";
import { createBooking } from "@/data/bookings/create-booking";
import { bookingSchema, FormValues } from "@/lib/schemas";
import { ServicePackage } from "@/lib/types";

function formatMoneyZAR(cents: number, currency: string) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default function BookingSection({
  packages,
}: {
  packages: ServicePackage[];
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

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
      bundleEligibilityConfirmed: false,
      idCopy: undefined,
    },
  });

  const service = form.watch("service");
  const packageId = form.watch("packageId");
  const bundleEligibilityConfirmed = form.watch("bundleEligibilityConfirmed");

  const availablePackages = useMemo(
    () =>
      packages
        .filter((pkg) => pkg.isActive && pkg.service === service)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [packages, service],
  );

  const groupedPackages = useMemo(() => {
    const groups = new Map<string, ServicePackage[]>();

    for (const pkg of availablePackages) {
      const existing = groups.get(pkg.category) ?? [];
      existing.push(pkg);
      groups.set(pkg.category, existing);
    }

    return Array.from(groups.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }, [availablePackages]);

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.id === packageId) ?? null,
    [packages, packageId],
  );

  function onSubmit(values: FormValues) {
    setError(undefined);
    setSuccess(undefined);

    const pkg = packages.find((item) => item.id === values.packageId);
    if (!pkg) {
      form.setError("packageId", { message: "Please choose an offering." });
      return;
    }

    if (
      pkg.requiresPaidFullDayStudioBooking &&
      !values.bundleEligibilityConfirmed
    ) {
      form.setError("bundleEligibilityConfirmed", {
        message:
          "Please confirm that a full-day music studio booking has already been paid for.",
      });
      return;
    }

    startTransition(async () => {
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
      fd.append(
        "bundleEligibilityConfirmed",
        String(values.bundleEligibilityConfirmed ?? false),
      );
      if (values.idCopy) fd.append("IdCopy", values.idCopy);

      const res = await createBooking(fd);
      if (!res.success) {
        setError(res.message);
        return;
      }

      setSuccess(res.message);
      form.reset({
        service: values.service,
        packageId: "",
        date: "",
        time: "",
        bookingName: "",
        bookingSurname: "",
        email: "",
        bundleEligibilityConfirmed: false,
        idCopy: undefined,
      });
    });
  }

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
        .bs-header { margin-bottom: 4rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(0,0,0,0.08); }
        .bs-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .bs-eyebrow-line { width: 28px; height: 1px; background: #f05a1a; }
        .bs-eyebrow-text { font-family: 'Manrope', sans-serif; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(0,0,0,0.35); }
        .bs-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: clamp(4rem, 9vw, 7rem); letter-spacing: -0.02em; line-height: 0.95; text-transform: uppercase; color: #000; margin: 0; }
        .bs-title span { color: #f05a1a; }
        .bs-subtitle { font-family: 'Manrope', sans-serif; font-size: 0.92rem; line-height: 1.8; color: rgba(0,0,0,0.48); margin: 1rem 0 0; max-width: 760px; }
        .bs-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr); gap: 2rem; align-items: start; }
        .bs-form { min-width: 0; }
        .bs-sidebar { position: sticky; top: calc(88px + 1.5rem); background: #f4f1eb; border: 1px solid rgba(0,0,0,0.08); padding: 1.5rem; color: #0a0a0a; }
        .bs-sidebar-title { font-family: 'Manrope', sans-serif; font-size: 0.58rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(0,0,0,0.42); margin-bottom: 1rem; }
        .bs-step { margin-bottom: 2.5rem; }
        .bs-step-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
        .bs-step-num { font-family: 'Manrope', sans-serif; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.14em; color: rgba(0,0,0,1); }
        .bs-step-label { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #0a0a0a; margin: 0; }
        .bs-step-line { flex: 1; height: 1px; background: rgba(0,0,0,0.07); }
        .bs-services { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border: 1px solid rgba(0,0,0,0.1); }
        .bs-svc-btn { background: #fff; border: none; border-right: 1px solid rgba(0,0,0,0.1); padding: 1rem 1.25rem; cursor: pointer; text-align: left; transition: background 0.18s; position: relative; }
        .bs-svc-btn:last-child { border-right: none; }
        .bs-svc-btn:hover:not(.active) { background: #fafafa; }
        .bs-svc-btn.active { background: #0a0a0a; }
        .bs-svc-btn.active::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #f05a1a; }
        .bs-svc-num { display: block; font-family: 'Manrope', sans-serif; font-size: 0.52rem; font-weight: 600; letter-spacing: 0.14em; color: rgba(0,0,0,0.22); margin-bottom: 0.3rem; transition: color 0.18s; }
        .bs-svc-btn.active .bs-svc-num { color: rgba(255,255,255,0.28); }
        .bs-svc-name { display: block; font-family: 'Syne', sans-serif; font-size: 0.86rem; font-weight: 700; color: #0a0a0a; transition: color 0.18s; }
        .bs-svc-desc { display: block; margin-top: 0.45rem; font-family: 'Manrope', sans-serif; font-size: 0.72rem; line-height: 1.5; color: rgba(0,0,0,0.45); transition: color 0.18s; }
        .bs-svc-btn.active .bs-svc-name, .bs-svc-btn.active .bs-svc-desc { color: #fff; }
        .bs-package-group { margin-bottom: 1.5rem; }
        .bs-package-group-label { font-family: 'Manrope', sans-serif; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(0,0,0,0.3); margin-bottom: 0.75rem; }
        .bs-package-grid { display: grid; gap: 0.9rem; }
        .bs-package-card { border: 1px solid rgba(0,0,0,0.1); background: #fff; padding: 1.2rem; text-align: left; cursor: pointer; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
        .bs-package-card:hover { border-color: rgba(240,90,26,0.45); transform: translateY(-1px); }
        .bs-package-card.active { border-color: #f05a1a; box-shadow: 0 20px 50px rgba(240,90,26,0.08); }
        .bs-package-top { display: flex; justify-content: space-between; gap: 1rem; align-items: start; margin-bottom: 0.8rem; }
        .bs-package-name { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #0a0a0a; margin: 0; }
        .bs-package-duration { font-family: 'Manrope', sans-serif; font-size: 0.72rem; color: rgba(0,0,0,0.42); margin-top: 0.2rem; }
        .bs-package-price { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 800; color: #0a0a0a; white-space: nowrap; }
        .bs-package-desc { font-family: 'Manrope', sans-serif; font-size: 0.82rem; line-height: 1.7; color: rgba(0,0,0,0.62); margin: 0 0 0.9rem; }
        .bs-package-includes { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .bs-package-pill { font-family: 'Manrope', sans-serif; font-size: 0.66rem; font-weight: 600; color: rgba(0,0,0,0.58); background: #f6f4ef; padding: 0.45rem 0.6rem; }
        .bs-package-note { margin-top: 0.85rem; padding: 0.8rem; background: rgba(240,90,26,0.08); font-family: 'Manrope', sans-serif; font-size: 0.74rem; line-height: 1.6; color: #9b3d15; }
        .bs-no-pkg { margin-top: 0.6rem; font-family: 'Manrope', sans-serif; font-size: 0.72rem; color: rgba(0,0,0,0.35); }
        .bs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .bs-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .bs-label { font-family: 'Manrope', sans-serif; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,0,0,0.38); }
        .bs-input { border: none; border-bottom: 1px solid rgba(0,0,0,0.14); padding: 0.7rem 0; font-family: 'Manrope', sans-serif; font-size: 0.88rem; font-weight: 500; color: #0a0a0a; background: transparent; outline: none; width: 100%; transition: border-color 0.2s; }
        .bs-input:focus { border-color: #f05a1a; }
        .bs-file { border: 1px dashed rgba(0,0,0,0.14); padding: 2rem; text-align: center; position: relative; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .bs-file:hover { border-color: #f05a1a; background: rgba(240,90,26,0.015); }
        .bs-file input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .bs-file-icon { display: block; font-size: 1.25rem; color: rgba(0,0,0,0.18); margin-bottom: 0.5rem; }
        .bs-file-text { font-family: 'Manrope', sans-serif; font-size: 0.78rem; font-weight: 500; color: rgba(0,0,0,0.4); }
        .bs-file-hint { display: block; font-family: 'Manrope', sans-serif; font-size: 0.6rem; color: rgba(0,0,0,0.22); margin-top: 0.3rem; }
        .bs-err { font-family: 'Manrope', sans-serif; font-size: 0.67rem; color: #d93030; margin-top: 0.3rem; }
        .bs-confirm-box { border: 1px solid rgba(240,90,26,0.25); background: rgba(240,90,26,0.04); padding: 1rem; }
        .bs-confirm-row { display: flex; gap: 0.75rem; align-items: start; }
        .bs-confirm-check { margin-top: 0.2rem; accent-color: #f05a1a; }
        .bs-confirm-copy { font-family: 'Manrope', sans-serif; font-size: 0.82rem; line-height: 1.65; color: rgba(0,0,0,0.72); }
        .bs-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 2.5rem; border-top: 1px solid rgba(0,0,0,0.07); gap: 1.5rem; flex-wrap: wrap; }
        .bs-footer-note { font-family: 'Manrope', sans-serif; font-size: 0.74rem; color: rgba(0,0,0,0.34); line-height: 1.6; max-width: 360px; margin: 0; }
        .bs-submit { display: inline-flex; align-items: center; gap: 0.5rem; background: #0a0a0a; color: #fff; font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 2.25rem; border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; }
        .bs-submit:hover { background: #1a1a1a; transform: translateY(-1px); }
        .bs-submit:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        .bs-msg { font-family: 'Manrope', sans-serif; font-size: 0.78rem; font-weight: 500; margin-top: 1.25rem; padding: 0.85rem 1.25rem; border-left: 3px solid; }
        .bs-msg.error { border-color: #d93030; color: #d93030; background: rgba(217,48,48,0.04); }
        .bs-msg.success { border-color: #22c55e; color: #16a34a; background: rgba(34,197,94,0.04); }
        .bs-summary-card { display: flex; flex-direction: column; gap: 1rem; }
        .bs-summary-empty { font-family: 'Manrope', sans-serif; font-size: 0.82rem; line-height: 1.7; color: rgba(0,0,0,0.5); margin: 0; }
        .bs-summary-section { border-top: 1px solid rgba(0,0,0,0.08); padding-top: 1rem; }
        .bs-summary-kicker { font-family: 'Manrope', sans-serif; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(0,0,0,0.36); margin-bottom: 0.5rem; }
        .bs-summary-name { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; color: #0a0a0a; margin: 0; }
        .bs-summary-meta { font-family: 'Manrope', sans-serif; font-size: 0.82rem; line-height: 1.7; color: rgba(0,0,0,0.62); margin: 0.35rem 0 0; }
        .bs-summary-desc { font-family: 'Manrope', sans-serif; font-size: 0.84rem; line-height: 1.75; color: rgba(0,0,0,0.68); margin: 0; }
        .bs-summary-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
        .bs-summary-list li { font-family: 'Manrope', sans-serif; font-size: 0.78rem; line-height: 1.6; color: rgba(0,0,0,0.74); padding-left: 1rem; position: relative; }
        .bs-summary-list li::before { content: '*'; position: absolute; left: 0; color: #f05a1a; }
        .bs-summary-eligibility { padding: 0.9rem; background: rgba(240,90,26,0.1); font-family: 'Manrope', sans-serif; font-size: 0.76rem; line-height: 1.65; color: #9b3d15; }
        .bs-summary-total { display: flex; justify-content: space-between; align-items: end; gap: 1rem; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.08); }
        .bs-summary-total-label { font-family: 'Manrope', sans-serif; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(0,0,0,0.4); }
        .bs-summary-total-value { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: #f05a1a; }
        @media (max-width: 980px) {
          .bs-layout { grid-template-columns: 1fr; }
          .bs-sidebar { position: static; order: -1; }
        }
        @media (max-width: 640px) {
          .bs-root { padding: 5rem 0 4rem; }
          .bs-inner { padding: 0 1.25rem; }
          .bs-services, .bs-row { grid-template-columns: 1fr; }
          .bs-svc-btn { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.1); }
          .bs-svc-btn:last-child { border-bottom: none; }
          .bs-footer { flex-direction: column; align-items: flex-start; }
          .bs-submit { width: 100%; justify-content: center; }
          .bs-package-top { flex-direction: column; }
        }
      `}</style>

      <section className="bs-root" id="book">
        <div className="bs-inner">
          <div className="bs-header">
            <div className="bs-eyebrow">
              <div className="bs-eyebrow-line" />
              <span className="bs-eyebrow-text">Pricing</span>
            </div>
            <h2 className="bs-title">
              Book Your <span>Session</span>
            </h2>
            <p className="bs-subtitle">
              Choose the studio, then pick the exact package that matches your
              session. Each option shows what is included so you can see the
              difference between dry hire, supported sessions, and full podcast
              production.
            </p>
          </div>

          <div className="bs-layout">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bs-form">
                <div className="bs-step">
                  <div className="bs-step-header">
                    <span className="bs-step-num">01</span>
                    <h3 className="bs-step-label">Select Studio</h3>
                    <div className="bs-step-line" />
                  </div>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="bs-services">
                            {BOOKING_SERVICES.map((item) => (
                              <button
                                key={item.value}
                                type="button"
                                className={`bs-svc-btn ${field.value === item.value ? "active" : ""}`}
                                onClick={() => {
                                  field.onChange(item.value);
                                  form.setValue("packageId", "");
                                  form.setValue(
                                    "bundleEligibilityConfirmed",
                                    false,
                                  );
                                }}
                              >
                                <span className="bs-svc-num">{item.num}</span>
                                <span className="bs-svc-name">
                                  {item.label}
                                </span>
                                <span className="bs-svc-desc">
                                  {item.description}
                                </span>
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage className="bs-err" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bs-step">
                  <div className="bs-step-header">
                    <span className="bs-step-num">02</span>
                    <h3 className="bs-step-label">Choose Offering</h3>
                    <div className="bs-step-line" />
                  </div>
                  <FormField
                    control={form.control}
                    name="packageId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            {groupedPackages.map((group) => (
                              <div
                                className="bs-package-group"
                                key={group.category}
                              >
                                <div className="bs-package-group-label">
                                  {group.category}
                                </div>
                                <div className="bs-package-grid">
                                  {group.items.map((pkg) => (
                                    <button
                                      key={pkg.id}
                                      type="button"
                                      className={`bs-package-card ${field.value === pkg.id ? "active" : ""}`}
                                      onClick={() => {
                                        field.onChange(pkg.id);
                                        if (
                                          !pkg.requiresPaidFullDayStudioBooking
                                        ) {
                                          form.setValue(
                                            "bundleEligibilityConfirmed",
                                            false,
                                          );
                                        }
                                      }}
                                    >
                                      <div className="bs-package-top">
                                        <div>
                                          <h4 className="bs-package-name">
                                            {pkg.name}
                                          </h4>
                                          <div className="bs-package-duration">
                                            {pkg.durationLabel}
                                          </div>
                                        </div>
                                        <div className="bs-package-price">
                                          {formatMoneyZAR(
                                            pkg.priceCents,
                                            pkg.currency,
                                          )}
                                        </div>
                                      </div>
                                      {pkg.description && (
                                        <p className="bs-package-desc">
                                          {pkg.description}
                                        </p>
                                      )}
                                      <div className="bs-package-includes">
                                        {pkg.includes.map((item) => (
                                          <span
                                            className="bs-package-pill"
                                            key={`${pkg.id}-${item}`}
                                          >
                                            {item}
                                          </span>
                                        ))}
                                      </div>
                                      {pkg.requiresPaidFullDayStudioBooking && (
                                        <div className="bs-package-note">
                                          This discounted bundle is only
                                          available once a full-day music studio
                                          booking has already been paid for.
                                        </div>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {availablePackages.length === 0 && (
                              <p className="bs-no-pkg">
                                No online packages are active for this studio
                                right now.
                              </p>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="bs-err" />
                      </FormItem>
                    )}
                  />
                </div>

                {selectedPackage?.requiresPaidFullDayStudioBooking && (
                  <div className="bs-step">
                    <div className="bs-step-header">
                      <span className="bs-step-num">03</span>
                      <h3 className="bs-step-label">Bundle Confirmation</h3>
                      <div className="bs-step-line" />
                    </div>
                    <FormField
                      control={form.control}
                      name="bundleEligibilityConfirmed"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="bs-confirm-box">
                              <label className="bs-confirm-row">
                                <input
                                  type="checkbox"
                                  className="bs-confirm-check"
                                  checked={field.value ?? false}
                                  onChange={(event) =>
                                    field.onChange(event.target.checked)
                                  }
                                />
                                <span className="bs-confirm-copy">
                                  I confirm that a full-day music studio booking
                                  has already been booked and paid for, so this
                                  client qualifies for the discounted green
                                  screen bundle.
                                </span>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage className="bs-err" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="bs-step">
                  <div className="bs-step-header">
                    <span className="bs-step-num">
                      {selectedPackage?.requiresPaidFullDayStudioBooking
                        ? "04"
                        : "03"}
                    </span>
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

                <div className="bs-step">
                  <div className="bs-step-header">
                    <span className="bs-step-num">
                      {selectedPackage?.requiresPaidFullDayStudioBooking
                        ? "05"
                        : "04"}
                    </span>
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

                <div className="bs-step">
                  <div className="bs-step-header">
                    <span className="bs-step-num">
                      {selectedPackage?.requiresPaidFullDayStudioBooking
                        ? "06"
                        : "05"}
                    </span>
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
                              JPG, PNG, PDF - max 5MB
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage className="bs-err" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bs-footer">
                  <p className="bs-footer-note">
                    Bookings are submitted as requests first. The team will
                    confirm the session and payment details by email.
                  </p>
                  <button
                    type="submit"
                    className="bs-submit"
                    disabled={pending}
                  >
                    {pending ? "Submitting..." : "Confirm Booking"}
                  </button>
                </div>

                {error && <div className="bs-msg error">{error}</div>}
                {success && <div className="bs-msg success">{success}</div>}
              </form>
            </Form>

            <aside className="bs-sidebar">
              <div className="bs-sidebar-title">Booking Summary</div>
              {selectedPackage ? (
                <div className="bs-summary-card">
                  <div>
                    <div className="bs-summary-kicker">
                      {selectedPackage.category}
                    </div>
                    <h3 className="bs-summary-name">{selectedPackage.name}</h3>
                    <p className="bs-summary-meta">
                      {selectedPackage.durationLabel} -{" "}
                      {selectedPackage.minutes} minutes
                    </p>
                  </div>

                  {selectedPackage.description && (
                    <div className="bs-summary-section">
                      <div className="bs-summary-kicker">Overview</div>
                      <p className="bs-summary-desc">
                        {selectedPackage.description}
                      </p>
                    </div>
                  )}

                  <div className="bs-summary-section">
                    <div className="bs-summary-kicker">Included</div>
                    <ul className="bs-summary-list">
                      {selectedPackage.includes.map((item) => (
                        <li key={`${selectedPackage.id}-${item}`}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedPackage.requiresPaidFullDayStudioBooking && (
                    <div className="bs-summary-eligibility">
                      Bundle rule: this package is only valid once a full-day
                      music studio booking has already been booked and paid for.
                      {bundleEligibilityConfirmed
                        ? " Eligibility has been confirmed for this request."
                        : " You still need to confirm eligibility before submitting."}
                    </div>
                  )}

                  <div className="bs-summary-total">
                    <div className="bs-summary-total-label">Session Price</div>
                    <div className="bs-summary-total-value">
                      {formatMoneyZAR(
                        selectedPackage.priceCents,
                        selectedPackage.currency,
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="bs-summary-empty">
                  Select an offering to preview the package description, the
                  included gear or support, and the session price before you
                  submit the booking request.
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
