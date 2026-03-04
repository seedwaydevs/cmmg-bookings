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

function labelForPackageType(type: ServicePackage["type"]) {
  switch (type) {
    case "TWO_HOURS":
      return "2 Hours";
    case "FOUR_HOURS":
      return "4 Hours";
    case "HALF_DAY_6H":
      return "Half Day (6h)";
    case "HALF_DAY_7H":
      return "Half Day (7h)";
    case "FULL_DAY":
      return "Full Day";
  }
}

function formatMoneyZAR(cents: number, currency: string) {
  return `${currency} ${(cents / 100).toFixed(2)}`;
}

const SERVICES = [
  { value: "STUDIO", label: "Recording Studio", num: "01" },
  { value: "GREENSCREEN", label: "Green Screen", num: "02" },
  { value: "SOUNDMIXING", label: "Sound Mixing", num: "03" },
  { value: "FINALMIX", label: "Final Mix", num: "04" },
] as const;

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

      const res = await createBooking(fd);
      if (!res.success) setError(res?.message);
      else {
        setSuccess(res.message);
        form.reset();
      }
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

        .bs-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ── HEADER ── */
        .bs-header {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .bs-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .bs-eyebrow-line { width: 28px; height: 1px; background: #f05a1a; }
        .bs-eyebrow-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.35);
        }
        .bs-title {
          font-family: 'Bricolage Grotesque',
sans-serif;
font-weight: 800;
font-size: clamp(5rem, 10vw, 9rem);
letter-spacing: -0.02em;
line-height: 0.95;
text-transform: uppercase;
color: #000000;
        }
        .bs-title span { color: #f05a1a; }
        .bs-subtitle {
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(0,0,0,0.4);
          margin: 0;
        }

        /* ── STEP ── */
        .bs-step {
          margin-bottom: 2.75rem;
        }
        .bs-step-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .bs-step-num {
          font-family: 'Manrope', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: rgba(0,0,0,0.2);
        }
        .bs-step-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #0a0a0a;
          margin: 0;
        }
        .bs-step-line {
          flex: 1;
          height: 1px;
          background: rgba(0,0,0,0.07);
        }

        /* ── SERVICE BUTTONS ── */
        .bs-services {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(0,0,0,0.1);
        }
        .bs-svc-btn {
          background: #fff;
          border: none;
          border-right: 1px solid rgba(0,0,0,0.1);
          padding: 1rem 1.25rem;
          cursor: pointer;
          text-align: left;
          transition: background 0.18s;
          position: relative;
        }
        .bs-svc-btn:last-child { border-right: none; }
        .bs-svc-btn:hover:not(.active) { background: #fafafa; }
        .bs-svc-btn.active { background: #0a0a0a; }
        .bs-svc-btn.active::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #f05a1a;
        }
        .bs-svc-num {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.52rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: rgba(0,0,0,0.22);
          margin-bottom: 0.3rem;
          transition: color 0.18s;
        }
        .bs-svc-btn.active .bs-svc-num { color: rgba(255,255,255,0.28); }
        .bs-svc-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          color: #0a0a0a;
          letter-spacing: -0.01em;
          transition: color 0.18s;
        }
        .bs-svc-btn.active .bs-svc-name { color: #fff; }

        /* ── SELECT ── */
        .bs-select-wrap { position: relative; }
        .bs-select {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.12);
          padding: 0.9rem 2.5rem 0.9rem 1rem;
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #0a0a0a;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .bs-select:focus { border-color: #f05a1a; }
        .bs-select-caret {
          position: absolute;
          right: 1rem; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(0,0,0,0.3);
          font-size: 0.65rem;
        }
        .bs-no-pkg {
          margin-top: 0.6rem;
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          color: rgba(0,0,0,0.35);
        }

        /* ── PACKAGE SUMMARY STRIP ── */
        .bs-summary {
          background: #0a0a0a;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.75rem;
        }
        .bs-summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .bs-summary-key {
          font-family: 'Manrope', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
        .bs-summary-val {
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: rgba(255,255,255,0.8);
        }
        .bs-summary-price {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #f05a1a;
          letter-spacing: -0.02em;
        }

        /* ── TWO COL ── */
        .bs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        /* ── INPUT ── */
        .bs-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .bs-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.38);
        }
        .bs-input {
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.14);
          padding: 0.7rem 0;
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #0a0a0a;
          background: transparent;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }
        .bs-input:focus { border-color: #f05a1a; }
        .bs-input::placeholder { color: rgba(0,0,0,0.22); }

        /* ── FILE UPLOAD ── */
        .bs-file {
          border: 1px dashed rgba(0,0,0,0.14);
          padding: 2rem;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .bs-file:hover { border-color: #f05a1a; background: rgba(240,90,26,0.015); }
        .bs-file input {
          position: absolute; inset: 0;
          opacity: 0; cursor: pointer;
          width: 100%; height: 100%;
        }
        .bs-file-icon {
          display: block;
          font-size: 1.25rem;
          color: rgba(0,0,0,0.18);
          margin-bottom: 0.5rem;
        }
        .bs-file-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(0,0,0,0.4);
        }
        .bs-file-hint {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          color: rgba(0,0,0,0.22);
          margin-top: 0.3rem;
        }

        /* ── FIELD ERROR ── */
        .bs-err {
          font-family: 'Manrope', sans-serif;
          font-size: 0.67rem;
          color: #d93030;
          margin-top: 0.3rem;
        }

        /* ── FOOTER ── */
        .bs-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(0,0,0,0.07);
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .bs-footer-note {
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem;
          color: rgba(0,0,0,0.28);
          line-height: 1.55;
          max-width: 260px;
        }
        .bs-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0a0a0a;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 1rem 2.25rem;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .bs-submit::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #f05a1a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .bs-submit:hover::before { transform: scaleX(1); }
        .bs-submit:hover { background: #1a1a1a; transform: translateY(-1px); }
        .bs-submit:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

        /* ── STATUS MESSAGES ── */
        .bs-msg {
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          margin-top: 1.25rem;
          padding: 0.85rem 1.25rem;
          border-left: 3px solid;
        }
        .bs-msg.error   { border-color: #d93030; color: #d93030; background: rgba(217,48,48,0.04); }
        .bs-msg.success { border-color: #22c55e; color: #16a34a; background: rgba(34,197,94,0.04); }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .bs-root { padding: 5rem 0 4rem; }
          .bs-inner { padding: 0 1.25rem; }
          .bs-services { grid-template-columns: 1fr 1fr; }
          .bs-svc-btn { border-bottom: 1px solid rgba(0,0,0,0.1); }
          .bs-svc-btn:nth-child(2) { border-right: none; }
          .bs-row { grid-template-columns: 1fr; gap: 1.25rem; }
          .bs-footer { flex-direction: column; align-items: flex-start; }
          .bs-submit { width: 100%; justify-content: center; }
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
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

              {/* Package summary strip — appears when package selected */}
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
                    <span className="bs-summary-key">Total</span>
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

              {/* 04 — Details */}
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

              {/* 05 — ID Upload */}
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
