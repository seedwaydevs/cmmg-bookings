import React from "react";

const RATE_CARD_PATH = "/rate-cards/cmmg-production-rate-card.pdf";

const services = [
  {
    num: "01",
    title: "Videography & Film",
    category: "Motion",
    description:
      "Multi-camera shoots for commercials, music videos, and branded content — lit, directed, and captured on our sound stage or on location.",
    tags: ["4K/6K Capture", "Multi-Cam", "On Location"],
    accent: "orange",
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
    num: "02",
    title: "Photography",
    category: "Stills",
    description:
      "Product, portrait, and campaign photography with full studio lighting — shot digitally and delivered edit-ready the same week.",
    tags: ["Studio Lighting", "Product", "Portrait"],
    accent: "blue",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M9 10l2-3h10l2 3h4a1 1 0 011 1v13a1 1 0 01-1 1H4a1 1 0 01-1-1V11a1 1 0 011-1h5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="17" r="5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Editing & Post",
    category: "Post",
    description:
      "Colour grading, sound design, and edit — turning raw footage into a finished cut ready for broadcast, streaming, or social.",
    tags: ["Colour Grade", "Sound Design", "VFX"],
    accent: "orange",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect
          x="5"
          y="6"
          width="22"
          height="15"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M11 26h10M16 21v5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 13l4-2.5v5L12 13z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Content & Social",
    category: "Delivery",
    description:
      "Short-form cutdowns and platform-ready exports — one shoot day repackaged into everything a campaign needs to launch.",
    tags: ["Short-Form", "Multi-Platform", "Fast Turnaround"],
    accent: "blue",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect
          x="10"
          y="4"
          width="12"
          height="24"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M14 24h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const ProductionServicesGrid = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');

        .psg-root {
          background: #ffffff;
          padding: 7rem 0 6rem;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .psg-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(0,0,0,0.08);
        }

        .psg-inner {
          max-width: 1260px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        /* ── HEADER ── */
        .psg-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: 5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .psg-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .psg-eyebrow-line {
          width: 28px;
          height: 1px;
          background: #f05a1a;
        }
        .psg-eyebrow-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }
        .psg-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(5rem, 10vw, 7rem);
          letter-spacing: -0.02em;
          line-height: 0.95;
          text-transform: uppercase;
          color: #000000;
        }
        .psg-title span {
          color: #f05a1a;
        }
        .psg-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.5rem;
        }
        .psg-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          line-height: 1.75;
          color: rgba(0,0,0,0.45);
          max-width: 360px;
          text-align: right;
          margin: 0;
        }
        .psg-count {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.25);
        }
        .psg-count strong {
          color: #1a8cff;
          font-weight: 600;
        }
        .psg-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .psg-rate-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          background: #0a0a0a;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.95rem 1.35rem;
          transition: background 0.2s, transform 0.2s;
        }
        .psg-rate-btn:hover {
          background: #1a1a1a;
          transform: translateY(-1px);
        }
        .psg-rate-note {
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          line-height: 1.6;
          color: rgba(0,0,0,0.45);
          max-width: 260px;
          text-align: right;
          margin: 0;
        }

        /* ── GRID ── */
        .psg-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid rgba(0,0,0,0.08);
          border-left: 1px solid rgba(0,0,0,0.08);
        }

        /* ── CARD ── */
        .psg-card {
          position: relative;
          padding: 2.5rem;
          border-right: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          transition: background 0.3s ease;
          overflow: hidden;
          cursor: default;
          background: #fff;
        }
        .psg-card:hover {
          background: #fafafa;
        }

        .psg-card-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .psg-card:hover .psg-card-bar { transform: scaleX(1); }
        .psg-card-bar.orange { background: #f05a1a; }
        .psg-card-bar.blue   { background: #1a8cff; }

        .psg-card-glow {
          position: absolute;
          bottom: -40%;
          right: -20%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .psg-card:hover .psg-card-glow { opacity: 1; }
        .psg-card-glow.orange { background: radial-gradient(circle, rgba(240,90,26,0.06) 0%, transparent 70%); }
        .psg-card-glow.blue   { background: radial-gradient(circle, rgba(26,140,255,0.06) 0%, transparent 70%); }

        .psg-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.75rem;
        }
        .psg-card-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0,0,0,0.1);
          color: rgba(0,0,0,0.4);
          transition: border-color 0.3s, color 0.3s;
        }
        .psg-card-icon svg { width: 20px; height: 20px; }
        .psg-card:hover .psg-card-icon.orange { border-color: #f05a1a; color: #f05a1a; }
        .psg-card:hover .psg-card-icon.blue   { border-color: #1a8cff; color: #1a8cff; }

        .psg-card-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }
        .psg-card-num {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          color: rgba(0,0,0,0.2);
        }
        .psg-card-category {
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
        .psg-card:hover .psg-card-category.orange {
          border-color: rgba(240,90,26,0.5);
          color: #f05a1a;
        }
        .psg-card:hover .psg-card-category.blue {
          border-color: rgba(26,140,255,0.5);
          color: #1a8cff;
        }

        .psg-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #111;
          margin: 0 0 1rem;
          line-height: 1.1;
          transition: color 0.2s;
        }
        .psg-card:hover .psg-card-title { color: #050505; }

        .psg-card-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem;
          line-height: 1.7;
          color: rgba(0,0,0,0.45);
          margin: 0 0 1.5rem;
          transition: color 0.3s;
        }
        .psg-card:hover .psg-card-desc { color: rgba(0,0,0,0.6); }

        .psg-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }
        .psg-card-tag {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(0,0,0,0.42);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0.3rem 0.6rem;
        }

        .psg-card-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .psg-card-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.2);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .psg-card:hover .psg-card-link.orange { color: #f05a1a; }
        .psg-card:hover .psg-card-link.blue   { color: #1a8cff; }
        .psg-card-link-arrow {
          display: inline-block;
          transform: translateX(-4px);
          opacity: 0;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .psg-card:hover .psg-card-link-arrow {
          transform: translateX(0);
          opacity: 1;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .psg-grid { grid-template-columns: repeat(2, 1fr); }
          .psg-header { grid-template-columns: 1fr; }
          .psg-header-right { align-items: flex-start; }
          .psg-desc { text-align: left; }
          .psg-actions { justify-content: flex-start; }
          .psg-rate-note { text-align: left; }
          .psg-title {
            font-size: clamp(3rem, 10vw, 7rem);
          }
        }
        @media (max-width: 640px) {
          .psg-root { padding: 5rem 0 4rem; }
          .psg-inner { padding: 0 1.5rem; }
          .psg-grid { grid-template-columns: 1fr; }
          .psg-card { padding: 2rem 1.5rem; }
          .psg-header { margin-bottom: 3rem; padding-bottom: 2rem; }
        }
      `}</style>

      <section className="psg-root" id="services">
        <div className="psg-inner">
          {/* Header */}
          <div className="psg-header">
            <div className="psg-header-left">
              <div className="psg-eyebrow">
                <div className="psg-eyebrow-line" />
                <span className="psg-eyebrow-text">What We Offer</span>
              </div>
              <h2 className="psg-title">
                Our
                <br />
                <span>Production</span>
              </h2>
            </div>
            <div className="psg-header-right">
              <p className="psg-desc">
                From first frame to final export — film, photography, and post,
                all handled by the same crew under one roof.
              </p>
              <div className="psg-actions">
                <a
                  href={RATE_CARD_PATH}
                  target="_blank"
                  rel="noreferrer"
                  className="psg-rate-btn"
                >
                  View Rate Card
                  <span aria-hidden="true">↗</span>
                </a>
                <p className="psg-rate-note">
                  View our Rate Card for an in depth understanding of our
                  offerings.
                </p>
              </div>
              <span className="psg-count">
                <strong>04</strong> / Services Available
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="psg-grid">
            {services.map((service, index) => (
              <div key={index} className="psg-card">
                <div className={`psg-card-bar ${service.accent}`} />
                <div className={`psg-card-glow ${service.accent}`} />

                <div className="psg-card-top">
                  <div className={`psg-card-icon ${service.accent}`}>
                    {service.icon}
                  </div>
                  <div className="psg-card-meta">
                    <span className="psg-card-num">{service.num}</span>
                    <span className={`psg-card-category ${service.accent}`}>
                      {service.category}
                    </span>
                  </div>
                </div>

                <h3 className="psg-card-title">{service.title}</h3>
                <p className="psg-card-desc">{service.description}</p>

                <div className="psg-card-tags">
                  {service.tags.map((tag) => (
                    <span className="psg-card-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="psg-card-footer">
                  <a
                    href="#enquiries"
                    className={`psg-card-link ${service.accent}`}
                  >
                    Enquire Now
                    <span className="psg-card-link-arrow">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductionServicesGrid;
