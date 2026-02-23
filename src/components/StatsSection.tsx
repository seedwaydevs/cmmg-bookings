"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  {
    number: 500,
    suffix: "+",
    label: "Projects Completed",
    description: "From albums to films, podcasts to commercials",
    accent: "orange",
  },
  {
    number: 10000,
    suffix: "+",
    label: "Hours Recorded",
    description: "Of premium audio and video content",
    accent: "blue",
  },
  {
    number: 200,
    suffix: "+",
    label: "Happy Clients",
    description: "Artists, creators, and production companies",
    accent: "orange",
  },
  {
    number: 24,
    suffix: "/7",
    label: "Studio Access",
    description: "Book anytime that works for your schedule",
    accent: "blue",
  },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function StatCard({
  stat,
  index,
  active,
}: {
  stat: (typeof stats)[0];
  index: number;
  active: boolean;
}) {
  const count = useCountUp(stat.number, active, 1600 + index * 100);
  const display =
    stat.number >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <div className={`ss-card accent-${stat.accent}`}>
      <div className={`ss-card-bar accent-${stat.accent}`} />
      <span className="ss-card-index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="ss-number-row">
        <span className="ss-number">{display}</span>
        <span className={`ss-suffix accent-${stat.accent}`}>{stat.suffix}</span>
      </div>
      <div className={`ss-divider accent-${stat.accent}`} />
      <h3 className="ss-label">{stat.label}</h3>
      <p className="ss-desc">{stat.description}</p>
      <div className={`ss-glow accent-${stat.accent}`} />
    </div>
  );
}

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');

        /* ── ROOT: fully dark section ── */
        .ss-root {
          background: #0a0a0a;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* ── TOP HEADER BAND: white on dark ── */
        .ss-head {
          padding: 6rem 3rem 5rem;
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          gap: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ss-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .ss-eyebrow-line { width: 28px; height: 1px; background: #f05a1a; }
        .ss-eyebrow-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .ss-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.92;
          color: #fff;
          text-transform: uppercase;
          margin: 0;
        }
        .ss-title span { color: #f05a1a; }
        .ss-head-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }
        .ss-head-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.35);
          max-width: 340px;
          text-align: right;
          margin: 0;
        }

        /* ── STATS GRID ── */
        .ss-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-left: 1px solid rgba(255,255,255,0.06);
        }

        /* ── CARD ── */
        .ss-card {
          position: relative;
          padding: 3rem 2.5rem;
          border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
          transition: background 0.3s ease;
          background: #0a0a0a;
        }
        .ss-card:hover { background: #111; }

        /* top accent bar slides in on hover */
        .ss-card-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .ss-card:hover .ss-card-bar { transform: scaleX(1); }
        .ss-card-bar.accent-orange { background: #f05a1a; }
        .ss-card-bar.accent-blue   { background: #1a8cff; }

        .ss-card-index {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.12);
          margin-bottom: 1.5rem;
        }

        .ss-number-row {
          display: flex;
          align-items: baseline;
          gap: 0.05em;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .ss-number {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 3.8vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #fff;
          line-height: 1;
        }
        .ss-suffix {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.25rem, 2vw, 2.2rem);
          font-weight: 700;
          line-height: 1;
        }
        .ss-suffix.accent-orange { color: #f05a1a; }
        .ss-suffix.accent-blue   { color: #1a8cff; }

        .ss-divider {
          width: 28px;
          height: 1px;
          margin-bottom: 1.25rem;
          transition: width 0.4s ease, background 0.3s ease;
        }
        .ss-divider.accent-orange { background: rgba(240,90,26,0.35); }
        .ss-divider.accent-blue   { background: rgba(26,140,255,0.35); }
        .ss-card:hover .ss-divider { width: 52px; }
        .ss-card:hover .ss-divider.accent-orange { background: #f05a1a; }
        .ss-card:hover .ss-divider.accent-blue   { background: #1a8cff; }

        .ss-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: rgba(255,255,255,0.75);
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .ss-card:hover .ss-label { color: #fff; }

        .ss-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.76rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.25);
          margin: 0;
          transition: color 0.3s;
        }
        .ss-card:hover .ss-desc { color: rgba(255,255,255,0.42); }

        .ss-glow {
          position: absolute;
          bottom: -40%; right: -20%;
          width: 200px; height: 200px;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .ss-card:hover .ss-glow { opacity: 1; }
        .ss-glow.accent-orange { background: radial-gradient(circle, rgba(240,90,26,0.1) 0%, transparent 70%); }
        .ss-glow.accent-blue   { background: radial-gradient(circle, rgba(26,140,255,0.1) 0%, transparent 70%); }

        /* ── CTA BAR ── */
        .ss-cta {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 2.5rem 3rem;
        }
        .ss-cta-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .ss-cta-eyebrow {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 0.4rem;
          display: block;
        }
        .ss-cta-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
        }
        .ss-cta-heading span { color: #f05a1a; }
        .ss-cta-btn {
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
          padding: 1rem 2.25rem;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
        }
        .ss-cta-btn:hover { background: #d44d14; transform: translateY(-1px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ss-head { grid-template-columns: 1fr; padding: 5rem 2.5rem 4rem; }
          .ss-head-right { align-items: flex-start; }
          .ss-head-desc { text-align: left; }
          .ss-grid { grid-template-columns: repeat(2, 1fr); }
          .ss-cta { padding: 2.5rem; }
        }
        @media (max-width: 640px) {
          .ss-head { padding: 4rem 1.5rem 3rem; }
          .ss-grid { grid-template-columns: 1fr; }
          .ss-card { padding: 2.5rem 1.5rem; }
          .ss-cta { padding: 2rem 1.5rem; }
          .ss-cta-inner { flex-direction: column; align-items: flex-start; }
          .ss-cta-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="ss-root" ref={sectionRef}>
        {/* Header */}
        <div className="ss-head">
          <div>
            <div className="ss-eyebrow">
              <div className="ss-eyebrow-line" />
              <span className="ss-eyebrow-text">By The Numbers</span>
            </div>
            <h2 className="ss-title">
              Trusted by
              <br />
              <span>Creators</span>
            </h2>
          </div>
          <div className="ss-head-right">
            <p className="ss-head-desc">
              Our studios have been the birthplace of countless creative
              projects — from debut singles to award-winning productions.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="ss-grid">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} active={active} />
          ))}
        </div>

        {/* CTA bar */}
        <div className="ss-cta">
          <div className="ss-cta-inner">
            <div>
              <span className="ss-cta-eyebrow">Next Step</span>
              <h3 className="ss-cta-heading">
                Ready to create something <span>great?</span>
              </h3>
            </div>
            <button className="ss-cta-btn">Book Your Session →</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
