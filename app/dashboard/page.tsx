"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";

interface Commission {
  id: string;
  couple_name: string;
  booking_amount: string;
  luminary_amount: string;
  status: "pending" | "invoiced" | "paid";
  created_at: string;
  paid_at: string | null;
  stripe_payment_intent_id: string | null;
}

interface Enquiry {
  id: string;
  couple_name: string;
  email: string;
  wedding_date: string;
  location: string;
  guest_count: string;
  budget: string;
  status: string;
  created_at: string;
}

interface Planner {
  id: string;
  name: string;
  company: string;
  email: string;
  location: string;
  region: string;
  status: string;
}

interface CommissionSummary {
  total: number;
  pending_count: number;
  pending_amount: number;
  paid_count: number;
  paid_amount: number;
  invoiced_count: number;
  invoiced_amount: number;
}

export default function DashboardPage() {
  // In production, this would come from your auth session
  // For demo, we'll read from ?planner_id= query param or use a placeholder
  const [planner, setPlanner] = useState<Planner | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [summary, setSummary] = useState<CommissionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [payoutUrl, setPayoutUrl] = useState<string | null>(null);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutError, setPayoutError] = useState<string | null>(null);

  // Get planner ID from URL params (demo) — in production from auth session
  const plannerId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("planner_id") ||
        "demo-planner-id"
      : "demo-planner-id";

  useEffect(() => {
    async function fetchData() {
      if (!plannerId || plannerId === "demo-planner-id") {
        setLoading(false);
        return;
      }

      try {
        // Fetch planner profile
        const plannerRes = await fetch(`/api/planner?planner_id=${plannerId}`);
        if (plannerRes.ok) {
          const plannerData = await plannerRes.json();
          setPlanner(plannerData);
        }
      } catch (e) {
        // ignore
      }

      try {
        // Fetch commissions
        const commissionsRes = await fetch(`/api/commissions?planner_id=${plannerId}`);
        if (commissionsRes.ok) {
          const data = await commissionsRes.json();
          setCommissions(data.commissions || []);
          setSummary(data.summary || null);
        }
      } catch (e) {
        // ignore
      }

      try {
        // Fetch enquiries (would be /api/enquiries in production)
        const enquiriesRes = await fetch(`/api/enquiries?planner_id=${plannerId}`);
        if (enquiriesRes.ok) {
          const data = await enquiriesRes.json();
          setEnquiries(data.enquiries || []);
        }
      } catch (e) {
        // ignore
      }

      setLoading(false);
    }

    fetchData();
  }, [plannerId]);

  async function handleRequestPayout() {
    setPayoutLoading(true);
    setPayoutError(null);
    setPayoutUrl(null);

    try {
      const res = await fetch(`/api/request-payout?planner_id=${plannerId}`);
      const data = await res.json();

      if (!res.ok) {
        setPayoutError(data.error || "Failed to create payout link");
        return;
      }

      setPayoutUrl(data.payment_link_url);
    } catch (e) {
      setPayoutError("Network error. Please try again.");
    } finally {
      setPayoutLoading(false);
    }
  }

  function formatCurrency(amount: string | number): string {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(parseFloat(String(amount)));
  }

  function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  }

  const statusColors: Record<string, string> = {
    pending: "#C9A84C",
    invoiced: "#6B6560",
    paid: "#4A7C59",
    new: "#C9A84C",
    active: "#4A7C59",
  };

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", background: "var(--parchment)" }}>
        {/* Header */}
        <div
          style={{
            background: "var(--charcoal)",
            color: "var(--cream)",
            padding: "60px 24px 40px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "12px",
            }}
          >
            Planner Portal
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--cream)" }}>
            {planner ? planner.name : "Your Dashboard"}
          </h1>
          {planner?.company && (
            <p style={{ color: "rgba(248,244,236,0.6)", marginTop: "8px", fontSize: "1rem" }}>
              {planner.company}
            </p>
          )}
        </div>

        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>

          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
              <p>Loading your dashboard...</p>
            </div>
          ) : plannerId === "demo-planner-id" ? (
            /* Demo mode — show placeholder state */
            <div>
              <div style={{
                background: "var(--cream)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "4px",
                padding: "32px",
                marginBottom: "40px",
                textAlign: "center",
              }}>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
                  🔗 Add <code style={{ background: "#eee", padding: "2px 6px", borderRadius: "3px" }}>?planner_id=&lt;uuid&gt;</code> to the URL to view a live dashboard.
                  <br />Example: <code style={{ background: "#eee", padding: "2px 6px", borderRadius: "3px" }}>/dashboard?planner_id=3ff6d12c-5c5e-4a3b-9f62-71ac42EXAMPLE</code>
                </p>
              </div>
            </div>
          ) : null}

          {/* Commission Summary Cards */}
          {summary && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "48px" }}>
              <div style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", padding: "28px" }}>
                <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>Pending Commission</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--gold)" }}>{formatCurrency(summary.pending_amount)}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "4px" }}>{summary.pending_count} booking{summary.pending_count !== 1 ? "s" : ""}</p>
              </div>
              <div style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", padding: "28px" }}>
                <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>Invoiced</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--charcoal)" }}>{formatCurrency(summary.invoiced_amount)}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "4px" }}>{summary.invoiced_count} booking{summary.invoiced_count !== 1 ? "s" : ""}</p>
              </div>
              <div style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", padding: "28px" }}>
                <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>Paid to Date</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#4A7C59" }}>{formatCurrency(summary.paid_amount)}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "4px" }}>{summary.paid_count} payment{summary.paid_count !== 1 ? "s" : ""}</p>
              </div>
            </div>
          )}

          {/* Payout Section */}
          {summary && (summary.pending_amount > 0 || summary.invoiced_amount > 0) && (
            <div style={{ background: "var(--charcoal)", borderRadius: "4px", padding: "32px", marginBottom: "48px", color: "var(--cream)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", color: "var(--cream)", marginBottom: "6px" }}>Outstanding Commission</h3>
                  <p style={{ color: "rgba(248,244,236,0.6)", fontSize: "0.95rem" }}>
                    Total outstanding: {formatCurrency((summary.pending_amount || 0) + (summary.invoiced_amount || 0))}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                  {payoutUrl ? (
                    <a
                      href={payoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "var(--gold)",
                        color: "var(--charcoal)",
                        padding: "12px 28px",
                        borderRadius: "2px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                    >
                      Pay Commission ↗
                    </a>
                  ) : (
                    <button
                      onClick={handleRequestPayout}
                      disabled={payoutLoading}
                      style={{
                        background: "var(--gold)",
                        color: "var(--charcoal)",
                        padding: "12px 28px",
                        borderRadius: "2px",
                        border: "none",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        cursor: payoutLoading ? "not-allowed" : "pointer",
                        opacity: payoutLoading ? 0.7 : 1,
                      }}
                    >
                      {payoutLoading ? "Generating..." : "Request Payout Link"}
                    </button>
                  )}
                  {payoutError && (
                    <p style={{ color: "#e88", fontSize: "0.85rem" }}>{payoutError}</p>
                  )}
                </div>
              </div>
              {payoutUrl && (
                <p style={{ color: "rgba(248,244,236,0.5)", fontSize: "0.85rem", marginTop: "12px" }}>
                  Payment link generated. Click "Pay Commission" to complete your payment via Stripe.
                </p>
              )}
            </div>
          )}

          {/* Commissions Table */}
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "24px", color: "var(--charcoal)" }}>Commissions</h2>
            {commissions.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No commissions yet.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "4px", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ background: "var(--cream)" }}>
                      {["Couple", "Booking Amount", "Commission (25%)", "Status", "Date", "Paid At"].map((h) => (
                        <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontFamily: "var(--font-body)", fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((c) => (
                      <tr key={c.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                        <td style={{ padding: "16px 20px", fontWeight: 500, color: "var(--charcoal)" }}>{c.couple_name}</td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)" }}>{formatCurrency(c.booking_amount)}</td>
                        <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--gold)" }}>{formatCurrency(c.luminary_amount)}</td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "2px",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            background: statusColors[c.status] + "20",
                            color: statusColors[c.status],
                          }}>
                            {c.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>{formatDate(c.created_at)}</td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>{c.paid_at ? formatDate(c.paid_at) : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Enquiries Table */}
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "24px", color: "var(--charcoal)" }}>Enquiries Received</h2>
            {enquiries.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No enquiries yet.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "4px", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ background: "var(--cream)" }}>
                      {["Couple", "Email", "Wedding Date", "Location", "Guests", "Budget", "Status", "Received"].map((h) => (
                        <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontFamily: "var(--font-body)", fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr key={e.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                        <td style={{ padding: "16px 20px", fontWeight: 500, color: "var(--charcoal)" }}>{e.couple_name}</td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>{e.email}</td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>{e.wedding_date || "—"}</td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>{e.location || "—"}</td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>{e.guest_count || "—"}</td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>{e.budget || "—"}</td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "2px",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            background: (statusColors[e.status] || "#6B6560") + "20",
                            color: statusColors[e.status] || "#6B6560",
                          }}>
                            {e.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>{formatDate(e.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  );
}