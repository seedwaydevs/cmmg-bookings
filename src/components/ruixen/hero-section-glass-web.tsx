"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

/*
  FONTS used: Syne (display) + Manrope (body)
  Add to your layout.tsx globals — same as Nav.
*/

export type HeroSectionProps = {
  imageSrc: StaticImageData;
  imageAlt?: string;
  kicker?: string;
  title: string;
  description?: string;
  services?: string[];
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
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
  metaLeft,
  metaCenter,
  metaRight,
  className = "",
}: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const [tick, setTick] = useState(0);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  // Clock ticker for the live indicator
  useEffect(() => {
    tickRef.current = setInterval(() => setTick((t) => t + 1), 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');

        .hero-root {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #050505;
          font-family: 'Syne', sans-serif;
        }

        /* ── BACKGROUND ── */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(0.6) brightness(0.45);
          transform: scale(1.04);
          transition: transform 8s ease, opacity 1.2s ease;
        }
        .hero-img.loaded {
          opacity: 1;
          transform: scale(1);
        }
        .hero-img:not(.loaded) {
          opacity: 0;
        }
        /* Layered overlays for depth */
        .hero-overlay-1 {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(5, 5, 5, 0.82) 0%,
            rgba(5, 5, 5, 0.4) 50%,
            rgba(5, 5, 5, 0.6) 100%
          );
        }
        .hero-overlay-2 {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5, 5, 5, 0.98) 0%,
            rgba(5, 5, 5, 0.0) 45%
          );
        }
        /* Blue accent glow — top right */
        .hero-glow {
          position: absolute;
          top: -10%;
          right: -5%;
          width: 55vw;
          height: 55vw;
          max-width: 700px;
          max-height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,140,255,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        /* Orange stripe accent — left edge */
        .hero-stripe {
          position: absolute;
          left: 0;
          top: 10%;
          bottom: 10%;
          width: 3px;
          background: linear-gradient(to bottom, transparent 0%, #f05a1a 30%, #f05a1a 70%, transparent 100%);
          z-index: 2;
        }

        /* ── HEADER ROW (top meta) ── */
        .hero-topbar {
          position: relative;
          z-index: 10;
          padding-top: 96px; /* offset for fixed nav */
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 3rem;
          padding-right: 3rem;
          padding-top: 8rem;
        }
        .hero-kicker {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .hero-kicker-line {
          width: 28px;
          height: 1px;
          background: #f05a1a;
        }
        .hero-kicker-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .hero-live {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.35);
        }
        .hero-live-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #f05a1a;
          animation: blink 1.5s step-start infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── MAIN CONTENT ── */
        .hero-content {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 3rem 5rem;
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
        }

        /* Title layout: big left + descriptor right */
        .hero-body {
          display: grid;
          grid-template-columns: 1fr 340px;
          align-items: flex-end;
          gap: 3rem;
        }

        .hero-title-block {}

        /* Eyebrow number */
        .hero-number {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          margin-bottom: 1.25rem;
          display: block;
        }

        .hero-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(5rem, 10vw, 9rem);
          letter-spacing: -0.02em;
          line-height: 0.95;
          text-transform: uppercase;
          color: #ffffff;
        }
        /* The orange word accent */
        .hero-title em {
          font-style: normal;
          color: #f05a1a;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2.5rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #f05a1a;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2rem;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .btn-primary:hover { background: #d44d14; transform: translateY(-1px); }
        .btn-primary-arrow {
          font-size: 1rem;
          line-height: 1;
          transition: transform 0.2s;
        }
        .btn-primary:hover .btn-primary-arrow { transform: translateX(3px); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.55);
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .btn-secondary:hover { color: #fff; border-color: #fff; }

        /* Right panel: description + tags */
        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          padding-bottom: 0.5rem;
        }
        .hero-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }
        .hero-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }
        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .hero-tag {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.35rem 0.75rem;
          transition: border-color 0.2s, color 0.2s;
        }
        .hero-tag:hover {
          border-color: rgba(26,140,255,0.5);
          color: #1a8cff;
        }

        /* ── BOTTOM META BAR ── */
        .hero-meta {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(5,5,5,0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .hero-meta-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3rem;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hero-meta-item {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }
        .hero-meta-center {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .hero-meta-sep {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #1a8cff;
          opacity: 0.5;
        }

        /* ── SCROLL INDICATOR ── */
        .scroll-indicator {
          position: absolute;
          right: 3rem;
          bottom: 3.5rem;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }
        .scroll-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          writing-mode: vertical-rl;
        }
        .scroll-line {
          width: 1px;
          height: 48px;
          background: rgba(255,255,255,0.12);
          position: relative;
          overflow: hidden;
        }
        .scroll-line::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #f05a1a;
          animation: scroll-drop 2s ease-in-out infinite;
        }
        @keyframes scroll-drop {
          0% { top: -100%; }
          100% { top: 200%; }
        }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          .hero-topbar { padding: 7rem 1.5rem 0; }
          .hero-content { padding: 0 1.5rem 4rem; }
          .hero-body { grid-template-columns: 1fr; gap: 2rem; }
          .hero-right { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 1.5rem; }
          .scroll-indicator { display: none; }
          .hero-meta-inner { padding: 0 1.5rem; }
          .hero-meta-center { display: none; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: clamp(2.5rem, 11vw, 4rem); }
          .hero-actions { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className={`hero-root ${className}`} aria-label="Hero">
        {/* Background */}
        <div className="hero-bg">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className={`hero-img ${loaded ? "loaded" : ""}`}
            onLoad={() => setLoaded(true)}
          />
          <div className="hero-overlay-1" />
          <div className="hero-overlay-2" />
          <div className="hero-glow" />
          <div className="hero-stripe" />
        </div>

        {/* Top bar */}
        <div className="hero-topbar">
          <div className="hero-kicker">
            <div className="hero-kicker-line" />
            <span className="hero-kicker-text">{kicker}</span>
          </div>
          <div className="hero-live">
            <span className="hero-live-dot" />
            {timeStr}
          </div>
        </div>

        {/* Main content */}
        <div className="hero-content">
          <div className="hero-body">
            {/* Left: title + CTA */}
            <div className="hero-title-block">
              <span className="hero-number">01 / HERO</span>
              <h1 className="hero-title">
                {/* Split title for orange accent on last word */}
                {title.split(" ").map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <React.Fragment key={i}>
                      {" "}
                      <em>{word}</em>
                    </React.Fragment>
                  ) : i === 0 ? (
                    <React.Fragment key={i}>{word}</React.Fragment>
                  ) : (
                    <React.Fragment key={i}> {word}</React.Fragment>
                  ),
                )}
              </h1>

              <div className="hero-actions">
                {primaryAction && (
                  <Link href={primaryAction.href} className="btn-primary">
                    {primaryAction.label}
                    <span className="btn-primary-arrow">→</span>
                  </Link>
                )}
                {secondaryAction && (
                  <Link href={secondaryAction.href} className="btn-secondary">
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            </div>

            {/* Right: description + tags */}
            <div className="hero-right">
              <div className="hero-divider" />
              {description && <p className="hero-desc">{description}</p>}
              {services && services.length > 0 && (
                <div className="hero-tags">
                  {services.map((s, i) => (
                    <span key={i} className="hero-tag">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-line" />
        </div>

        {/* Bottom meta bar */}
        <div className="hero-meta">
          <div className="hero-meta-inner">
            <span className="hero-meta-item">{metaLeft}</span>
            <div className="hero-meta-center">
              <span className="hero-meta-item">{metaCenter}</span>
              <div className="hero-meta-sep" />
              <span className="hero-meta-item">{metaRight}</span>
            </div>
            <span
              className="hero-meta-item"
              style={{ color: "rgba(26,140,255,0.5)" }}
            >
              ● Live
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
