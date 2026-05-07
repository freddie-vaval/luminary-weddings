import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "How It Works — Luminary Weddings",
  description:
    "Three simple steps to finding your perfect luxury wedding planner. We handle the search, you enjoy the planning.",
};

const steps = [
  {
    number: "01",
    title: "Tell Us Your Vision",
    body: "Complete our quick enquiry form with your wedding date, location, guest count, budget range, and style notes. The whole process takes less than 3 minutes. Tell us what you're dreaming of — whether it's a castle in Scotland or a vineyard in the Cotswolds.",
    detail: "We review every enquiry personally. No algorithmic matching. No automated messages. A real person reads what you've shared.",
  },
  {
    number: "02",
    title: "We Match You",
    body: "Within 24 hours, our team reviews your enquiry and prepares a shortlist of 2-3 planners whose expertise, style, personality, and availability align with your vision. We call or email you to talk through the options.",
    detail: "All our planners have been personally reviewed and vetted. We only work with people we'd trust with our own weddings.",
  },
  {
    number: "03",
    title: "Your Planner Takes Over",
    body: "Once you choose a planner, we make the introduction. Your planner works directly with you on the creative direction, supplier selection, logistics, and all the details that make your day extraordinary. We stay connected to ensure everything runs smoothly.",
    detail: "We invoice the planner directly — you never pay Luminary Weddings a penny. Our commission comes from the planner, not from you.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "100px" }}>
        {/* Hero */}
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px 100px",
            background: "var(--warm-white)",
          }}
        >
          <p className="section-label">How It Works</p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "var(--charcoal)",
              maxWidth: "640px",
              margin: "0 auto 20px",
            }}
          >
            Three Steps to Your Perfect Planner
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            We handle the search. You enjoy the planning.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "80px 24px",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              style={{
                display: "flex",
                gap: "48px",
                paddingBottom: "64px",
                marginBottom: "64px",
                borderBottom: i < steps.length - 1 ? "1px solid rgba(201,168,76,0.15)" : "none",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "3.5rem",
                  color: "rgba(201,168,76,0.2)",
                  lineHeight: 1,
                  paddingTop: "4px",
                }}
              >
                {step.number}
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    color: "var(--charcoal)",
                    marginBottom: "16px",
                  }}
                >
                  {step.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.05rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.8,
                    marginBottom: "20px",
                  }}
                >
                  {step.body}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "var(--gold)",
                    fontStyle: "italic",
                    paddingLeft: "16px",
                    borderLeft: "2px solid rgba(201,168,76,0.3)",
                  }}
                >
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px 120px",
            background: "var(--cream)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "var(--charcoal)",
              marginBottom: "16px",
            }}
          >
            Ready to Find Your Planner?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "var(--text-muted)",
              marginBottom: "36px",
            }}
          >
            Takes 3 minutes. We'll be in touch within 24 hours.
          </p>
          <a href="#enquiry" className="btn btn-primary">
            Start Your Journey
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}