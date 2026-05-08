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
    destinationServices: false,
    destinationCountries: [],
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
    destinationServices: false,
    destinationCountries: [],
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
    destinationServices: true,
    destinationCountries: ["Scotland", "France", "Italy"],
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
    destinationServices: true,
    destinationCountries: ["Italy", "France", "Greece"],
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
    destinationServices: false,
    destinationCountries: [],
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
    destinationServices: true,
    destinationCountries: ["India", "Sri Lanka", "Dubai"],
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
    destinationServices: false,
    destinationCountries: [],
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
    destinationServices: true,
    destinationCountries: ["France", "Spain", "Portugal"],
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
    destinationServices: false,
    destinationCountries: [],
  },
];

const REGIONS = ["All Regions", "London", "Cotswolds", "Scotland", "Cornwall", "Yorkshire", "Lake District"];
const STYLES = ["All Styles", "Luxury", "Modern", "Bohemian", "Classic", "Minimalist", "Destination", "Cultural"];
const DESTINATIONS = [
  "All Destinations",
  "France",
  "Italy",
  "Greece",
  "Spain",
  "Portugal",
  "Scotland",
  "India",
  "Sri Lanka",
  "Dubai",
];

export default function PlannersFilter() {
  const [region, setRegion] = useState("All Regions");
  const [style, setStyle] = useState("All Styles");
  const [destination, setDestination] = useState("All Destinations");
  const [showAvailable, setShowAvailable] = useState(false);
  const [destinationOnly, setDestinationOnly] = useState(false);

  const filtered = ALL_PLANNERS.filter((p) => {
    const regionMatch = region === "All Regions" || p.region === region;
    const styleMatch =
      style === "All Styles" ||
      p.style.some((s) => s.toLowerCase().includes(style.toLowerCase()));
    const availMatch = !showAvailable || p.availability === "available";
    const destMatch =
      destinationOnly
        ? p.destinationServices
        : destination === "All Destinations" ||
          p.destinationCountries.includes(destination);
    return regionMatch && styleMatch && availMatch && destMatch;
  });

  const destinationPlanners = ALL_PLANNERS.filter((p) => p.destinationServices);

  return (
    <div>
      {/* Destination Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRadius: "4px",
          padding: "32px 40px",
          marginBottom: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.8)",
              marginBottom: "8px",
            }}
          >
            Dream Destination
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: "#fff",
              marginBottom: "8px",
            }}
          >
            European Wedding Destinations
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "480px",
            }}
          >
            From Tuscan villas to Provençal châteaux — our planners coordinate weddings across Europe and beyond.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["France", "Italy", "Greece", "Spain", "Portugal"].map((d) => (
            <span
              key={d}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "8px 16px",
                border: "1px solid rgba(201,168,76,0.4)",
                color: "rgba(201,168,76,0.9)",
                borderRadius: "2px",
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
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
              width: "100%",
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
              width: "100%",
              cursor: "pointer",
            }}
          >
            {STYLES.map((s) => (
              <option key={s}>{s}</option>
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
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              if (e.target.value !== "All Destinations") setDestinationOnly(false);
            }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              padding: "10px 16px",
              border: "1px solid rgba(201,168,76,0.3)",
              background: "var(--parchment)",
              color: "var(--charcoal)",
              width: "100%",
              cursor: "pointer",
            }}
          >
            {DESTINATIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
              checked={destinationOnly}
              onChange={(e) => {
                setDestinationOnly(e.target.checked);
                if (e.target.checked) setDestination("All Destinations");
              }}
              style={{ accentColor: "var(--gold)", width: "16px", height: "16px" }}
            />
            Destination specialists only
          </label>
        </div>

        <div
          style={{
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
                position: "relative",
              }}
            >
              {planner.name.split(" ").map((n) => n[0]).join("")}
              {planner.destinationServices && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(201, 168, 76, 0.9)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "5px 10px",
                    borderRadius: "2px",
                  }}
                >
                  Destination
                </div>
              )}
            </div>
            <div className="planner-card-body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
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

              {/* Destination countries */}
              {planner.destinationServices && planner.destinationCountries.length > 0 && (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                  {planner.destinationCountries.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        background: "rgba(26,26,46,0.06)",
                        color: "rgba(26,26,46,0.7)",
                        borderRadius: "2px",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
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
