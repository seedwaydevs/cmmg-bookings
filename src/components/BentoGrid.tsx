"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const images = [
  {
    src: "/hire/studio-1.jpg",
    alt: "Recording Studio Main Room",
    label: "Recording Studio",
    category: "Audio",
  },
  {
    src: "/hire/studio-2.jpg",
    alt: "Green Screen Setup",
    label: "Green Screen Studio",
    category: "Visual",
  },
  {
    src: "/hire/studio-3.jpg",
    alt: "Podcast Room",
    label: "Podcast Suite",
    category: "Broadcast",
  },
  {
    src: "/hire/studio-4.jpg",
    alt: "Film Production Stage",
    label: "Film Stage",
    category: "Cinema",
  },
  {
    src: "/hire/studio-5.jpg",
    alt: "Equipment Room",
    label: "Equipment Room",
    category: "Gear",
  },
];

const VISIBLE = 5;

const BentoGrid = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleImages = images.slice(0, VISIBLE);
  const hiddenCount = Math.max(0, images.length - VISIBLE);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');

        .bg-root {
          background: #050505;
          padding: 7rem 0 6rem;
          font-family: 'Syne', sans-serif;
          position: relative;
        }

        .bg-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        /* ── HEADER ── */
        .bg-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .bg-header-left {}
        .bg-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .bg-eyebrow-line {
          width: 28px; height: 1px;
          background: #f05a1a;
        }
        .bg-eyebrow-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .bg-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(5rem, 10vw, 9rem);
          letter-spacing: -0.02em;
          line-height: 0.95;
          text-transform: uppercase;
          color: #ffffff;
        }
        .bg-title span { color: #f05a1a; }
        .bg-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }
        .bg-count {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .bg-count strong { color: #1a8cff; }
        .bg-hint {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .bg-hint-icon {
          width: 16px; height: 16px;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.55rem;
        }

        /* ── BENTO GRID ── */
        .bg-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 420px 280px;
          gap: 6px;
        }

        /* Cell positions */
        .bg-cell-0 { grid-column: 1 / 8; grid-row: 1; }
        .bg-cell-1 { grid-column: 8 / 13; grid-row: 1; }
        .bg-cell-2 { grid-column: 1 / 5; grid-row: 2; }
        .bg-cell-3 { grid-column: 5 / 9; grid-row: 2; }
        .bg-cell-4 { grid-column: 9 / 13; grid-row: 2; }

        .bg-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #111;
        }

        /* Thin orange/blue accent border on hover */
        .bg-cell::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          transition: border-color 0.3s ease;
          z-index: 3;
          pointer-events: none;
        }
        .bg-cell.accent-orange:hover::after { border-color: #f05a1a; }
        .bg-cell.accent-blue:hover::after   { border-color: #1a8cff; }

        .bg-cell img {
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94),
                      filter 0.4s ease;
          filter: saturate(0.8) brightness(0.85);
        }
        .bg-cell:hover img {
          transform: scale(1.06) !important;
          filter: saturate(1) brightness(0.95);
        }

        /* Overlay: always present gradient, label revealed on hover */
        .bg-cell-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 50%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          opacity: 1;
        }
        .bg-cell-meta {
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .bg-cell:hover .bg-cell-meta {
          transform: translateY(0);
          opacity: 1;
        }
        .bg-cell-category {
          font-family: 'Manrope', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.35rem;
        }
        .bg-cell-label {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        /* Expand icon */
        .bg-cell-expand {
          position: absolute;
          top: 1rem; right: 1rem;
          z-index: 3;
          width: 32px; height: 32px;
          background: rgba(5,5,5,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.25s ease, transform 0.25s ease;
          color: rgba(255,255,255,0.7);
          font-size: 0.7rem;
        }
        .bg-cell:hover .bg-cell-expand {
          opacity: 1;
          transform: scale(1);
        }

        /* +X more overlay */
        .bg-cell-more-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-cell-more-blur {
          position: absolute;
          inset: 0;
          background: rgba(5,5,5,0.72);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          transition: background 0.3s ease;
        }
        .bg-cell:hover .bg-cell-more-blur {
          background: rgba(5,5,5,0.6);
        }
        .bg-cell-more-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          text-align: center;
        }
        .bg-cell-more-count {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.04em;
          line-height: 1;
          transition: color 0.2s;
        }
        .bg-cell:hover .bg-cell-more-count { color: #f05a1a; }
        .bg-cell-more-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        /* ── CTA ── */
        .bg-cta {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .bg-cta-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.04em;
        }
        .bg-cta-btn {
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
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .bg-cta-btn:hover { background: #d44d14; transform: translateY(-1px); }

        /* ── LIGHTBOX ── */
        .lb-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(3, 3, 3, 0.97);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          animation: lb-in 0.25s ease;
        }
        @keyframes lb-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .lb-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          z-index: 2;
        }
        .lb-title-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .lb-category {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f05a1a;
        }
        .lb-sep { color: rgba(255,255,255,0.15); font-size: 0.7rem; }
        .lb-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          letter-spacing: -0.01em;
        }
        .lb-close {
          background: none;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5);
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .lb-close:hover { border-color: #f05a1a; color: #f05a1a; }

        .lb-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 80px 80px;
        }
        .lb-img-wrap {
          position: relative;
          width: 100%;
          max-width: 1100px;
          height: 100%;
          max-height: 75vh;
          animation: lb-img-in 0.3s ease;
        }
        @keyframes lb-img-in {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Nav arrows */
        .lb-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          width: 52px; height: 52px;
          background: rgba(10,10,10,0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .lb-arrow:hover {
          background: #f05a1a;
          border-color: #f05a1a;
          color: #fff;
        }
        .lb-arrow-prev { left: 1.5rem; }
        .lb-arrow-next { right: 1.5rem; }

        /* Bottom bar */
        .lb-bottombar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          z-index: 2;
        }
        .lb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .lb-dot.active {
          background: #f05a1a;
          transform: scale(1.3);
        }
        .lb-counter {
          position: absolute;
          right: 2rem;
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.25);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .bg-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 320px 280px 280px;
          }
          .bg-cell-0 { grid-column: 1 / 3; grid-row: 1; }
          .bg-cell-1 { grid-column: 1 / 2; grid-row: 2; }
          .bg-cell-2 { grid-column: 2 / 3; grid-row: 2; }
          .bg-cell-3 { grid-column: 1 / 2; grid-row: 3; }
          .bg-cell-4 { grid-column: 2 / 3; grid-row: 3; }
        }
        @media (max-width: 640px) {
          .bg-root { padding: 5rem 0 4rem; }
          .bg-inner { padding: 0 1.25rem; }
          .bg-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(5, 240px);
          }
          .bg-cell-0, .bg-cell-1, .bg-cell-2,
          .bg-cell-3, .bg-cell-4 {
            grid-column: 1 / 2;
          }
          .bg-cell-0 { grid-row: 1; }
          .bg-cell-1 { grid-row: 2; }
          .bg-cell-2 { grid-row: 3; }
          .bg-cell-3 { grid-row: 4; }
          .bg-cell-4 { grid-row: 5; }
          .bg-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .bg-header-right { align-items: flex-start; }
          .bg-cta { flex-direction: column; gap: 1.5rem; align-items: flex-start; }
          .lb-arrow { display: none; }
          .lb-stage { padding: 64px 1rem 60px; }
        }
      `}</style>

      <section className="bg-root" id="gallery">
        <div className="bg-inner">
          {/* Header */}
          <div className="bg-header">
            <div className="bg-header-left">
              <div className="bg-eyebrow">
                <div className="bg-eyebrow-line" />
                <span className="bg-eyebrow-text">Inside CMMG</span>
              </div>
              <h2 className="bg-title">
                Our
                <br />
                <span>Studios</span>
              </h2>
            </div>
            <div className="bg-header-right">
              <span className="bg-count">
                <strong>{String(images.length).padStart(2, "0")}</strong> /
                Spaces
              </span>
              <div className="bg-hint">
                <span className="bg-hint-icon">↗</span>
                Click to explore
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="bg-grid">
            {visibleImages.map((img, i) => {
              const isLastCell = i === VISIBLE - 1 && hiddenCount > 0;
              return (
                <div
                  key={i}
                  className={`bg-cell bg-cell-${i} ${i % 2 === 0 ? "accent-orange" : "accent-blue"}`}
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    isLastCell
                      ? `View all ${images.length} photos`
                      : `View ${img.label}`
                  }
                  onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* "+X more" overlay on last cell */}
                  {isLastCell ? (
                    <div className="bg-cell-more-overlay">
                      <div className="bg-cell-more-blur" />
                      <div className="bg-cell-more-content">
                        <span className="bg-cell-more-count">
                          +{hiddenCount}
                        </span>
                        <span className="bg-cell-more-label">More Photos</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-cell-overlay">
                        <div className="bg-cell-meta">
                          <div className="bg-cell-category">{img.category}</div>
                          <div className="bg-cell-label">{img.label}</div>
                        </div>
                      </div>
                      <div className="bg-cell-expand">↗</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA row */}
          <div className="bg-cta">
            <span className="bg-cta-text">
              World-class facilities. Available to book online.
            </span>
            <button className="bg-cta-btn">Schedule a Studio Tour →</button>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div
          className="lb-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Top bar */}
          <div className="lb-topbar">
            <div className="lb-title-wrap">
              <span className="lb-category">
                {images[lightboxIndex].category}
              </span>
              <span className="lb-sep">/</span>
              <span className="lb-label">{images[lightboxIndex].label}</span>
            </div>
            <button className="lb-close" onClick={closeLightbox}>
              Close ✕
            </button>
          </div>

          {/* Image stage */}
          <div className="lb-stage">
            <button
              className="lb-arrow lb-arrow-prev"
              onClick={prev}
              aria-label="Previous"
            >
              ←
            </button>

            <div className="lb-img-wrap" key={lightboxIndex}>
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            <button
              className="lb-arrow lb-arrow-next"
              onClick={next}
              aria-label="Next"
            >
              →
            </button>
          </div>

          {/* Bottom bar — dots + counter */}
          <div className="lb-bottombar">
            {images.map((_, i) => (
              <div
                key={i}
                className={`lb-dot ${i === lightboxIndex ? "active" : ""}`}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
            <span className="lb-counter">
              {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default BentoGrid;
