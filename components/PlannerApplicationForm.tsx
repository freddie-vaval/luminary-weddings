"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  instagram: string;
  region: string;
  price_range: string;
  bio: string;
}

export default function PlannerApplicationForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    instagram: "",
    region: "",
    price_range: "",
    bio: "",
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
      const res = await fetch("/api/planner-application", {
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
        "Application received. We'll review it personally and be in touch within 48 hours."
      );
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        website: "",
        instagram: "",
        region: "",
        price_range: "",
        bio: "",
      });
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: "48px 32px",
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.3)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            color: "var(--charcoal)",
            marginBottom: "12px",
          }}
        >
          Application received ✓
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          {message}
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "24px",
            fontFamily: "var(--font-display)",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--gold)",
            background: "none",
            border: "1px solid rgba(201,168,76,0.4)",
            padding: "10px 24px",
            cursor: "pointer",
          }}
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "24px" }}
    >
      {status === "error" && (
        <div
          style={{
            padding: "14px 20px",
            background: "rgba(200,50,50,0.06)",
            border: "1px solid rgba(200,50,50,0.2)",
            color: "#c03232",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
          }}
        >
          {message}
        </div>
      )}

      <div>
        <label className="form-label">Your Name *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Full name"
        />
      </div>
      <div>
        <label className="form-label">Company / Trading Name</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="form-input"
          placeholder="Your company name"
        />
      </div>
      <div>
        <label className="form-label">Email *</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="form-label">Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="form-input"
          placeholder="+44..."
        />
      </div>
      <div>
        <label className="form-label">Website</label>
        <input
          type="url"
          name="website"
          value={form.website}
          onChange={handleChange}
          className="form-input"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="form-label">Instagram Handle</label>
        <input
          type="text"
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
          className="form-input"
          placeholder="@yourbusiness"
        />
      </div>
      <div>
        <label className="form-label">Primary Region *</label>
        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Select your region</option>
          <option>London</option>
          <option>Cotswolds</option>
          <option>Scotland</option>
          <option>Cornwall</option>
          <option>Yorkshire</option>
          <option>Lake District</option>
          <option>Other UK</option>
        </select>
      </div>
      <div>
        <label className="form-label">Typical Planning Fee Range *</label>
        <select
          name="price_range"
          value={form.price_range}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Select fee range</option>
          <option>Under £10k</option>
          <option>£10k–£20k</option>
          <option>£20k–£40k</option>
          <option>£40k–£75k</option>
          <option>£75k+</option>
        </select>
      </div>
      <div>
        <label className="form-label">Tell Us About Your Work *</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          required
          className="form-input"
          rows={4}
          placeholder="Describe your style, specialities, and what makes your planning approach unique..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary"
        style={{
          alignSelf: "center",
          marginTop: "8px",
          opacity: status === "loading" ? 0.6 : 1,
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
