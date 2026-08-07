"use client";

import React from "react";

const pillars = [
  {
    label: "Audio",
    text: "Recording, mixing, and mastering in acoustically treated rooms built for serious tracking.",
    tags: ["Live Tracking", "Mixing", "Mastering"],
    accent: "orange",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M4 16h4l3-9 4 18 4-13 3 4h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Visual",
    text: "Green screen, film, and photography production shot and finished without leaving the building.",
    tags: ["4K Capture", "Green Screen", "Photography"],
    accent: "blue",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect
          x="4"
          y="9"
          width="17"
          height="14"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M21 13.5l7-3.5v12l-7-3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle
          cx="12.5"
          cy="16"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    label: "Full Production",
    text: "One team carries the project from first take to final delivery, with nothing lost in handoff.",
    tags: ["Single Team", "One Timeline", "One Invoice"],
    accent: "orange",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4l12 6.5-12 6.5-12-6.5L16 4z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4 17l12 6.5L28 17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4 23.5l12 6.5 12-6.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const InfoSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');

        .is-root {
          background: #ffffff;
          padding: 6.5rem 0;
          font-family: 'Syne', sans-serif;
          border-top: 1px solid rgba(0,0,0,0.07);
        }
        .is-inner {
          max-width: 1260px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        .is-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: end;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          margin-bottom: 4rem;
        }
        .is-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .is-eyebrow-line { width: 28px; height: 1px; background: #f05a1a; }
        .is-eyebrow-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }
        .is-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #050505;
          margin: 0;
        }
        .is-heading span { color: #f05a1a; }
        .is-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.92rem;
          line-height: 1.8;
          color: rgba(0,0,0,0.5);
          margin: 0;
        }

        .is-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.08);
        }
        .is-pillar {
          position: relative;
          padding: 2.5rem 2rem;
          background: #fff;
          transition: background 0.3s ease;
        }
        .is-pillar:hover { background: #fafafa; }

        .is-pillar-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0,0,0,0.12);
          margin-bottom: 1.75rem;
          color: rgba(0,0,0,0.55);
          transition: border-color 0.3s, color 0.3s;
        }
        .is-pillar-icon svg { width: 22px; height: 22px; }
        .is-pillar:hover .is-pillar-icon.orange {
          border-color: #f05a1a;
          color: #f05a1a;
        }
        .is-pillar:hover .is-pillar-icon.blue {
          border-color: #1a8cff;
          color: #1a8cff;
        }

        .is-pillar-label {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          margin: 0 0 0.75rem;
        }
        .is-pillar-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.84rem;
          line-height: 1.7;
          color: rgba(0,0,0,0.5);
          margin: 0 0 1.5rem;
        }

        .is-pillar-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .is-pillar-tag {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(0,0,0,0.42);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0.3rem 0.6rem;
        }

        @media (max-width: 900px) {
          .is-top { grid-template-columns: 1fr; gap: 1.5rem; }
          .is-pillars { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .is-root { padding: 4.5rem 0; }
          .is-inner { padding: 0 1.5rem; }
          .is-top { margin-bottom: 2.5rem; padding-bottom: 2.5rem; }
          .is-pillar { padding: 2rem 1.5rem; }
        }
      `}</style>

      <section className="is-root">
        <div className="is-inner">
          <div className="is-top">
            <div>
              <div className="is-eyebrow">
                <div className="is-eyebrow-line" />
                <span className="is-eyebrow-text">Who We Are</span>
              </div>
              <h2 className="is-heading">
                One studio group, <span>two disciplines</span>.
              </h2>
            </div>
            <p className="is-desc">
              CMMG brings audio and visual production together under one roof in
              Midrand. Whether you&apos;re recording an album or shooting a
              campaign, the same team, gear, and space are behind it — no
              handoffs, no guesswork.
            </p>
          </div>

          <div className="is-pillars">
            {pillars.map((p) => (
              <div className="is-pillar" key={p.label}>
                <div className={`is-pillar-icon ${p.accent}`}>{p.icon}</div>
                <h3 className="is-pillar-label">{p.label}</h3>
                <p className="is-pillar-text">{p.text}</p>
                <div className="is-pillar-tags">
                  {p.tags.map((tag) => (
                    <span className="is-pillar-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoSection;
