"use client";

import { useState, FormEvent } from "react";

interface EnquiryFormData {
  couple_name: string;
  email: string;
  phone: string;
  wedding_date: string;
  location: string;
  region: string;
  guest_count: string;
  budget: string;
  style_notes: string;
}

export default function EnquiryForm() {
  const [form, setForm] = useState<EnquiryFormData>({
    couple_name: "",
    email: "",
    phone: "",
    wedding_date: "",
    location: "",
    region: "",
    guest_count: "",
    budget: "",
    style_notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(
        "We've received your enquiry. Our team will be in touch within 24 hours with a shortlist of planners matched to your vision."
      );
      setForm({
        couple_name: "",
        email: "",
        phone: "",
        wedding_date: "",
        location: "",
        region: "",
        guest_count: "",
        budget: "",
        style_notes: "",
      });
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            color: "#fff",
            marginBottom: "12px",
          }}
        >
          Thank you, {form.couple_name.split(" ")[0] || "friend"}. ✓
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
            maxWidth: "440px",
            margin: "0 auto",
          }}
        >
          {message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "520px",
        margin: "0 auto",
      }}
    >
      {status === "error" && (
        <div
          style={{
            padding: "12px 16px",
            background: "rgba(200,50,50,0.15)",
            border: "1px solid rgba(200,50,50,0.3)",
            color: "#ff8a8a",
            fontFamily: "var(--font-body)",
            fontSize: "0.88rem",
          }}
        >
          {message}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Your Name *
          </label>
          <input
            type="text"
            name="couple_name"
            value={form.couple_name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Both names if you'd like"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
          />
        </div>
        <div>
          <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="your@email.com"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="+44..."
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
          />
        </div>
        <div>
          <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Wedding Date
          </label>
          <input
            type="date"
            name="wedding_date"
            value={form.wedding_date}
            onChange={handleChange}
            className="form-input"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Wedding Location
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="form-input"
            placeholder="Venue or area"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
          />
        </div>
        <div>
          <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Preferred Region *
          </label>
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            required
            className="form-input"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
          >
            <option value="">Select region</option>
            <option>London</option>
            <option>Cotswolds</option>
            <option>Scotland</option>
            <option>Cornwall</option>
            <option>Yorkshire</option>
            <option>Lake District</option>
            <option>Other UK</option>
            <option>Europe (destination)</option>
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Guest Count
          </label>
          <select
            name="guest_count"
            value={form.guest_count}
            onChange={handleChange}
            className="form-input"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
          >
            <option value="">Select</option>
            <option>Intimate (under 30)</option>
            <option>Small (30–60)</option>
            <option>Medium (60–120)</option>
            <option>Large (120–200)</option>
            <option>Grand (200+)</option>
          </select>
        </div>
        <div>
          <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Budget
          </label>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="form-input"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
          >
            <option value="">Select budget</option>
            <option>Under £10k</option>
            <option>£10k–£20k</option>
            <option>£20k–£40k</option>
            <option>£40k–£75k</option>
            <option>£75k+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="form-label" style={{ color: "rgba(255,255,255,0.7)" }}>
          Tell Us About Your Vision
        </label>
        <textarea
          name="style_notes"
          value={form.style_notes}
          onChange={handleChange}
          className="form-input"
          rows={3}
          placeholder="Style, venue type, anything that matters to you..."
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary"
        style={{
          alignSelf: "center",
          opacity: status === "loading" ? 0.6 : 1,
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "Sending..." : "Start Your Journey →"}
      </button>
    </form>
  );
}
