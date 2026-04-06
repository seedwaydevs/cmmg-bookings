"use client";

import { useMemo, useState, useTransition } from "react";

import { createEnquiry } from "@/data/enquiries/create-enquiry";
import { INQUIRY_ONLY_OFFERINGS } from "@/data/services/offering-catalog";

const CONTACT_DETAILS = [
  {
    label: "Enquiry Email",
    value: "bookings@cmmg.co.za",
    detail: "Best for quotes, availability questions, and custom briefs.",
  },
  {
    label: "Phone",
    value: "+27 (0) 61-788-9902",
    detail: "Best for quick questions.",
  },
  {
    label: "Office Address",
    value: "1 2nd Rd, Halfway House Estate, Midrand, 1685",
    detail: "Where we call home. Feel free to visit.",
  },
];

type Selection = {
  key: string;
  label: string;
};

const GENERAL_ENQUIRY: Selection = {
  key: "general-enquiry",
  label: "General Enquiry",
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

  const selectionOptions = useMemo(
    () => [
      GENERAL_ENQUIRY,
      ...INQUIRY_ONLY_OFFERINGS.map((offering) => ({
        key: `${offering.category}-${offering.name}`,
        label: `${offering.name} (${offering.priceLabel})`,
      })),
    ],
    [],
  );

  function toggleSelection(key: string) {
    setSelectedKeys((prev) => {
      if (prev.includes(key)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== key);
      }
      return [...prev, key];
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const selectedOfferings: Selection[] = selectionOptions.filter((option) =>
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
        setStatus({ type: "error", message: result.message });
        return;
      }

      setStatus({ type: "success", message: result.message });
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
          padding: 6rem 0;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .io-inner {
          max-width: 1260px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .io-header {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2rem;
          align-items: end;
          margin-bottom: 2.5rem;
        }
        .io-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 8vw, 5rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin: 0;
          color: #0a0a0a;
        }
        .io-title span { color: #f05a1a; }
        .io-copy {
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(0,0,0,0.58);
          margin: 0;
        }
        .io-contact-block {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.08);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .io-contact-item {
          display: grid;
          gap: 0.35rem;
        }
        .io-contact-label {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.36);
          margin-bottom: 0.6rem;
        }
        .io-contact-value {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #0a0a0a;
          margin: 0 0 0.4rem;
        }
        .io-contact-detail {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          line-height: 1.6;
          color: rgba(0,0,0,0.56);
          margin: 0;
        }
        .io-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 1.5rem;
        }
        .io-section-label {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.36);
          margin-bottom: 1rem;
        }
        .io-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.9rem;
        }
        .io-service-btn {
          width: 100%;
          text-align: left;
          background: #faf8f4;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 1rem;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .io-service-btn:hover {
          border-color: rgba(240,90,26,0.42);
          transform: translateY(-1px);
        }
        .io-service-btn.active {
          background: rgba(240,90,26,0.08);
          border-color: #f05a1a;
        }
        .io-service-name {
          display: block;
          font-family: 'Syne', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          color: #0a0a0a;
          margin-bottom: 0.35rem;
        }
        .io-service-meta {
          font-family: 'Manrope', sans-serif;
          font-size: 0.76rem;
          line-height: 1.55;
          color: rgba(0,0,0,0.56);
        }
        .io-selected {
          margin-top: 1rem;
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          line-height: 1.6;
          color: rgba(0,0,0,0.6);
        }
        .io-trigger-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 1.25rem;
        }
        .io-trigger-copy {
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem;
          line-height: 1.6;
          color: rgba(0,0,0,0.56);
          margin: 0;
          max-width: 560px;
        }
        .io-trigger {
          border: none;
          background: #0a0a0a;
          color: #fff;
          padding: 0.95rem 1.35rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .io-form-wrap {
          margin-top: 1.25rem;
        }
        .io-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .io-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .io-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .io-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.38);
        }
        .io-input, .io-textarea {
          width: 100%;
          border: 1px solid rgba(0,0,0,0.12);
          background: #fff;
          padding: 0.9rem 1rem;
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
          color: #0a0a0a;
          outline: none;
        }
        .io-input:focus, .io-textarea:focus {
          border-color: #f05a1a;
        }
        .io-textarea {
          min-height: 150px;
          resize: vertical;
        }
        .io-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .io-note {
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem;
          line-height: 1.6;
          color: rgba(0,0,0,0.5);
          margin: 0;
          max-width: 340px;
        }
        .io-submit {
          border: none;
          background: #0a0a0a;
          color: #fff;
          padding: 0.95rem 1.35rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .io-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .io-status {
          margin-top: 1rem;
          padding: 0.85rem 1rem;
          border-left: 3px solid;
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
        }
        .io-status.success {
          border-color: #22c55e;
          color: #15803d;
          background: rgba(34,197,94,0.06);
        }
        .io-status.error {
          border-color: #d93030;
          color: #b91c1c;
          background: rgba(217,48,48,0.06);
        }
        @media (max-width: 920px) {
          .io-grid,
          .io-row, .io-contact-block {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 780px) {
          .io-root { padding: 4.5rem 0; }
          .io-inner { padding: 0 1.25rem; }
          .io-header { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="io-root" id="enquiries">
        <div className="io-inner">
          <div className="io-header">
            <h2 className="io-title">
              Custom Work By <span>Enquiry</span>
            </h2>
            <p className="io-copy">
              For services that need a bit more planning, submit an enquiry
              right here on our site. Choose one or more services, leave a
              general enquiry, and send your contact details in one step.
            </p>
          </div>

          <section className="io-card">
            <span className="io-section-label">Choose Services</span>
            <div className="io-grid">
              {selectionOptions.map((option) => {
                const offering = INQUIRY_ONLY_OFFERINGS.find(
                  (item) => `${item.category}-${item.name}` === option.key,
                );

                return (
                  <button
                    key={option.key}
                    type="button"
                    className={`io-service-btn ${selectedKeys.includes(option.key) ? "active" : ""}`}
                    onClick={() => toggleSelection(option.key)}
                  >
                    <span className="io-service-name">{option.label}</span>
                    <span className="io-service-meta">
                      {offering
                        ? `${offering.studio} · ${offering.category}`
                        : "Use this for broader production or pricing questions."}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="io-selected">
              Selected:{" "}
              {selectionOptions
                .filter((option) => selectedKeys.includes(option.key))
                .map((option) => option.label)
                .join(", ")}
            </p>
            <div className="io-trigger-row">
              <p className="io-trigger-copy">
                Once you&apos;ve chosen the services you want to ask about, open
                the enquiry form and send your project brief without leaving the
                page.
              </p>
              <button
                type="button"
                className="io-trigger"
                onClick={() => setFormOpen((value) => !value)}
              >
                {formOpen ? "Hide Enquiry Form" : "Email Enquiry"}
              </button>
            </div>
          </section>

          {formOpen && (
            <section className="io-card io-form-wrap" id="contact">
              <span className="io-section-label">Send Enquiry</span>
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
                  <span className="io-label">Phone Number</span>
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
                    placeholder="Share the project type, preferred dates, number of people involved, turnaround expectations, and anything else that will help the team quote properly."
                  />
                </label>
                <div className="io-actions">
                  <p className="io-note">
                    Select multiple services above, or keep it broad with a
                    general enquiry and explain the project in the message box.
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

          <div className="io-contact-block">
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
