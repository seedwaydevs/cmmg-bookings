"use client";

import React, { useState, useTransition } from "react";
import { useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
  // You can replace this with Intl.NumberFormat for ZAR if you want
  const amount = (cents / 100).toFixed(2);
  return `${currency} ${amount}`;
}

export default function BookingSection({
  packages,
}: {
  packages: ServicePackage[]; // pass from server/API
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [checked, setChecked] = useState(false);
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

  const availablePackages = useMemo(() => {
    return packages
      .filter((p) => p.isActive && p.service === service)
      .sort((a, b) => a.minutes - b.minutes);
  }, [packages, service]);

  const selectedPackage = useMemo(() => {
    return packages.find((p) => p.id === packageId) ?? null;
  }, [packages, packageId]);

  function onSubmit(values: FormValues) {
    setError(undefined);
    startTransition(async () => {
      const pkg = packages.find((p) => p.id === values.packageId);
      if (!pkg) {
        form.setError("packageId", {
          message: "Package not found. Please select again.",
        });
        return;
      }

      const dateTimeISO = new Date(
        `${values.date}T${values.time}:00`,
      ).toISOString();

      const fd = new FormData();
      fd.append("service", values.service);
      fd.append("date", dateTimeISO);
      fd.append("bookingName", values.bookingName);
      fd.append("bookingSurname", values.bookingSurname);
      fd.append("email", values.email.toLowerCase().trim());
      fd.append("packageId", values.packageId);
      fd.append("durationMinutes", String(pkg.minutes));
      fd.append("priceCents", String(pkg.priceCents));
      fd.append("currency", pkg.currency);
      if (values.idCopy) {
        fd.append("IdCopy", values.idCopy);
      }

      const res = await createBooking(fd);
      if (!res.success) {
        setError(res?.message);
      } else {
        setSuccess(res.message);
        form.reset();
      }
    });
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Book Your Session
          </h2>
          <p className="text-muted-foreground">
            Choose a service and package. We’ll confirm your booking within 24
            hours.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Service */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Service
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(
                        [
                          "STUDIO",
                          "GREENSCREEN",
                          "SOUNDMIXING",
                          "FINALMIX",
                        ] as const
                      ).map((s) => {
                        const active = field.value === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              field.onChange(s);
                              form.setValue("packageId", ""); // reset package when service changes
                            }}
                            className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card hover:border-primary/50"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Package */}
            <FormField
              control={form.control}
              name="packageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Package
                  </FormLabel>
                  <FormControl>
                    <select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a package...</option>
                      {availablePackages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {labelForPackageType(p.type)} — {p.minutes} min —{" "}
                          {formatMoneyZAR(p.priceCents, p.currency)}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {availablePackages.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No active packages found for {service}.
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date + Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" min={today} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Time
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Name/Surname/Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bookingName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookingSurname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ID Copy */}
            <FormField
              control={form.control}
              name="idCopy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload ID Copy</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      className="cursor-pointer border-2 border-dashed"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-2">
                    Accepted formats: JPG, PNG, PDF (Max 5MB)
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            {selectedPackage && (
              <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Selected package
                  </span>
                  <span className="font-medium">
                    {labelForPackageType(selectedPackage.type)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">
                    {selectedPackage.minutes} minutes
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold text-primary">
                    {formatMoneyZAR(
                      selectedPackage.priceCents,
                      selectedPackage.currency,
                    )}
                  </span>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" className="rounded-xl px-8 py-6">
                Confirm Booking
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
