import React from "react";
import Link from "next/link";

const offerings = [
  {
    title: "Studio",
    category: "Audio",
    description:
      "Recording rooms, mixing, and mastering — everything you need to take a track from first take to final master.",
    includes: ["Recording", "Mixing", "Mastering"],
    href: "/studio",
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
    title: "Production",
    category: "Visual",
    description:
      "Video and photography production — film, podcasts, campaigns, and content shot and finished in-house.",
    includes: ["Film", "Photography", "Podcasts"],
    href: "/production",
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
];

const ServicesHighlight = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');

        .sh-root {
          background: #f8f5ef;
          padding: 6.5rem 0;
          font-family: 'Syne', sans-serif;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .sh-inner {
          max-width: 1260px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        .sh-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .sh-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .sh-eyebrow-line { width: 28px; height: 1px; background: #f05a1a; }
        .sh-eyebrow-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }
        .sh-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #050505;
          margin: 0;
        }
        .sh-title span { color: #f05a1a; }
        .sh-header-note {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          line-height: 1.7;
          color: rgba(0,0,0,0.45);
          max-width: 280px;
          text-align: right;
          margin: 0;
        }

        .sh-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid rgba(0,0,0,0.08);
          border-left: 1px solid rgba(0,0,0,0.08);
        }

        .sh-card {
          position: relative;
          display: block;
          padding: 3rem;
          border-right: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          text-decoration: none;
          background: #fff;
          overflow: hidden;
          transition: background 0.3s ease;
        }
        .sh-card:hover { background: #fafafa; }

        .sh-card-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .sh-card:hover .sh-card-bar { transform: scaleX(1); }
        .sh-card-bar.orange { background: #f05a1a; }
        .sh-card-bar.blue   { background: #1a8cff; }

        .sh-card-glow {
          position: absolute;
          bottom: -40%;
          right: -20%;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .sh-card:hover .sh-card-glow { opacity: 1; }
        .sh-card-glow.orange { background: radial-gradient(circle, rgba(240,90,26,0.08) 0%, transparent 70%); }
        .sh-card-glow.blue   { background: radial-gradient(circle, rgba(26,140,255,0.08) 0%, transparent 70%); }

        .sh-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.25rem;
        }
        .sh-card-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0,0,0,0.12);
          color: rgba(0,0,0,0.5);
          transition: border-color 0.3s, color 0.3s;
        }
        .sh-card-icon svg { width: 22px; height: 22px; }
        .sh-card:hover .sh-card-icon.orange { border-color: #f05a1a; color: #f05a1a; }
        .sh-card:hover .sh-card-icon.blue   { border-color: #1a8cff; color: #1a8cff; }

        .sh-card-category {
          font-family: 'Manrope', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.3rem 0.65rem;
          border: 1px solid rgba(0,0,0,0.1);
          color: rgba(0,0,0,0.3);
          transition: border-color 0.3s, color 0.3s;
        }
        .sh-card:hover .sh-card-category.orange {
          border-color: rgba(240,90,26,0.5);
          color: #f05a1a;
        }
        .sh-card:hover .sh-card-category.blue {
          border-color: rgba(26,140,255,0.5);
          color: #1a8cff;
        }

        .sh-card-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #111;
          margin: 0 0 1rem;
          line-height: 1;
        }

        .sh-card-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          line-height: 1.75;
          color: rgba(0,0,0,0.5);
          margin: 0 0 1.5rem;
          max-width: 380px;
        }

        .sh-card-includes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 2rem;
        }
        .sh-card-tag {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(0,0,0,0.42);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0.3rem 0.6rem;
        }

        .sh-card-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.35);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
        }
        .sh-card:hover .sh-card-link.orange { color: #f05a1a; }
        .sh-card:hover .sh-card-link.blue   { color: #1a8cff; }
        .sh-card-link-arrow {
          display: inline-block;
          transform: translateX(-4px);
          opacity: 0;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .sh-card:hover .sh-card-link-arrow {
          transform: translateX(0);
          opacity: 1;
        }

        @media (max-width: 780px) {
          .sh-grid { grid-template-columns: 1fr; }
          .sh-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .sh-header-note { text-align: left; }
        }
        @media (max-width: 640px) {
          .sh-root { padding: 4.5rem 0; }
          .sh-inner { padding: 0 1.5rem; }
          .sh-card { padding: 2.25rem 1.5rem; }
        }
      `}</style>

      <section className="sh-root" id="services">
        <div className="sh-inner">
          <div className="sh-header">
            <div>
              <div className="sh-eyebrow">
                <div className="sh-eyebrow-line" />
                <span className="sh-eyebrow-text">What We Offer</span>
              </div>
              <h2 className="sh-title">
                Two disciplines. <span>One home.</span>
              </h2>
            </div>
            <p className="sh-header-note">
              Pick a lane below for pricing, packages, and studio specifics.
            </p>
          </div>

          <div className="sh-grid">
            {offerings.map((offer) => (
              <Link key={offer.title} href={offer.href} className="sh-card">
                <div className={`sh-card-bar ${offer.accent}`} />
                <div className={`sh-card-glow ${offer.accent}`} />

                <div className="sh-card-top">
                  <div className={`sh-card-icon ${offer.accent}`}>
                    {offer.icon}
                  </div>
                  <span className={`sh-card-category ${offer.accent}`}>
                    {offer.category}
                  </span>
                </div>

                <h3 className="sh-card-title">{offer.title}</h3>
                <p className="sh-card-desc">{offer.description}</p>

                <div className="sh-card-includes">
                  {offer.includes.map((item) => (
                    <span className="sh-card-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <span className={`sh-card-link ${offer.accent}`}>
                  Explore {offer.title}
                  <span className="sh-card-link-arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesHighlight;
