"use client";

import { useState } from "react";

const ALL_PLANNERS = [
  {
    id: "1",
    name: "Charlotte Ashford",
    company: "Ashford & Co.",
    region: "Cotswolds",
    location: "Cheltenham",
    style: ["Luxury", "Classic", "English Country"],
    priceRange: "£15k–£30k",
    bio: "Specialising in English country estate weddings with impeccable attention to detail. Over 200 weddings across the Cotswolds and Home Counties.",
    availability: "available",
    image: "",
    email: "charlotte@ashfordandco.co.uk",
  },
  {
    id: "2",
    name: "James Worthington",
    company: "Worthington Events",
    region: "London",
    location: "Chelsea",
    style: ["Modern", "Editorial", "Minimalist"],
    priceRange: "£25k–£75k",
    bio: "Award-winning planner known for architectural precision and contemporary luxury. Featured in Vogue, Harper's Bazaar, and Brides Magazine.",
    availability: "available",
    image: "",
    email: "james@worthingtonevents.com",
  },
  {
    id: "3",
    name: "Isla Drummond",
    company: "Drummond Collective",
    region: "Scotland",
    location: "Edinburgh",
    style: ["Destination", "Castle", "Bohemian"],
    priceRange: "£20k–£60k",
    bio: "Transforming castles, glens, and estates into extraordinary celebrations since 2012. Deep expertise in Scottish castle and manor weddings.",
    availability: "busy",
    image: "",
    email: "isla@drummondcollective.com",
  },
  {
    id: "4",
    name: "Sofia Marchetti",
    company: "Marchetti Luxe",
    region: "London",
    location: "Mayfair",
    style: ["Italian", "Fine Dining", "Elegant"],
    priceRange: "£30k–£100k",
    bio: "Italian-British planner bringing European elegance and culinary excellence. Known for exceptional stationery and bespoke design.",
    availability: "available",
    image: "",
    email: "sofia@marchettiluxe.com",
  },
  {
    id: "5",
    name: "Oliver Reed",
    company: "Reed & Stone",
    region: "Cornwall",
    location: "Fowey",
    style: ["Coastal", "Festival", "Bohemian"],
    priceRange: "£12k–£35k",
    bio: "Celebrating Cornwall's wild beauty with ocean-view celebrations and festival-inspired design. Perfect for couples who want something completely different.",
    availability: "available",
    image: "",
    email: "oliver@reedandstone.co.uk",
  },
  {
    id: "6",
    name: "Priya Sharma",
    company: "Kensington Weddings",
    region: "London",
    location: "Kensington",
    style: ["Minimalist", "Cultural", "Modern"],
    priceRange: "£20k–£80k",
    bio: "Creating breathtakingly minimal weddings with deep cultural nuance and personal meaning. Specialist in fusion and multi-cultural celebrations.",
    availability: "available",
    image: "",
    email: "priya@kensingtonweddings.com",
  },
  {
    id: "7",
    name: "Alexandra Vane",
    company: "Vane & Co.",
    region: "Yorkshire",
    location: "York",
    style: ["Rural", "Classic", "Garden"],
    priceRange: "£10k–£25k",
    bio: "Yorkshire's leading luxury wedding planner. Specialising in manor houses, barn weddings, and romantic countryside celebrations.",
    availability: "available",
    image: "",
    email: "alexandra@vaneandco.com",
  },
  {
    id: "8",
    name: "Thomas Whitmore",
    company: "Whitmore Affairs",
    region: "Cotswolds",
    location: "Stratford-upon-Avon",
    style: ["Luxury", "Historic", "Formal"],
    priceRange: "£25k–£90k",
    bio: "Former theatre director turned wedding planner. Creates grand, cinematic celebrations in historic venues across the Heart of England.",
    availability: "busy",
    image: "",
    email: "thomas@whitmoreaffairs.com",
  },
  {
    id: "9",
    name: "Camille Beaumont",
    company: "Beaumont Events",
    region: "Lake District",
    location: "Windermere",
    style: ["Romantic", "Lakefront", "Intimate"],
    priceRange: "£15k–£40k",
    bio: "Lake District specialist creating romantic, breathtaking celebrations by the water. Intimate luxury for up to 150 guests.",
    availability: "available",
    image: "",
    email: "camille@beaumontevents.co.uk",
  },
];

const REGIONS = ["All Regions", "London", "Cotswolds", "Scotland", "Cornwall", "Yorkshire", "Lake District"];
const STYLES = ["All Styles", "Luxury", "Modern", "Bohemian", "Classic", "Minimalist", "Destination", "Cultural"];

export default function PlannersFilter() {
  const [region, setRegion] = useState("All Regions");
  const [style, setStyle] = useState("All Styles");
  const [showAvailable, setShowAvailable] = useState(false);

  const filtered = ALL_PLANNERS.filter((p) => {
    const regionMatch = region === "All Regions" || p.region === region;
    const styleMatch =
      style === "All Styles" || p.style.some((s) => s.toLowerCase().includes(style.toLowerCase()));
    const availMatch = !showAvailable || p.availability === "available";
    return regionMatch && styleMatch && availMatch;
  });

  return (
    <div>
      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "40px",
          padding: "24px",
          background: "var(--warm-white)",
          border: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div>
          <label
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              padding: "10px 16px",
              border: "1px solid rgba(201,168,76,0.3)",
              background: "var(--parchment)",
              color: "var(--charcoal)",
              minWidth: "160px",
              cursor: "pointer",
            }}
          >
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              padding: "10px 16px",
              border: "1px solid rgba(201,168,76,0.3)",
              background: "var(--parchment)",
              color: "var(--charcoal)",
              minWidth: "160px",
              cursor: "pointer",
            }}
          >
            {STYLES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-display)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--charcoal)",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={showAvailable}
              onChange={(e) => setShowAvailable(e.target.checked)}
              style={{ accentColor: "var(--gold)", width: "16px", height: "16px" }}
            />
            Available only
          </label>
        </div>

        <div
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-display)",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "10px",
          }}
        >
          {filtered.length} planner{filtered.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Grid */}
      <div className="planners-grid">
        {filtered.map((planner) => (
          <div className="planner-card" key={planner.id}>
            <div
              className="planner-card-img"
              style={{
                background: "linear-gradient(135deg, #F8F4EC 0%, #C9A84C33 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                color: "var(--gold)",
                aspectRatio: "4/3",
              }}
            >
              {planner.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="planner-card-body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "4px" }}>
                    {planner.name}
                  </h3>
                  <p className="planner-company">{planner.company}</p>
                </div>
                {planner.availability === "busy" && (
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      background: "rgba(201,168,76,0.1)",
                      color: "var(--gold)",
                      border: "1px solid rgba(201,168,76,0.3)",
                    }}
                  >
                    Waitlist Only
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "12px 0" }}>
                <span className="planner-region">{planner.region}</span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                  }}
                >
                  {planner.location}
                </span>
              </div>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "16px" }}>{planner.bio}</p>
              <div className="planner-tags">
                {planner.style.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(201,168,76,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)",
                  }}
                >
                  Typical fee: {planner.priceRange}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px",
            background: "var(--warm-white)",
            border: "1px solid rgba(201,168,76,0.15)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              color: "var(--charcoal)",
              marginBottom: "12px",
            }}
          >
            No planners match your filters
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>
            Try adjusting your filters or{" "}
            <a href="#enquiry" style={{ color: "var(--gold)", textDecoration: "underline" }}>
              submit an enquiry
            </a>{" "}
            and we'll find the right person for you.
          </p>
        </div>
      )}
    </div>
  );
}