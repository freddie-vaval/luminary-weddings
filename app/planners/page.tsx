import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PlannersFilter from "@/components/PlannersFilter";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Planners — Luminary Weddings",
  description:
    "Browse our curated network of exceptional UK wedding planners. Filter by region, style, and destination — including Italy, France, Greece, Spain, and beyond.",
};

export default function PlannersPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "100px" }}>
        <div className="container" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
          <p className="section-label">Our Network</p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "var(--charcoal)",
              marginBottom: "12px",
            }}
          >
            Meet Our Planners
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              maxWidth: "520px",
              marginBottom: "48px",
            }}
          >
            Every planner in our network has been personally reviewed. They're the best at what they do — and we match you with the one who's right for your vision.
          </p>

          <PlannersFilter />
        </div>
      </main>
      <Footer />
    </>
  );
}
