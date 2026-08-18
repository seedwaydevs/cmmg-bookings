"use client";

import { useMemo, useState, useTransition } from "react";

import { createEnquiry } from "@/data/enquiries/create-enquiry";
import { INQUIRY_ONLY_OFFERINGS } from "@/data/services/offering-catalog";

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "info@cmmg.co.za",
    detail: "Quotes, availability & custom briefs.",
  },
  {
    label: "Phone",
    value: "+27 (0) 79-527-0356",
    detail: "For quick questions.",
  },
  {
    label: "Office",
    value: "1 2nd Rd, Halfway House Estate, Midrand, 1685",
    detail: "Feel free to visit.",
  },
];

type Selection = {
  key: string;
  label: string;
  meta?: string;
};

const GENERAL_ENQUIRY: Selection = {
  key: "general-enquiry",
  label: "General Enquiry",
  meta: "A broader production or pricing question.",
};

export default function InquiryOfferingsSection() {
  const [pending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    GENERAL_ENQUIRY.key,
  ]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const selectionOptions = useMemo<Selection[]>(
    () => [
      GENERAL_ENQUIRY,
      ...INQUIRY_ONLY_OFFERINGS.map((offering) => ({
        key: `${offering.category}-${offering.name}`,
        label: `${offering.name} (${offering.priceLabel})`,
        meta: `${offering.studio} · ${offering.category}`,
      })),
    ],
    [],
  );

  const selectedOptions = selectionOptions.filter((option) =>
    selectedKeys.includes(option.key),
  );

  function toggleSelection(key: string) {
    setSelectedKeys((current) => {
      if (current.includes(key)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== key);
      }

      return [...current, key];
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const selectedOfferings = selectionOptions.filter((option) =>
      selectedKeys.includes(option.key),
    );

    startTransition(async () => {
      const formData = new FormData();

      formData.append("selectedOfferings", JSON.stringify(selectedOfferings));
      formData.append("customerName", customerName);
      formData.append("customerEmail", customerEmail);
      formData.append("customerPhone", customerPhone);
      formData.append("message", message);

      const result = await createEnquiry(formData);

      if (!result.success) {
        setStatus({
          type: "error",
          message: result.message,
        });
        return;
      }

      setStatus({
        type: "success",
        message: result.message,
      });

      setSelectedKeys([GENERAL_ENQUIRY.key]);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setMessage("");
    });
  }

  return (
    <>
      <style>{`
        .io-root {
          background: #f8f5ef;
          padding: 5rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .io-inner {
          width: min(1100px, calc(100% - 2.5rem));
          margin: 0 auto;
        }

        /* Header */

        .io-header {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: end;
          margin-bottom: 2.5rem;
        }

        .io-title {
          margin: 0;
          color: #0a0a0a;
          font-family: "Bricolage Grotesque", sans-serif;
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }

        .io-title span {
          color: #f05a1a;
        }

        .io-copy {
          margin: 0;
          max-width: 420px;
          color: rgba(0, 0, 0, 0.55);
          font-family: "Manrope", sans-serif;
          font-size: 0.9rem;
          line-height: 1.7;
        }

        /* Main card */

        .io-card {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
        }

        .io-section-label,
        .io-label,
        .io-contact-label {
          display: block;
          margin-bottom: 0.55rem;
          color: rgba(0, 0, 0, 0.38);
          font-family: "Manrope", sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* Service selector */

        .io-selector {
          position: relative;
        }

        .io-selector summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem;
          background: #faf8f4;
          border: 1px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
          list-style: none;
          color: #0a0a0a;
          font-family: "Manrope", sans-serif;
          font-size: 0.9rem;
        }

        .io-selector summary::-webkit-details-marker {
          display: none;
        }

        .io-selector summary::after {
          content: "+";
          color: #f05a1a;
          font-size: 1.2rem;
          font-weight: 400;
        }

        .io-selector[open] summary {
          border-color: #f05a1a;
        }

        .io-selector[open] summary::after {
          content: "−";
        }

        .io-selector-menu {
          display: grid;
          gap: 0.4rem;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .io-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
          padding: 0.8rem;
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .io-option:hover {
          background: #faf8f4;
        }

        .io-option.active {
          background: rgba(240, 90, 26, 0.08);
        }

        .io-option-info {
          display: grid;
          gap: 0.2rem;
        }

        .io-option-name {
          color: #0a0a0a;
          font-family: "Manrope", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .io-option-meta {
          color: rgba(0, 0, 0, 0.45);
          font-family: "Manrope", sans-serif;
          font-size: 0.7rem;
        }

        .io-check {
          color: #f05a1a;
          font-size: 0.9rem;
          font-weight: 700;
        }

        /* Selected services */

        .io-selected {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin: 0.8rem 0 0;
        }

        .io-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.65rem;
          background: #f8f5ef;
          color: #0a0a0a;
          font-family: "Manrope", sans-serif;
          font-size: 0.7rem;
        }

        .io-pill button {
          padding: 0;
          border: 0;
          background: transparent;
          color: rgba(0, 0, 0, 0.4);
          cursor: pointer;
          font-size: 0.85rem;
        }

        /* CTA */

        .io-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .io-trigger-copy {
          margin: 0;
          color: rgba(0, 0, 0, 0.5);
          font-family: "Manrope", sans-serif;
          font-size: 0.78rem;
          line-height: 1.5;
        }

        .io-button {
          flex-shrink: 0;
          border: 0;
          background: #0a0a0a;
          color: #fff;
          padding: 0.9rem 1.2rem;
          font-family: "Syne", sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .io-button:hover {
          background: #f05a1a;
        }

        /* Form */

        .io-form-wrap {
          margin-top: 1rem;
        }

        .io-form {
          display: grid;
          gap: 1rem;
        }

        .io-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .io-field {
          display: grid;
          gap: 0.4rem;
        }

        .io-label {
          margin: 0;
        }

        .io-input,
        .io-textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: #fff;
          padding: 0.85rem 0.9rem;
          color: #0a0a0a;
          font-family: "Manrope", sans-serif;
          font-size: 0.85rem;
          outline: none;
        }

        .io-input:focus,
        .io-textarea:focus {
          border-color: #f05a1a;
        }

        .io-textarea {
          min-height: 130px;
          resize: vertical;
        }

        .io-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.25rem;
        }

        .io-note {
          max-width: 500px;
          margin: 0;
          color: rgba(0, 0, 0, 0.45);
          font-family: "Manrope", sans-serif;
          font-size: 0.72rem;
          line-height: 1.5;
        }

        .io-submit {
          flex-shrink: 0;
          border: 0;
          background: #0a0a0a;
          color: #fff;
          padding: 0.9rem 1.2rem;
          font-family: "Syne", sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .io-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Status */

        .io-status {
          padding: 0.8rem 1rem;
          border-left: 3px solid;
          font-family: "Manrope", sans-serif;
          font-size: 0.78rem;
        }

        .io-status.success {
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.06);
          color: #15803d;
        }

        .io-status.error {
          border-color: #d93030;
          background: rgba(217, 48, 48, 0.06);
          color: #b91c1c;
        }

        /* Contact */

        .io-contact {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .io-contact-item {
          min-width: 0;
        }

        .io-contact-label {
          margin-bottom: 0.35rem;
        }

        .io-contact-value {
          margin: 0;
          color: #0a0a0a;
          font-family: "Syne", sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .io-contact-detail {
          margin: 0.25rem 0 0;
          color: rgba(0, 0, 0, 0.45);
          font-family: "Manrope", sans-serif;
          font-size: 0.72rem;
        }

        @media (max-width: 800px) {
          .io-header {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .io-row,
          .io-contact {
            grid-template-columns: 1fr;
          }

          .io-actions,
          .io-trigger {
            align-items: stretch;
            flex-direction: column;
          }

          .io-button,
          .io-submit {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .io-root {
            padding: 4rem 0;
          }

          .io-inner {
            width: min(100% - 1.5rem, 1100px);
          }

          .io-card {
            padding: 1.1rem;
          }

          .io-title {
            font-size: clamp(2.5rem, 14vw, 4rem);
          }
        }
      `}</style>

      <section className="io-root" id="enquiries">
        <div className="io-inner">
          {/* Header */}
          <div className="io-header">
            <h2 className="io-title">
              Custom Work By <span>Enquiry</span>
            </h2>

            <p className="io-copy">
              Need something that requires a little more planning? Tell us what
              you need and we&apos;ll take it from there.
            </p>
          </div>

          {/* Enquiry selector */}
          <section className="io-card">
            <span className="io-section-label">What can we help with?</span>

            <details className="io-selector">
              <summary>
                {selectedOptions.length === 1
                  ? selectedOptions[0].label
                  : `${selectedOptions.length} services selected`}
              </summary>

              <div className="io-selector-menu">
                {selectionOptions.map((option) => {
                  const selected = selectedKeys.includes(option.key);

                  return (
                    <button
                      key={option.key}
                      type="button"
                      className={`io-option ${selected ? "active" : ""}`}
                      onClick={() => toggleSelection(option.key)}
                    >
                      <span className="io-option-info">
                        <span className="io-option-name">{option.label}</span>

                        {option.meta && (
                          <span className="io-option-meta">{option.meta}</span>
                        )}
                      </span>

                      {selected && <span className="io-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            </details>

            {/* Selected services */}
            <div className="io-selected">
              {selectedOptions.map((option) => (
                <span className="io-pill" key={option.key}>
                  {option.label}

                  {selectedKeys.length > 1 && (
                    <button
                      type="button"
                      aria-label={`Remove ${option.label}`}
                      onClick={() => toggleSelection(option.key)}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="io-trigger">
              <p className="io-trigger-copy">
                Select one or more services, then tell us about your project.
              </p>

              <button
                type="button"
                className="io-button"
                onClick={() => setFormOpen((value) => !value)}
              >
                {formOpen ? "Close Form" : "Start an Enquiry"}
              </button>
            </div>
          </section>

          {/* Form */}
          {formOpen && (
            <section className="io-card io-form-wrap" id="contact">
              <span className="io-section-label">Your Details</span>

              <form className="io-form" onSubmit={onSubmit}>
                <div className="io-row">
                  <label className="io-field">
                    <span className="io-label">Name</span>

                    <input
                      className="io-input"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder="Your full name"
                    />
                  </label>

                  <label className="io-field">
                    <span className="io-label">Email</span>

                    <input
                      type="email"
                      className="io-input"
                      value={customerEmail}
                      onChange={(event) => setCustomerEmail(event.target.value)}
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="io-field">
                  <span className="io-label">Phone</span>

                  <input
                    className="io-input"
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                    placeholder="+27 ..."
                  />
                </label>

                <label className="io-field">
                  <span className="io-label">Tell Us What You Need</span>

                  <textarea
                    className="io-textarea"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell us about the project, dates, people involved, turnaround, or anything else that will help us understand what you need."
                  />
                </label>

                <div className="io-actions">
                  <p className="io-note">
                    We&apos;ll review your enquiry and get back to you with the
                    next steps.
                  </p>

                  <button
                    className="io-submit"
                    type="submit"
                    disabled={pending}
                  >
                    {pending ? "Sending..." : "Send Enquiry"}
                  </button>
                </div>

                {status && (
                  <div className={`io-status ${status.type}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </section>
          )}

          {/* Contact details */}
          <div className="io-contact">
            {CONTACT_DETAILS.map((item) => (
              <article className="io-contact-item" key={item.label}>
                <span className="io-contact-label">{item.label}</span>

                <p className="io-contact-value">{item.value}</p>

                <p className="io-contact-detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
