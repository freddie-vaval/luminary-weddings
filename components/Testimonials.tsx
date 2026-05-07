export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <p className="section-label">From Our Couples</p>
        <h2 className="section-title">Words From Couples We&apos;ve Matched</h2>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-quote">
              &ldquo;Luminary Weddings found us the most extraordinary planner in the Cotswolds.
              Without them, we would never have known she existed. Our wedding was absolutely perfect.&rdquo;
            </p>
            <p className="testimonial-author">Emma & James — Cotswolds, 2024</p>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              &ldquo;The process was completely seamless. We filled in one form and within 48 hours
              had three perfect options. The hard work was done for us.&rdquo;
            </p>
            <p className="testimonial-author">Sophie & Thomas — London, 2024</p>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              &ldquo;We had a very specific vision — a Japanese-British fusion wedding in Scotland.
              Luminary matched us with a planner who absolutely got it. Incredible.&rdquo;
            </p>
            <p className="testimonial-author">Yuki & Robert — Scottish Borders, 2023</p>
          </div>
        </div>
      </div>
    </section>
  );
}