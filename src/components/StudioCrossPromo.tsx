import React from "react";
import Link from "next/link";

const StudioCrossPromo = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');

        .scp-root {
          background: #fff;
          font-family: 'Syne', sans-serif;
          border-top: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .scp-inner {
          max-width: 1260px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        .scp-card {
          padding: 3rem 0;
        }

        /* ── VIDEO BLOCK ── */
        .scp-media {
          position: relative;
          width: 100%;
          aspect-ratio: 21 / 9;
          background: #111;
          overflow: hidden;
          margin-bottom: 2.25rem;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .scp-media video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .scp-media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
          pointer-events: none;
        }
        .scp-media-tag {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          padding: 0.4rem 0.75rem;
          border: 1px solid rgba(255,255,255,0.2);
        }

        /* Placeholder state — shown until a real video src is set */
        .scp-media-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          color: rgba(255,255,255,0.4);
          background: repeating-linear-gradient(
            135deg,
            #111,
            #111 10px,
            #161616 10px,
            #161616 20px
          );
        }
        .scp-media-placeholder-icon {
          width: 52px;
          height: 52px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scp-media-placeholder-icon svg { width: 20px; height: 20px; }
        .scp-media-placeholder-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        /* ── BOTTOM ROW ── */
        .scp-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 2.5rem;
        }

        .scp-left {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }

        .scp-icon {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border: 1px solid rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f05a1a;
        }
        .scp-icon svg { width: 26px; height: 26px; }

        .scp-eyebrow {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          margin-bottom: 0.6rem;
          display: block;
        }
        .scp-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(1.4rem, 2.6vw, 1.9rem);
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: #0a0a0a;
          margin: 0 0 0.5rem;
        }
        .scp-heading span { color: #f05a1a; }
        .scp-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.84rem;
          line-height: 1.7;
          color: rgba(0,0,0,0.5);
          margin: 0;
          max-width: 480px;
        }

        .scp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.9rem;
        }
        .scp-tag {
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(0,0,0,0.42);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0.3rem 0.6rem;
        }

        .scp-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #0a0a0a;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1rem 1.85rem;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
        }
        .scp-btn:hover { background: #f05a1a; transform: translateY(-1px); }
        .scp-btn-arrow { font-size: 1rem; line-height: 1; transition: transform 0.2s; }
        .scp-btn:hover .scp-btn-arrow { transform: translateX(3px); }

        @media (max-width: 780px) {
          .scp-media { aspect-ratio: 16 / 10; }
          .scp-row {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          .scp-left { align-items: flex-start; flex-direction: column; gap: 1.25rem; }
          .scp-btn { width: 100%; justify-content: center; }
        }
        @media (max-width: 640px) {
          .scp-inner { padding: 0 1.5rem; }
          .scp-card { padding: 2.5rem 0; }
        }
      `}</style>

      <section className="scp-root">
        <div className="scp-inner">
          <div className="scp-card">
            {/* Video block — swap the placeholder below for a real <video src="..." poster="..." controls /> once footage is ready */}
            <div className="scp-media">
              <video src="/studios.mp4" poster="" controls muted playsInline />
              <span className="scp-media-tag">Inside CMMG Studio</span>
            </div>

            <div className="scp-row">
              <div className="scp-left">
                <div className="scp-icon">
                  <svg viewBox="0 0 32 32" fill="none">
                    <path
                      d="M4 16h4l3-9 4 18 4-13 3 4h6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <span className="scp-eyebrow">Also At CMMG</span>
                  <h3 className="scp-heading">
                    Need studio time <span>too?</span>
                  </h3>
                  <p className="scp-desc">
                    Recording, mixing, and mastering — the same team runs our
                    music studios, right next door to the production floor.
                  </p>
                  <div className="scp-tags">
                    <span className="scp-tag">Recording</span>
                    <span className="scp-tag">Mixing</span>
                    <span className="scp-tag">Mastering</span>
                  </div>
                </div>
              </div>

              <Link href="/studio" className="scp-btn">
                Visit Studio
                <span className="scp-btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudioCrossPromo;
