import React from "react";
import Link from "next/link";

const CtaEnquiryBand = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');

        .ceb-root {
          background: #fff;
          font-family: 'Syne', sans-serif;
          border-top: 1px solid rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
        }

        .ceb-glow {
          position: absolute;
          top: -30%;
          right: -5%;
          width: 40vw;
          height: 40vw;
          max-width: 480px;
          max-height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(240,90,26,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .ceb-inner {
          position: relative;
          max-width: 1260px;
          margin: 0 auto;
          padding: 4.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
        }

        .ceb-left {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .ceb-icon {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border: 1px solid rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f05a1a;
        }
        .ceb-icon svg { width: 26px; height: 26px; }

        .ceb-eyebrow {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          margin-bottom: 0.6rem;
          display: block;
        }
        .ceb-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.3rem);
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #0a0a0a;
          margin: 0;
        }
        .ceb-heading span { color: #f05a1a; }

        .ceb-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #0a0a0a;
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
        .ceb-btn:hover { background: #f05a1a; transform: translateY(-1px); }
        .ceb-btn-arrow { font-size: 1rem; line-height: 1; transition: transform 0.2s; }
        .ceb-btn:hover .ceb-btn-arrow { transform: translateX(3px); }

        @media (max-width: 780px) {
          .ceb-inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 3.5rem 1.5rem;
            gap: 2rem;
          }
          .ceb-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="ceb-root">
        <div className="ceb-glow" />
        <div className="ceb-inner">
          <div className="ceb-left">
            <div className="ceb-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M5 8a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2H11l-6 5V8z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 13h10M11 18h6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <span className="ceb-eyebrow">Got a Project?</span>
              <h2 className="ceb-heading">
                Tell us what you&apos;re <span>shooting</span>.
              </h2>
            </div>
          </div>

          <Link href="#enquiries" className="ceb-btn">
            Start an Enquiry
            <span className="ceb-btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CtaEnquiryBand;
