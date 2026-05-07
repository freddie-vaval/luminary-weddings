export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <p className="section-label">How It Works</p>
        <h2 className="section-title">Three Steps to Your Perfect Planner</h2>
        <p className="section-sub">
          We handle the search. You enjoy the planning.
        </p>

        <div className="steps-grid">
          <div className="step">
            <p className="step-number">01</p>
            <div className="step-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16 24h16M16 18h12M16 30h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Tell Us Your Vision</h3>
            <p>
              Share your wedding date, location, guest count, and style through our quick enquiry form.
              We&apos;ll take it from there.
            </p>
          </div>

          <div className="step">
            <p className="step-number">02</p>
            <div className="step-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M24 14v10l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>We Match You</h3>
            <p>
              Our team personally reviews every enquiry and matches you with the planner whose
              expertise, style, and availability align perfectly with your day.
            </p>
          </div>

          <div className="step">
            <p className="step-number">03</p>
            <div className="step-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 6l5.5 11.5H42l-11 8.5 4 12L24 29l-11 9 4-12-11-8.5h12.5L24 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Unforgettable Day</h3>
            <p>
              Your planner takes it from there. We stay connected throughout to ensure every
              placement runs smoothly and fairly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}