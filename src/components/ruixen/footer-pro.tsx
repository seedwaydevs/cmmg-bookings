"use client";

import React from "react";
import Link from "next/link";

const navColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "www.cmmg.co.za/about" },
      {
        label: "Production Library",
        href: "https://www.library.cmmg.co.za/library",
      },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Recording Studios", href: "#services" },
      { label: "Green Screen", href: "#services" },
      { label: "Podcast Studios", href: "#services" },
      { label: "Post-Production", href: "#services" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "SoundCloud", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Spotify", href: "#" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');

        .ft-root {
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .ft-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 3.5rem 2.5rem 0;
        }

        /* ── TOP: wordmark + nav + CTA, single row ── */
        .ft-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .ft-logo {
          display: flex;
          align-items: baseline;
          gap: 0.15rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ft-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .ft-logo-dot { color: #f05a1a; font-size: 1.1rem; }

        .ft-links {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex-wrap: wrap;
        }
        .ft-links-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-links-link:hover { color: #fff; }

        .ft-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #f05a1a;
          color: #fff;
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          padding: 0.6rem 1.1rem;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .ft-book-btn:hover { background: #d44d14; transform: translateY(-1px); }

        /* ── MIDDLE: one line — description + socials ── */
        .ft-mid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.75rem 0;
        }
        .ft-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.45);
          max-width: 440px;
          margin: 0;
        }
        .ft-socials {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .ft-social-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-social-link:hover { color: #f05a1a; }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 1.25rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .ft-copyright {
          font-family: 'Manrope', sans-serif;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.4);
        }
        .ft-bottom-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .ft-bottom-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-bottom-link:hover { color: rgba(255,255,255,0.75); }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .ft-inner { padding: 3rem 1.5rem 0; }
          .ft-top { padding-bottom: 2rem; }
          .ft-mid { flex-direction: column; align-items: flex-start; padding: 1.5rem 0; }
          .ft-bottom { flex-direction: column; align-items: flex-start; padding: 1.25rem 0 1.5rem; }
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-inner">
          {/* ── TOP: logo + nav + CTA ── */}
          <div className="ft-top">
            <Link href="/" className="ft-logo">
              <span className="ft-logo-text">CMMG</span>
              <span className="ft-logo-dot">.</span>
            </Link>

            <nav className="ft-links">
              {navColumns
                .flatMap((col) => col.links)
                .map((link, i) => (
                  <Link key={i} href={link.href} className="ft-links-link">
                    {link.label}
                  </Link>
                ))}
            </nav>

            <Link href="#book" className="ft-book-btn">
              Book A Session →
            </Link>
          </div>

          {/* ── MIDDLE: description + socials ── */}
          <div className="ft-mid">
            <p className="ft-desc">
              World-class recording studios, green screen facilities, and
              production spaces — all under one roof.
            </p>
            <div className="ft-socials">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="ft-social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="ft-bottom">
            <span className="ft-copyright">
              © {new Date().getFullYear()} CMMG. All rights reserved.
            </span>
            <div className="ft-bottom-links">
              <Link href="#" className="ft-bottom-link">
                Privacy
              </Link>
              <Link href="#" className="ft-bottom-link">
                Terms
              </Link>
              <Link href="#" className="ft-bottom-link">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
