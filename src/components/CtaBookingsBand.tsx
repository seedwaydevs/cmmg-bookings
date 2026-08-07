import React from "react";
import Link from "next/link";

const CtaBookingBand = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');

        .cb-root {
          background: #0a0a0a;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .cb-glow {
          position: absolute;
          top: -20%;
          right: -5%;
          width: 40vw;
          height: 40vw;
          max-width: 480px;
          max-height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(240,90,26,0.14) 0%, transparent 70%);
          pointer-events: none;
        }

        .cb-inner {
          position: relative;
          max-width: 1260px;
          margin: 0 auto;
          padding: 4.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
        }

        .cb-left {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .cb-icon {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f05a1a;
        }
        .cb-icon svg { width: 26px; height: 26px; }

        .cb-eyebrow {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.6rem;
          display: block;
        }
        .cb-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.3rem);
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #fff;
          margin: 0;
        }
        .cb-heading span { color: #f05a1a; }

        .cb-btn {
          flex-shrink: 0;
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
          padding: 1.05rem 2rem;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
        }
        .cb-btn:hover { background: #d44d14; transform: translateY(-1px); }
        .cb-btn-arrow { font-size: 1rem; line-height: 1; transition: transform 0.2s; }
        .cb-btn:hover .cb-btn-arrow { transform: translateX(3px); }

        @media (max-width: 780px) {
          .cb-inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 3.5rem 1.5rem;
            gap: 2rem;
          }
          .cb-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="cb-root">
        <div className="cb-glow" />
        <div className="cb-inner">
          <div className="cb-left">
            <div className="cb-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <rect
                  x="5"
                  y="7"
                  width="22"
                  height="20"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path d="M5 13h22" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M11 4v6M21 4v6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <span className="cb-eyebrow">Ready When You Are</span>
              <h2 className="cb-heading">
                Book your studio <span>session</span> in minutes.
              </h2>
            </div>
          </div>

          <Link href="/studio#book" className="cb-btn">
            Book Now
            <span className="cb-btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CtaBookingBand;
