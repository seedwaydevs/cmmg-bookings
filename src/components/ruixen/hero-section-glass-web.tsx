"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { div } from "motion/react-client";
import Image, { StaticImageData } from "next/image";

type Action = { href: string; label: string };

export type HeroSectionProps = {
  imageSrc: StaticImageData[];
  imageAlt?: string;
  kicker?: string;
  title: string;
  description?: string;
  services?: string[];
  primaryAction?: Action;
  secondaryAction?: Action;
  coordinates?: string; // e.g. "34°N 118°W\nLos Angeles, US"
  metaLeft?: string;
  metaCenter?: string;
  metaRight?: string;
  className?: string;
};

export function HeroSection({
  imageSrc,
  imageAlt = "",
  kicker = "Content And Music Media Group",
  title,
  description,
  services,
  primaryAction,
  secondaryAction,
  coordinates,
  metaLeft,
  metaCenter,
  metaRight,
  className,
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageSrc.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageSrc.length]);
  return (
    <section
      className={cn(
        "relative isolate min-h-[92svh] w-full overflow-hidden text-white",
        className,
      )}
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full overflow-hidden">
          {imageSrc.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`${title} - Image ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover object-center scale-105 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-90" : "opacity-0"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        {/* dark vignette + subtle color cast */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_35%,rgba(9,9,11,0.25)_0%,rgba(9,9,11,0.65)_60%,rgba(9,9,11,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15" />
        {/* soft glow accent */}
        <div className="pointer-events-none absolute -left-48 top-1/2 h-[50rem] w-[50rem] -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* top-right coordinates */}
      {coordinates ? (
        <div className="pointer-events-none absolute right-6 top-6 hidden text-right text-xs tracking-widest text-white/70 md:block">
          {coordinates.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      ) : null}

      {/* Content */}
      <div className="container relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 mt-10 py-16 md:py-24 lg:py-28">
        <div className="col-span-1 mt-1 md:col-span-7 lg:col-span-7">
          <Badge
            variant="outline"
            className="mb-6 border-white/25 bg-white/10 text-white backdrop-blur rounded-none p-2 rounded-md"
          >
            {kicker}
          </Badge>

          <h1 className="text-balance text-5xl font-bold leading-[0.95] sm:text-6xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-4">
            {primaryAction ? (
              <Button asChild size="lg" className="font-medium rounded-none">
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
            ) : null}

            {secondaryAction ? (
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white/10 rounded-none text-white hover:bg-white/20 border border-white/20"
              >
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="col-span-1  space-y-7">
          {description ? (
            <p className="max-w-prose text-base leading-relaxed text-white/85 md:text-lg">
              {description}
            </p>
          ) : null}
          <div className="flex space-x-2">
            {services
              ? services.map((service, index) => (
                  <Badge
                    key={index}
                    className="mb-6 border-white/25 bg-white/10 text-white backdrop-blur rounded-none p-2 rounded-md"
                  >
                    {service}
                  </Badge>
                ))
              : null}
          </div>
        </div>
      </div>

      {/* bottom meta row */}
      {(metaLeft || metaCenter || metaRight) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 px-6">
          <div className="container mx-auto flex w-full max-w-7xl items-center justify-between text-xs text-white/70">
            <span className=" sm:block">{metaLeft}</span>
            <span className="truncate text-center">{metaCenter}</span>
            <span className=" sm:block">{metaRight}</span>
          </div>
        </div>
      )}
    </section>
  );
}
