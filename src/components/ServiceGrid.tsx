import React from "react";

const services = [
  {
    num: "01",
    title: "Music Recording Studios",
    category: "Audio",
    description:
      "Professional-grade recording rooms with pristine acoustic treatment, top-tier microphones, and industry-standard consoles — built exclusively for music production and live tracking.",
    accent: "orange",
  },
  {
    num: "02",
    title: "Green Screen Studio",
    category: "Visual",
    description:
      "One fully equipped chroma key space that handles film, podcast, and content production. Professional lighting grids, 4K cameras, and seamless green screen setups — all in one studio.",
    accent: "blue",
  },
  {
    num: "03",
    title: "Audio Mixing",
    category: "Mix",
    description:
      "Expert balancing of your recorded tracks — levels, panning, EQ, dynamics, and effects — so every element of your music sits perfectly in the mix before mastering.",
    accent: "orange",
  },
  {
    num: "04",
    title: "Final Mix & Mastering",
    category: "Finishing",
    description:
      "The last step before release. We polish your mix to industry loudness standards, ensuring it translates flawlessly across streaming platforms, radio, and physical formats.",
    accent: "blue",
  },
];

const ServicesGrid = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');

        .sg-root {
          background: #ffffff;
          padding: 7rem 0 6rem;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .sg-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(0,0,0,0.08);
        }

        .sg-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        /* ── HEADER ── */
        .sg-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: 5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .sg-header-left {}
        .sg-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .sg-eyebrow-line {
          width: 28px;
          height: 1px;
          background: #f05a1a;
        }
        .sg-eyebrow-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }
        .sg-title {
          font-family: 'Bricolage Grotesque',
sans-serif;
font-weight: 800;
font-size: clamp(5rem, 10vw, 9rem);
letter-spacing: -0.02em;
line-height: 0.95;
text-transform: uppercase;
color: #000000;
        }
        .sg-title span {
          color: #f05a1a;
        }
        .sg-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.5rem;
        }
        .sg-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          line-height: 1.75;
          color: rgba(0,0,0,0.45);
          max-width: 360px;
          text-align: right;
          margin: 0;
        }
        .sg-count {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.25);
        }
        .sg-count strong {
          color: #1a8cff;
          font-weight: 600;
        }

        /* ── GRID ── */
        .sg-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid rgba(0,0,0,0.08);
          border-left: 1px solid rgba(0,0,0,0.08);
        }

        /* ── CARD ── */
        .sg-card {
          position: relative;
          padding: 2.5rem;
          border-right: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          transition: background 0.3s ease;
          overflow: hidden;
          cursor: default;
          background: #fff;
        }
        .sg-card:hover {
          background: #fafafa;
        }

        /* Accent bar — top edge, revealed on hover */
        .sg-card-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .sg-card:hover .sg-card-bar { transform: scaleX(1); }
        .sg-card-bar.orange { background: #f05a1a; }
        .sg-card-bar.blue   { background: #1a8cff; }

        /* Glow blob on hover */
        .sg-card-glow {
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
        .sg-card:hover .sg-card-glow { opacity: 1; }
        .sg-card-glow.orange { background: radial-gradient(circle, rgba(240,90,26,0.06) 0%, transparent 70%); }
        .sg-card-glow.blue   { background: radial-gradient(circle, rgba(26,140,255,0.06) 0%, transparent 70%); }

        .sg-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .sg-card-num {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          color: rgba(0,0,0,0.2);
        }
        .sg-card-category {
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
        .sg-card:hover .sg-card-category.orange {
          border-color: rgba(240,90,26,0.5);
          color: #f05a1a;
        }
        .sg-card:hover .sg-card-category.blue {
          border-color: rgba(26,140,255,0.5);
          color: #1a8cff;
        }

        .sg-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #111;
          margin: 0 0 1rem;
          line-height: 1.1;
          transition: color 0.2s;
        }
        .sg-card:hover .sg-card-title { color: #050505; }

        .sg-card-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem;
          line-height: 1.7;
          color: rgba(0,0,0,0.45);
          margin: 0;
          transition: color 0.3s;
        }
        .sg-card:hover .sg-card-desc { color: rgba(0,0,0,0.6); }

        .sg-card-footer {
          margin-top: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sg-card-link {
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
        .sg-card:hover .sg-card-link.orange { color: #f05a1a; }
        .sg-card:hover .sg-card-link.blue   { color: #1a8cff; }
        .sg-card-link-arrow {
          display: inline-block;
          transform: translateX(-4px);
          opacity: 0;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .sg-card:hover .sg-card-link-arrow {
          transform: translateX(0);
          opacity: 1;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .sg-grid { grid-template-columns: repeat(2, 1fr); }
          .sg-header { grid-template-columns: 1fr; }
          .sg-header-right { align-items: flex-start; }
          .sg-desc { text-align: left; }
        }
        @media (max-width: 640px) {
          .sg-root { padding: 5rem 0 4rem; }
          .sg-inner { padding: 0 1.5rem; }
          .sg-grid { grid-template-columns: 1fr; }
          .sg-card { padding: 2rem 1.5rem; }
          .sg-header { margin-bottom: 3rem; padding-bottom: 2rem; }
        }
      `}</style>

      <section className="sg-root" id="services">
        <div className="sg-inner">
          {/* Header */}
          <div className="sg-header">
            <div className="sg-header-left">
              <div className="sg-eyebrow">
                <div className="sg-eyebrow-line" />
                <span className="sg-eyebrow-text">What We Offer</span>
              </div>
              <h2 className="sg-title">
                Our
                <br />
                <span>Services</span>
              </h2>
            </div>
            <div className="sg-header-right">
              <p className="sg-desc">
                Everything you need to bring your creative vision to life —
                professional spaces, world-class gear, all under one roof.
              </p>
              <span className="sg-count">
                <strong>04</strong> / Facilities Available
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="sg-grid">
            {services.map((service, index) => (
              <div key={index} className="sg-card">
                {/* Top accent bar */}
                <div className={`sg-card-bar ${service.accent}`} />
                {/* Glow blob */}
                <div className={`sg-card-glow ${service.accent}`} />

                <div className="sg-card-top">
                  <span className="sg-card-num">{service.num}</span>
                  <span className={`sg-card-category ${service.accent}`}>
                    {service.category}
                  </span>
                </div>

                <h3 className="sg-card-title">{service.title}</h3>
                <p className="sg-card-desc">{service.description}</p>

                <div className="sg-card-footer">
                  <a href="#book" className={`sg-card-link ${service.accent}`}>
                    Book Now
                    <span className="sg-card-link-arrow">→</span>
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

export default ServicesGrid;
