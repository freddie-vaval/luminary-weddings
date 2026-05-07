import Image from "next/image";
import Link from "next/link";

const PLANNERS = [
  {
    id: "1",
    name: "Charlotte Ashford",
    company: "Ashford & Co.",
    region: "Cotswolds",
    style: ["Luxury", "Classic"],
    bio: "Specialising in English country estate weddings with impeccable attention to detail.",
    image: "",
  },
  {
    id: "2",
    name: "James Worthington",
    company: "Worthington Events",
    region: "London",
    style: ["Modern", "Editorial"],
    bio: "Award-winning planner known for architectural precision and contemporary luxury.",
    image: "",
  },
  {
    id: "3",
    name: "Isla Drummond",
    company: "Drummond Collective",
    region: "Scotland",
    style: ["Bohemian", "Destination"],
    bio: "Transforming castles, glens, and estates into extraordinary celebrations since 2012.",
    image: "",
  },
  {
    id: "4",
    name: "Sofia Marchetti",
    company: "Marchetti Luxe",
    region: "London",
    style: ["Italian", "Fine Dining"],
    bio: "Italian-British planner bringing European elegance and culinary excellence to every wedding.",
    image: "",
  },
  {
    id: "5",
    name: "Oliver Reed",
    company: "Reed & Stone",
    region: "Cornwall",
    style: ["Coastal", "Festival"],
    bio: "Celebrating Cornwall's wild beauty with ocean-view celebrations and festival-inspired design.",
    image: "",
  },
  {
    id: "6",
    name: "Priya Sharma",
    company: "Kensington Weddings",
    region: "London",
    style: ["Minimalist", "Cultural"],
    bio: "Creating breathtakingly minimal weddings with deep cultural nuance and personal meaning.",
    image: "",
  },
];

export default function PlannersGrid() {
  return (
    <section className="our-planners" id="planners">
      <div className="container">
        <p className="section-label">Our Network</p>
        <h2 className="section-title">Meet Our Planners</h2>
        <p className="section-sub">
          A curated selection of the UK&apos;s most talented wedding planners.
        </p>
      </div>

      <div className="container">
        <div className="planners-grid">
          {PLANNERS.map((planner) => (
            <div className="planner-card" key={planner.id}>
              <div
                className="planner-card-img"
                style={{
                  background:
                    "linear-gradient(135deg, #F8F4EC 0%, #C9A84C33 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  color: "var(--gold)",
                }}
              >
                {planner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="planner-card-body">
                <h3>{planner.name}</h3>
                <p className="planner-company">{planner.company}</p>
                <span className="planner-region">{planner.region}</span>
                <p>{planner.bio}</p>
                <div className="planner-tags">
                  {planner.style.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}