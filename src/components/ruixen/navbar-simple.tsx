"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Replace with your actual imports ────────────────────────────────────────
// import { logo } from "@/lib/imageData";
// import SocialMediaLinks from "../SocialMediaLinks";
// ─────────────────────────────────────────────────────────────────────────────

/*
  FONT SETUP — add to your layout.tsx / globals:
  import { Syne, Manrope } from "next/font/google";
  const syne = Syne({ subsets: ["latin"], weight: ["400","500","600","700","800"] });
  const manrope = Manrope({ subsets: ["latin"], weight: ["300","400","500","600"] });
*/

const navLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "https://www.cmmg.co.za/about" },
  { title: "Services", link: "#services" },
  { title: "Gallery", link: "#gallery" },
  { title: "Contact", link: "#contact" },
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');

        .nav-root {
          font-family: 'Syne', sans-serif;
        }
        .nav-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .nav-bar.scrolled {
          background: rgba(5, 5, 5, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .nav-bar.top {
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .nav-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          letter-spacing: -0.03em;
        }
        .nav-logo-text {
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.04em;
        }
        .nav-logo-dot {
          color: #f05a1a;
          font-size: 1.75rem;
          line-height: 1;
          margin-left: 1px;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          font-family: 'Manrope', sans-serif;
        }
        .nav-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #1a8cff;
          animation: pulse-blue 2s infinite;
        }
        @keyframes pulse-blue {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        .menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .menu-btn:hover { color: #f05a1a; }
        .menu-btn:hover .hamburger-line { background: #f05a1a; }
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 24px;
        }
        .hamburger-line {
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: background 0.2s, transform 0.2s;
        }
        .hamburger-line:nth-child(2) { width: 75%; }

        /* ── FULLSCREEN OVERLAY ── */
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #050505;
          transition: opacity 0.35s ease, transform 0.35s ease;
          height: 100svh;
          overflow: hidden;
        }
        .overlay-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem;
          border-right: 1px solid rgba(255,255,255,0.08);
          overflow-y: auto;
          height: 100%;
        }
        .overlay-right {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2.5rem;
          background: #0a0a0a;
          overflow-y: auto;
          height: 100%;
        }
        .overlay-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .overlay-logo {
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.04em;
          font-family: 'Syne', sans-serif;
        }
        .close-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.55rem 1.2rem;
          transition: all 0.2s;
        }
        .close-btn:hover {
          border-color: #f05a1a;
          color: #f05a1a;
        }
        .overlay-nav {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 1.75rem;
        }
        .overlay-link {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.8rem);
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          letter-spacing: -0.03em;
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.2s, padding-left 0.25s;
          position: relative;
          overflow: hidden;
        }
        .overlay-link::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: #f05a1a;
          opacity: 0.12;
          transition: width 0.3s ease;
        }
        .overlay-link:hover::before { width: 100%; }
        .overlay-link:hover {
          color: #fff;
          padding-left: 1rem;
        }
        .overlay-link-num {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
          font-family: 'Manrope', sans-serif;
          transition: color 0.2s;
        }
        .overlay-link:hover .overlay-link-num { color: #f05a1a; }

        /* Right panel */
        .overlay-right-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 1.5rem;
        }
        .overlay-cta {
          display: block;
          width: 100%;
          padding: 1.1rem 1.5rem;
          background: #f05a1a;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          text-align: center;
          margin-bottom: 1.25rem;
          transition: background 0.2s;
        }
        .overlay-cta:hover { background: #d44d14; }
        .overlay-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .overlay-info-item label {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 0.3rem;
        }
        .overlay-info-item span {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
        }
        .overlay-social {
          display: flex;
          gap: 1.25rem;
          margin-top: 2rem;
        }
        .overlay-social a {
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }
        .overlay-social a:hover { color: #f05a1a; }

        /* Blue accent bar */
        .blue-bar {
          height: 2px;
          background: linear-gradient(90deg, #1a8cff 0%, rgba(26,140,255,0) 100%);
          width: 60px;
          margin-bottom: 2rem;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .overlay {
            grid-template-columns: 1fr;
          }
          .overlay-right { display: none; }
          .overlay-left { padding: 2rem 1.5rem; }
          .nav-pill { display: none; }
          .nav-inner { padding: 0 1.25rem; }
        }
      `}</style>

      <nav className="nav-root">
        <div className={`nav-bar ${scrolled ? "scrolled" : "top"}`}>
          <div className="nav-inner">
            {/* Logo */}
            <Link href="/" className="nav-logo">
              {/* If using image logo: <Image src={logo} alt="CMMG" width={120} height={40} className="object-contain" /> */}
              <span className="nav-logo-text">CMMG</span>
              <span className="nav-logo-dot">.</span>
            </Link>

            {/* Right side */}
            <div className="nav-right">
              <div className="nav-pill">
                <span className="nav-status-dot" />
                Studios Open
              </div>
              <button
                className="menu-btn"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <div className="hamburger">
                  <div className="hamburger-line" />
                  <div className="hamburger-line" />
                  <div className="hamburger-line" />
                </div>
                Menu
              </button>
            </div>
          </div>
        </div>

        {/* Fullscreen Overlay */}
        {menuOpen && (
          <div className="overlay">
            {/* Left: navigation */}
            <div className="overlay-left">
              <div className="overlay-top">
                <span className="overlay-logo">
                  CMMG<span style={{ color: "#f05a1a" }}>.</span>
                </span>
                <button
                  className="close-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  Close ✕
                </button>
              </div>

              <nav className="overlay-nav">
                {navLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    className="overlay-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.title}
                    <span className="overlay-link-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="overlay-social">
                <a href="#">Instagram</a>
                <a href="#">SoundCloud</a>
                <a href="#">YouTube</a>
                <a href="#">Spotify</a>
              </div>
            </div>

            {/* Right: info + CTA */}
            <div className="overlay-right">
              <div>
                <div className="blue-bar" />
                <p className="overlay-right-label">Quick Actions</p>
                <a
                  href="https://www.library.cmmg.co.za/library"
                  className="overlay-cta"
                  target="_blank"
                  rel="noreferrer"
                >
                  Production Music Library →
                </a>
              </div>

              <div className="overlay-info-grid">
                <div className="overlay-info-item">
                  <label>Location</label>
                  <span>South Africa</span>
                </div>
                <div className="overlay-info-item">
                  <label>Studio Status</label>
                  <span style={{ color: "#1a8cff" }}>Available</span>
                </div>
                <div className="overlay-info-item">
                  <label>Hours</label>
                  <span>08:00 — 22:00</span>
                </div>
                <div className="overlay-info-item">
                  <label>Booking</label>
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
