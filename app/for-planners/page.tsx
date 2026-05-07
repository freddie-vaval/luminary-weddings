import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "For Planners — Luminary Weddings",
  description:
    "Join the UK's most exclusive wedding planner network. We send you qualified enquiries, you focus on delivering extraordinary weddings. 25% commission only.",
};

const BENEFITS = [
  {
    title: "Qualified Enquiries, Not Spam",
    body: "Every enquiry is personally reviewed before we send it to you. No random couples who found you on Google. We match based on date, location, style, and budget — so the enquiries you receive are actually right for you.",
  },
  {
    title: "You Approve Every Booking",
    body: "You are never obligated to take an enquiry. If it's not right for your calendar or your style, decline it. We only count a placement when you've confirmed the booking.",
  },
  {
    title: "Commission Only When We Deliver",
    body: "No upfront fees. No monthly subscriptions. We take 25% only when we successfully match you with a couple and that couple confirms a booking with you. If we send you a lead and you don't convert, it costs you nothing.",
  },
  {
    title: "A Brand That Sells For You",
    body: "Luminary Weddings handles all the marketing, SEO, paid ads, and content. We're the reason couples find us in the first place. You benefit from our brand without lifting a finger.",
  },
  {
    title: "Ongoing Relationship Management",
    body: "We stay connected through the planning process to ensure everything runs smoothly. If anything comes up, we act as the intermediary so you can focus on execution.",
  },
  {
    title: "Network of Peers",
    body: "Join a community of exceptional planners. Referrals between network members are common — when someone is unavailable, we send the enquiry to another trusted planner in our network.",
  },
];

export const dynamic = "force-dynamic";

export default function ForPlannersPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "100px" }}>
        {/* Hero */}
        <div
          style={{
            textAlign: "center",
            padding: "100px 24px 80px",
            background: "var(--warm-white)",
          }}
        >
          <p className="section-label">For Planners</p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "var(--charcoal)",
              maxWidth: "680px",
              margin: "0 auto 24px",
            }}
          >
            We Market. We Match.
            <br />
            You Deliver.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              maxWidth: "520px",
              margin: "0 auto 40px",
              lineHeight: 1.8,
            }}
          >
            Luminary Weddings is a curated network of the UK's most exceptional wedding planners.
            We handle all the marketing and lead qualification. You focus on what you do best:
            delivering extraordinary weddings.
          </p>
          <a href="#apply" className="btn btn-primary">
            Apply to Join
          </a>
        </div>

        {/* Benefits */}
        <div
          style={{
            padding: "80px 24px",
            background: "var(--parchment)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <p className="section-label" style={{ textAlign: "center", marginBottom: "8px" }}>
              Why Join
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                color: "var(--charcoal)",
                textAlign: "center",
                marginBottom: "64px",
              }}
            >
              Everything You Get
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "40px",
              }}
            >
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  style={{
                    padding: "32px",
                    background: "var(--warm-white)",
                    border: "1px solid rgba(201,168,76,0.15)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      color: "var(--charcoal)",
                      marginBottom: "12px",
                    }}
                  >
                    {b.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commission Section */}
        <div
          style={{
            padding: "80px 24px",
            background: "var(--charcoal)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.72rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "16px",
            }}
          >
            Simple, Fair Pricing
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "var(--warm-white)",
              marginBottom: "20px",
            }}
          >
            25% Commission.
            <br />
            Only When You Earn.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "rgba(248,244,236,0.65)",
              maxWidth: "480px",
              margin: "0 auto 40px",
              lineHeight: 1.8,
            }}
          >
            We take 25% of the confirmed planning fee only when we successfully place a client with you.
            No upfront cost. No monthly fee. No hidden charges.
          </p>
          <div
            style={{
              display: "inline-block",
              padding: "32px 48px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(201,168,76,0.3)",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--cream)",
                marginBottom: "12px",
              }}
            >
              Example: A couple books your full planning service at £12,000
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "40px" }}>
                <span style={{ fontFamily: "var(--font-body)", color: "rgba(248,244,236,0.5)" }}>
                  Your fee
                </span>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}>£12,000</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "40px" }}>
                <span style={{ fontFamily: "var(--font-body)", color: "rgba(248,244,236,0.5)" }}>
                  Luminary commission (25%)
                </span>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--gold)" }}>−£3,000</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "40px",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <span style={{ fontFamily: "var(--font-body)", color: "var(--cream)" }}>
                  You receive
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--warm-white)" }}>
                  £9,000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply" style={{ padding: "80px 24px 120px", background: "var(--warm-white)" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <p className="section-label" style={{ marginBottom: "8px" }}>
              Apply to Join
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                color: "var(--charcoal)",
                marginBottom: "12px",
              }}
            >
              We Review Every Application Personally
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--text-muted)",
                marginBottom: "48px",
              }}
            >
              We're selective. We only work with planners we'd trust with our own weddings.
              Fill in the form below and we'll be in touch within 48 hours.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div>
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  name="name"
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
                  className="form-input"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
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
                  className="form-input"
                  placeholder="+44..."
                />
              </div>
              <div>
                <label className="form-label">Website</label>
                <input
                  type="url"
                  name="website"
                  className="form-input"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="form-label">Instagram Handle</label>
                <input
                  type="text"
                  name="instagram"
                  className="form-input"
                  placeholder="@yourbusiness"
                />
              </div>
              <div>
                <label className="form-label">Primary Region *</label>
                <select name="region" required className="form-input">
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
                <select name="price_range" required className="form-input">
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
                  required
                  className="form-input"
                  rows={4}
                  placeholder="Describe your style, specialities, and what makes your planning approach unique..."
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: "center", marginTop: "8px" }}>
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}