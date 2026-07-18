import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import "./redesign.css";

export const metadata: Metadata = {
  title: "Private Wedding Planner Matchmaking | Luminary Weddings",
  description:
    "A considered shortlist of exceptional wedding planners for UK and destination celebrations, selected around your vision, location and budget.",
  robots: { index: false, follow: false },
};

const destinations = ["United Kingdom", "Italy", "Spain", "Greece", "France", "Portugal"];

export default function RedesignPreviewPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Luminary Weddings private planner matchmaking",
    provider: { "@type": "Organization", name: "Luminary Weddings" },
    areaServed: destinations,
    description:
      "Private wedding planner matchmaking for UK and destination celebrations.",
    url: "https://luminaryweddings.com",
  };

  return (
    <div className="lw-preview">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="lw-header">
        <Link href="/redesign-preview" className="lw-wordmark" aria-label="Luminary Weddings home">
          <span>Luminary</span>
          <small>Weddings</small>
        </Link>
        <nav className="lw-nav" aria-label="Preview navigation">
          <a href="#approach">Our approach</a>
          <a href="#destinations">Destinations</a>
          <a href="#planners">For planners</a>
        </nav>
        <a className="lw-header-cta" href="#enquiry">Request a shortlist</a>
      </header>

      <main>
        <section className="lw-hero">
          <div className="lw-hero-copy">
            <p className="lw-kicker">Private planner matchmaking · UK &amp; destination weddings</p>
            <h1>The right planner changes everything.</h1>
            <p className="lw-lede">
              Tell us how you want your wedding to feel. We privately introduce a considered
              shortlist of planners suited to your vision, location, scale and budget.
            </p>
            <div className="lw-actions">
              <a className="lw-button lw-button-primary" href="#enquiry">Request your shortlist</a>
              <a className="lw-text-link" href="#approach">See how it works <span>↘</span></a>
            </div>
            <p className="lw-fineprint">Personal review. No public directory. No fee to couples from Luminary.</p>
          </div>
          <div className="lw-hero-art" aria-hidden="true">
            <div className="lw-arch lw-arch-one" />
            <div className="lw-arch lw-arch-two" />
            <div className="lw-monogram">L</div>
            <p>Celebrations<br />with a point<br />of view</p>
          </div>
        </section>

        <section className="lw-proofline" aria-label="Service qualities">
          <span>Human curation</span><i />
          <span>Private introductions</span><i />
          <span>UK &amp; Europe</span><i />
          <span>Planner-led expertise</span>
        </section>

        <section className="lw-editorial" id="approach">
          <div>
            <p className="lw-kicker">A better way to find your planner</p>
            <h2>Not another wedding directory.</h2>
          </div>
          <div className="lw-editorial-copy">
            <p>
              Endless profiles make an important decision harder. Luminary begins with your
              priorities, then considers which planners genuinely fit the brief.
            </p>
            <p>
              The result is a small, private shortlist you can understand and act on—not a feed
              of paid listings.
            </p>
          </div>
        </section>

        <section className="lw-process">
          <article>
            <span>01</span>
            <h3>Share the brief</h3>
            <p>Your date, destination, guest count, budget and the atmosphere you want to create.</p>
          </article>
          <article>
            <span>02</span>
            <h3>We consider the fit</h3>
            <p>We review the brief personally and identify planners whose work and availability align.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Meet your shortlist</h3>
            <p>Receive two or three considered introductions, then choose who you want to speak with.</p>
          </article>
        </section>

        <section className="lw-destinations" id="destinations">
          <div className="lw-destination-art" aria-hidden="true">
            <span>UK</span><span>EU</span>
          </div>
          <div>
            <p className="lw-kicker">Places worth gathering for</p>
            <h2>At home or away.</h2>
            <p>
              We are forming a founding network for exceptional celebrations across Britain and
              Europe, with destination knowledge treated as essential—not decorative.
            </p>
            <ul>
              {destinations.map((destination) => <li key={destination}>{destination}</li>)}
            </ul>
          </div>
        </section>

        <section className="lw-planners" id="planners">
          <div>
            <p className="lw-kicker">For established planners</p>
            <h2>A selective source of well-matched enquiries.</h2>
          </div>
          <div>
            <p>
              Luminary is inviting a small founding group of planners with a distinctive body of
              work, clear minimum fees and proven experience in the destinations they serve.
            </p>
            <p>
              The proposed partnership is success-based: no listing subscription, with Luminary
              earning only when an introduced couple confirms a paid planning engagement. Final
              founding terms will be agreed with the working group before launch.
            </p>
            <Link className="lw-button lw-button-light" href="/for-planners">Register founding interest</Link>
          </div>
        </section>

        <section className="lw-enquiry" id="enquiry">
          <div className="lw-enquiry-intro">
            <p className="lw-kicker">Begin with the essentials</p>
            <h2>Request your private shortlist.</h2>
            <p>
              Share what you know so far. A real person will review it before any introduction is made.
            </p>
          </div>
          <div className="lw-form-shell">
            <EnquiryForm />
          </div>
        </section>
      </main>

      <footer className="lw-footer">
        <div className="lw-wordmark lw-wordmark-footer"><span>Luminary</span><small>Weddings</small></div>
        <p>Private planner matchmaking for considered celebrations.</p>
        <div><a href="mailto:hello@luminaryweddings.com">hello@luminaryweddings.com</a><span>© {new Date().getFullYear()}</span></div>
      </footer>
    </div>
  );
}
