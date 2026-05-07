import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">The UK&apos;s Premier Wedding Planner Network</p>
        <h1>
          The UK&apos;s Most Exceptional
          <br />
          <em>Wedding Planners</em>.
          <br />
          Curated For You.
        </h1>
        <p className="hero-sub">
          From castle weddings in Scotland to vineyard ceremonies in the Cotswolds —
          we match you with the planner who&apos;ll make your vision extraordinary.
        </p>
        <div className="hero-actions">
          <a href="#enquiry" className="btn btn-primary">
            Start Your Journey
          </a>
          <a href="#planners" className="btn-ghost">
            Browse our planners ↓
          </a>
        </div>
      </div>
    </section>
  );
}