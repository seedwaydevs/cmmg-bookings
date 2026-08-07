"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    client: "WITS RHI",
    title: "MMS Clinical Trial Launch",
    category: "Corporate",
    description:
      "A corporate launch film for a clinical trial programme — clean, credible visuals built to communicate research milestones to stakeholders and the public.",
    image: "/mms.png",
  },
  {
    client: "Nkanyamba",
    title: "Imfihlo Kamakoti",
    category: "Music Video",
    description:
      "A narrative-driven music video shot to match the mood of the track — location scouting, lighting, and edit all built around the story in the lyrics.",
    image: "/nkanyamba.png",
  },
  {
    client: "Ideation",
    title: "Ideation Video",
    category: "Campaign Photography",
    description:
      "A campaign shoot capturing the brand's core message in a single day — styled, lit, and edited to be ready for launch across digital platforms.",
    image: "/ideation_pic.png",
  },
];

const AUTOPLAY_MS = 6000;

const ClientWorkCarousel = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + projects.length) % projects.length);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, paused, next]);

  const current = projects[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');

       .cw-root {
        background: #f8f5ef;
        font-family: 'Syne', sans-serif;
        padding: 7rem 0;
        position: relative;
        overflow: hidden;
        }

        .cw-inner {
        max-width: 1260px;
        margin: 0 auto;
        padding: 0 3rem;
        }

        .cw-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 2rem;
        margin-bottom: 3.5rem;
        padding-bottom: 2.5rem;
        border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .cw-eyebrow {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
        }
        .cw-eyebrow-line { width: 28px; height: 1px; background: #f05a1a; }
        .cw-eyebrow-text {
        font-family: 'Manrope', sans-serif;
        font-size: 0.65rem;
        font-weight: 500;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(0,0,0,0.4);
        }
        .cw-title {
        font-family: 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(2.2rem, 4vw, 3.2rem);
        letter-spacing: -0.02em;
        line-height: 1.1;
        color: #050505;
        margin: 0;
        }
        .cw-title span { color: #f05a1a; }
        .cw-counter {
        font-family: 'Manrope', sans-serif;
        font-size: 0.7rem;
        letter-spacing: 0.14em;
        color: rgba(0,0,0,0.35);
        white-space: nowrap;
        }
        .cw-counter strong { color: #f05a1a; font-weight: 600; }

        /* ── STAGE ── */
        .cw-stage {
        display: grid;
        grid-template-columns: 1.3fr 1fr;
        gap: 0;
        border: 1px solid rgba(0,0,0,0.08);
        }

        .cw-media {
        position: relative;
        aspect-ratio: 4 / 3;
        overflow: hidden;
        background: #eee;
        border-right: 1px solid rgba(0,0,0,0.08);
        }
        .cw-media-img {
        object-fit: cover;
        transition: opacity 0.5s ease;
        }
        .cw-media-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%);
        pointer-events: none;
        }
        .cw-media-index {
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        font-family: 'Manrope', sans-serif;
        font-size: 0.65rem;
        letter-spacing: 0.16em;
        color: #fff;
        background: rgba(0,0,0,0.45);
        backdrop-filter: blur(6px);
        padding: 0.4rem 0.75rem;
        border: 1px solid rgba(255,255,255,0.2);
        }

        .cw-panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2.75rem;
        background: #fff;
        }

        .cw-copy {
        animation: cw-fade 0.4s ease;
        }
        @keyframes cw-fade {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
        }

        .cw-category {
        display: inline-block;
        font-family: 'Manrope', sans-serif;
        font-size: 0.6rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #f05a1a;
        border: 1px solid rgba(240,90,26,0.4);
        padding: 0.35rem 0.7rem;
        margin-bottom: 1.5rem;
        }
        .cw-project-title {
        font-family: 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: clamp(1.8rem, 2.6vw, 2.4rem);
        letter-spacing: -0.02em;
        line-height: 1.05;
        color: #0a0a0a;
        margin: 0 0 0.6rem;
        }
        .cw-client {
        font-family: 'Manrope', sans-serif;
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        color: rgba(0,0,0,0.4);
        margin: 0 0 1.5rem;
        }
        .cw-desc {
        font-family: 'Manrope', sans-serif;
        font-size: 0.86rem;
        line-height: 1.8;
        color: rgba(0,0,0,0.55);
        margin: 0;
        }

        .cw-controls {
        margin-top: 2.5rem;
        }
        .cw-progress-track {
        display: flex;
        gap: 0.4rem;
        margin-bottom: 1.5rem;
        }
        .cw-progress-bar {
        flex: 1;
        height: 2px;
        background: rgba(0,0,0,0.1);
        overflow: hidden;
        position: relative;
        }
        .cw-progress-fill {
        position: absolute;
        inset: 0;
        background: #f05a1a;
        transform: scaleX(0);
        transform-origin: left;
        }
        .cw-progress-fill.done { transform: scaleX(1); }
        .cw-progress-fill.active {
        animation: cw-progress 6000ms linear forwards;
        }
        .cw-progress-fill.paused { animation-play-state: paused; }
        @keyframes cw-progress {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
        }

        .cw-nav-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        }
        .cw-arrows {
        display: flex;
        gap: 0.6rem;
        }
        .cw-arrow {
        width: 40px;
        height: 40px;
        border: 1px solid rgba(0,0,0,0.12);
        background: transparent;
        color: rgba(0,0,0,0.5);
        font-size: 0.9rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.2s, color 0.2s;
        }
        .cw-arrow:hover {
        border-color: #f05a1a;
        color: #f05a1a;
        }
        .cw-pause-btn {
        font-family: 'Manrope', sans-serif;
        font-size: 0.62rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(0,0,0,0.32);
        background: none;
        border: none;
        cursor: pointer;
        transition: color 0.2s;
        }
        .cw-pause-btn:hover { color: rgba(0,0,0,0.6); }

        @media (max-width: 900px) {
        .cw-stage { grid-template-columns: 1fr; }
        .cw-media { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.08); aspect-ratio: 16/10; }
        }
        @media (max-width: 640px) {
        .cw-root { padding: 4.5rem 0; }
        .cw-inner { padding: 0 1.5rem; }
        .cw-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        .cw-panel { padding: 2rem 1.5rem; }
        }
      `}</style>

      <section className="cw-root" id="client-work">
        <div className="cw-inner">
          <div className="cw-header">
            <div>
              <div className="cw-eyebrow">
                <div className="cw-eyebrow-line" />
                <span className="cw-eyebrow-text">Client Work</span>
              </div>
              <h2 className="cw-title">
                Recently <span>Shot</span>
              </h2>
            </div>
            <span className="cw-counter">
              <strong>{String(active + 1).padStart(2, "0")}</strong> /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div
            className="cw-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="cw-media">
              <Image
                key={active}
                src={current.image}
                alt={`${current.client} — ${current.title}`}
                fill
                className="cw-media-img"
                sizes="(max-width: 900px) 100vw, 60vw"
                priority={active === 0}
              />
              <div className="cw-media-overlay" />
              <span className="cw-media-index">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="cw-panel">
              <div className="cw-copy" key={active}>
                <span className="cw-category">{current.category}</span>
                <h3 className="cw-project-title">{current.title}</h3>
                <p className="cw-client">{current.client}</p>
                <p className="cw-desc">{current.description}</p>
              </div>

              <div className="cw-controls">
                <div className="cw-progress-track">
                  {projects.map((_, i) => (
                    <div className="cw-progress-bar" key={i}>
                      <div
                        className={`cw-progress-fill ${
                          i < active
                            ? "done"
                            : i === active
                              ? `active${paused ? " paused" : ""}`
                              : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="cw-nav-row">
                  <div className="cw-arrows">
                    <button
                      className="cw-arrow"
                      onClick={prev}
                      aria-label="Previous project"
                    >
                      ←
                    </button>
                    <button
                      className="cw-arrow"
                      onClick={next}
                      aria-label="Next project"
                    >
                      →
                    </button>
                  </div>
                  <button
                    className="cw-pause-btn"
                    onClick={() => setPaused((p) => !p)}
                  >
                    {paused ? "Play" : "Pause"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientWorkCarousel;
