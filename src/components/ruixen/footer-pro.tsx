"use client";

import React, { useState } from "react";

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
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Sitemap", href: "#" },
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
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire up your form action here
    setSent(true);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');

        .ft-root {
          background: #0a0a0a;
          font-family: 'Syne', sans-serif;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        /* ── TOP BAND: big tagline ── */
        .ft-top {
          padding: 5rem 3rem 4rem;
          max-width: 1260px;
          margin: 0 auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ft-tagline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: #fff;
          text-transform: uppercase;
          margin: 0;
          max-width: 700px;
        }
        .ft-tagline span { color: #f05a1a; }
        .ft-top-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.25rem;
          flex-shrink: 0;
        }
        .ft-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #f05a1a;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1rem 2rem;
          transition: background 0.2s, transform 0.2s;
        }
        .ft-book-btn:hover { background: #d44d14; transform: translateY(-1px); }
        .ft-top-meta {
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-align: right;
        }
        .ft-top-meta strong {
          color: #1a8cff;
          font-weight: 600;
        }

        /* ── MIDDLE: logo + nav + contact ── */
        .ft-mid {
          max-width: 1260px;
          margin: 0 auto;
          padding: 4rem 3rem;
          display: grid;
          grid-template-columns: 280px 1fr 320px;
          gap: 4rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* Left: logo + desc + socials */
        .ft-brand {}
        .ft-logo {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          margin-bottom: 1.5rem;
        }
        .ft-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.04em;
        }
        .ft-logo-dot { color: #f05a1a; font-size: 1.75rem; line-height: 1; }
        .ft-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.58);
          margin: 0 0 2rem;
        }
        .ft-socials {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .ft-social-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
        }
        .ft-social-link::before {
          content: '';
          width: 16px; height: 1px;
          background: currentColor;
          transition: width 0.25s;
        }
        .ft-social-link:hover { color: #f05a1a; }
        .ft-social-link:hover::before { width: 28px; }

        /* Centre: nav columns */
        .ft-nav {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .ft-nav-col {}
        .ft-nav-title {
          font-family: 'Manrope', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 1.25rem;
          display: block;
        }
        .ft-nav-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .ft-nav-link {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .ft-nav-link:hover { color: #fff; }

        /* Right: contact form */
        .ft-contact {}
        .ft-contact-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 1.25rem;
          display: block;
        }
        .ft-contact-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0 0 1.75rem;
        }
        .ft-contact-title span { color: #f05a1a; }
        .ft-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .ft-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .ft-field-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.48);
        }
        .ft-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 0.6rem 0;
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: #fff;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }
        .ft-input:focus { border-color: #f05a1a; }
        .ft-input::placeholder { color: rgba(255,255,255,0.4); }
        .ft-textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 0.6rem 0;
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem;
          color: #fff;
          outline: none;
          width: 100%;
          resize: none;
          height: 72px;
          transition: border-color 0.2s;
        }
        .ft-textarea:focus { border-color: #f05a1a; }
        .ft-textarea::placeholder { color: rgba(255,255,255,0.4); }
        .ft-send-btn {
          align-self: flex-start;
          background: none;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.78);
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.65rem 1.5rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .ft-send-btn:hover {
          border-color: #f05a1a;
          color: #f05a1a;
        }
        .ft-sent-msg {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem;
          color: #1a8cff;
          padding: 0.5rem 0;
        }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          max-width: 1260px;
          margin: 0 auto;
          padding: 1.75rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .ft-copyright {
          font-family: 'Manrope', sans-serif;
          font-size: 0.62rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.48);
        }
        .ft-bottom-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .ft-bottom-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-bottom-link:hover { color: rgba(255,255,255,0.82); }
        .ft-bottom-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.28);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .ft-mid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .ft-brand { grid-column: 1 / 2; grid-row: 1; }
          .ft-nav   { grid-column: 2 / 3; grid-row: 1; }
          .ft-contact { grid-column: 1 / 3; grid-row: 2; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 3rem; }
        }
        @media (max-width: 768px) {
          .ft-top { flex-direction: column; align-items: flex-start; padding: 4rem 1.5rem 3rem; }
          .ft-top-right { align-items: flex-start; }
          .ft-top-meta { text-align: left; }
          .ft-tagline { font-size: clamp(2rem, 8vw, 3.5rem); }
          .ft-mid { grid-template-columns: 1fr; padding: 3rem 1.5rem; gap: 3rem; }
          .ft-brand { grid-column: 1; grid-row: auto; }
          .ft-nav   { grid-column: 1; grid-row: auto; }
          .ft-contact { grid-column: 1; grid-row: auto; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 2.5rem; }
          .ft-bottom { flex-direction: column; align-items: flex-start; padding: 1.5rem; gap: 1rem; }
        }
        @media (max-width: 480px) {
          .ft-nav { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <footer className="ft-root">
        {/* ── TOP: big tagline + CTA ── */}
        <div className="ft-top">
          <h2 className="ft-tagline">
            Your Sound.
            <br />
            Your <span>Vision.</span>
          </h2>
          <div className="ft-top-right">
            <Link href="#book" className="ft-book-btn">
              Book A Session →
            </Link>
            <p className="ft-top-meta">
              Studios available <strong>24 / 7</strong>
              <br />
              Confirmed within 24 hours
            </p>
          </div>
        </div>

        {/* ── MIDDLE: brand + nav + contact ── */}
        <div className="ft-mid">
          {/* Brand */}
          <div className="ft-brand">
            <Link href="/" className="ft-logo">
              {/* Swap to <Image> if using logo asset */}
              <span className="ft-logo-text">CMMG</span>
              <span className="ft-logo-dot">.</span>
            </Link>
            <p className="ft-desc">
              World-class recording studios, green screen facilities, and
              production spaces — all under one roof. Built for creators who
              demand excellence.
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

          {/* Nav */}
          <div className="ft-nav">
            {navColumns.map((col, i) => (
              <div key={i} className="ft-nav-col">
                <span className="ft-nav-title">{col.title}</span>
                <ul className="ft-nav-list">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link href={link.href} className="ft-nav-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="ft-contact">
            <span className="ft-contact-label">Get In Touch</span>
            <h3 className="ft-contact-title">
              Let&apos;s talk about your <span>project</span>
            </h3>
            {sent ? (
              <p className="ft-sent-msg">
                ✓ Message sent — we&apos;ll be in touch soon.
              </p>
            ) : (
              <form className="ft-form" onSubmit={handleSubmit}>
                <div className="ft-field">
                  <label className="ft-field-label">Name</label>
                  <input
                    className="ft-input"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="ft-field">
                  <label className="ft-field-label">Email</label>
                  <input
                    type="email"
                    className="ft-input"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="ft-field">
                  <label className="ft-field-label">Message</label>
                  <textarea
                    className="ft-textarea"
                    placeholder="Tell us about your project..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="ft-send-btn">
                  Send Message →
                </button>
              </form>
            )}
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
            <div className="ft-bottom-dot" />
            <Link href="#" className="ft-bottom-link">
              Terms
            </Link>
            <div className="ft-bottom-dot" />
            <Link href="#" className="ft-bottom-link">
              Sitemap
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
