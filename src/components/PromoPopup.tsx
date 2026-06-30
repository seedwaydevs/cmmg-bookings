"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

// Bump this version string any time you want the popup to show again
// for everyone (e.g. when a new campaign starts/changes).
const STORAGE_KEY = "cmmg_promo_seen_v2";
const SHOW_DELAY_MS = 400;

const PROMO_CONTENT = {
  eyebrow: "Recording Special",
  heading: "Record your single in one day.",
  body: "All-inclusive studio session: recording, professional sound engineering, and industry-standard mixing & mastering.",
  ctaLabel: "Book & Secure Your Session",
  ctaHref: "#book",
  // Place the campaign creative at this path in your /public folder.
  imageSrc: "/recording-special_1.png",
  imageAlt:
    "CMMG Studios Recording Special — One Day Session, all-inclusive studio experience",
  includes: [
    { title: "Recording", detail: "Professional studio time" },
    { title: "Sound Engineering", detail: "Professional engineer" },
    { title: "Mixing & Mastering", detail: "Industry standard" },
  ],
  // TODO: replace with real campaign figures before going live
  pricing: {
    currency: "R",
    wasPrice: 7500,
    campaignPrice: 4200,
  },
};

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let hasSeen = true;
    try {
      hasSeen = window.localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // localStorage unavailable (e.g. privacy mode) — fail safe, don't show
      hasSeen = true;
    }

    if (hasSeen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore — worst case it shows again next visit
      }
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const { currency, wasPrice, campaignPrice } = PROMO_CONTENT.pricing;
  const hasPricing = wasPrice > 0 && campaignPrice > 0;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#c41e1e]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-popup-heading"
    >
      {/* Intentionally no backdrop-click-to-close — this is a full takeover.
          Escape key and the explicit close button below still work.
          Positioned at top-20 to clear the site nav / hamburger button. */}
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="fixed right-4 top-20 z-10 rounded-full bg-black/20 p-2 text-white transition hover:bg-black/30"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="mx-auto flex min-h-full max-w-5xl flex-col items-center justify-center gap-8 px-5 py-16 pt-30 md:pt-0 md:grid md:grid-cols-2 md:items-center md:gap-10 md:text-left">
        {/* Left column (full width on mobile): headline, details, price, CTA */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            {PROMO_CONTENT.eyebrow}
          </p>
          <h2
            id="promo-popup-heading"
            className="mt-3 max-w-xs text-3xl font-extrabold leading-tight text-white sm:text-4xl md:max-w-sm"
          >
            {PROMO_CONTENT.heading}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">
            {PROMO_CONTENT.body}
          </p>

          {/* What's included */}
          <ul className="mt-6 w-full max-w-sm space-y-3 text-left">
            {PROMO_CONTENT.includes.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 10.5L8 14.5L16 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm text-white">
                  <span className="font-semibold">{item.title}</span>{" "}
                  <span className="text-white/80">— {item.detail}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Pricing — was / campaign price */}
          {hasPricing && (
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-lg font-medium text-white/60 line-through">
                {currency}
                {wasPrice.toLocaleString()}
              </span>
              <span className="text-3xl font-extrabold text-white">
                {currency}
                {campaignPrice.toLocaleString()}
              </span>
            </div>
          )}

          <a
            href={PROMO_CONTENT.ctaHref}
            onClick={close}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#c41e1e] shadow-lg transition hover:bg-white/90"
          >
            {PROMO_CONTENT.ctaLabel}
          </a>
        </div>

        {/* Right column on desktop / below content on mobile: campaign creative */}
        <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-2xl md:max-w-none">
          <Image
            src={PROMO_CONTENT.imageSrc}
            alt={PROMO_CONTENT.imageAlt}
            width={1200}
            height={1200}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
