# SEO + AEO Strategy — Luminary Weddings

## Position: "Answer Engine Optimization"

Search is shifting. Google's AI Overviews answer questions directly before you click anything.
Bing Copilot, Perplexity, Apple's AI answers. We need to own the answer — not just the blue link.

---

## 1. Technical SEO Foundation

### Core Pages & Metadata

| Page | Title | Meta Description | H1 |
|---|---|---|---|
| Home | "Luxury Wedding Planners UK — Curated For You \| Luminary Weddings" | "Be matched with the UK's most exceptional wedding planners. 25% commission only when you're placed. Enquire free." | "The UK's Most Exceptional Wedding Planners" |
| /planners | "Browse UK Wedding Planners — Luminary Weddings" | "Discover vetted luxury wedding planners across London, Cotswolds, Scotland, Cornwall and beyond." | "Our Curated Planner Network" |
| /how-it-works | "How It Works — Luminary Weddings" | "Three steps to finding your perfect luxury wedding planner. Free to enquire, commission only on placement." | "Three Steps to Your Perfect Planner" |
| /for-planners | "Join The Network — Luminary Weddings" | "UK wedding planners: receive qualified enquiries with zero upfront cost. 25% commission only when you earn." | "We Market. We Match. You Deliver." |

### Schema Markup (JSON-LD)

Add to every page:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Luminary Weddings",
  "description": "Curated marketplace connecting couples with UK luxury wedding planners",
  "url": "https://luminaryweddings.com",
  "areaServed": "United Kingdom",
  "serviceType": "Wedding Planning"
}
```

Add to homepage:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Luminary Weddings",
  "url": "https://luminaryweddings.com",
  "logo": "https://luminaryweddings.com/logo.png",
  "sameAs": [
    "https://instagram.com/luminaryweddings"
  ]
}
```

Add FAQ schema to /how-it-works:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Luminary Weddings work?",
      "answer": "Tell us about your wedding vision, and we'll match you with 2-3 curated planners. We make the introduction. The planner works directly with you. We take 25% commission from the planner — never from you."
    },
    {
      "@type": "Question", 
      "name": "How much does a wedding planner cost?",
      "answer": "Full planning services in the UK typically range from £3,000 to £75,000+ depending on complexity, location, and the planner's experience. We work with planners across all budgets."
    }
  ]
}
```

Add LocalBusiness schema to homepage:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Luminary Weddings",
  "description": "UK luxury wedding planner marketplace",
  "areaServed": { "@type": "Country", "name": "United Kingdom" }
}
```

---

## 2. AEO — Answer Engine Optimization

### What Is AEO?
Optimizing content to be pulled into AI answers (Google AI Overviews, Bing Copilot, Perplexity, ChatGPT). AI reads structured, direct-answer content.

### AEO Target Queries (Questions We Want To OWN)

| Query | Target Answer | Page |
|---|---|---|
| "how does a wedding planner marketplace work?" | Direct 2-sentence explanation | /how-it-works |
| "what does a wedding planner cost UK?" | FAQ answer, price ranges, what affects cost | /how-it-works |
| "how to find a good wedding planner UK" | Our matching process + why we're different | /how-it-works |
| "is a wedding planner worth it?" | Balanced answer + our commission model | /how-it-works |
| "what questions to ask a wedding planner?" | 15-question list | /how-it-works |
| "best wedding planners near me UK" | We match based on region — our process | /how-it-works |
| "wedding planner commission structure UK" | 25% from planner only, transparent | /for-planners |
| "how to become a wedding planner UK" | Not our audience — don't chase | — |

### How We Win The Answer

**Structure content for AI consumption:**
- Every page has a clear, direct answer to the H1 question in the first 50 words
- Use `<h2>` headings that are full questions or phrases AI can extract
- Bulleted lists for numbered facts AI can cite
- FAQ sections with short, complete-sentence answers (not fragments)
- Never: "It depends" without following up with "Here's generally what X looks like..."

**Example — /how-it-works AEO hook:**
```
H1: Three Steps to Your Perfect Planner
First paragraph: "Luminary Weddings matches engaged couples with vetted UK wedding planners in three steps: share your vision, receive a curated shortlist, and meet your planner — all at no upfront cost to you."
```

This is AI-readable. AI pulls it. AI cites it. We get the traffic.

---

## 3. Content Cluster Strategy

Build topical authority around "wedding planning UK" cluster:

### Cluster Pages to Build

1. **/guides/wedding-planner-cost-uk** (Pillar page)
   - Full guide: price ranges, what's included, how to budget
   - Internal links to /how-it-works, /planners

2. **/guides/questions-to-ask-wedding-planner**
   - 20+ questions every couple should ask
   - Link to /how-it-works

3. **/guides/destination-wedding-uk**
   - Top UK wedding destinations (Cotswolds, Cornwall, Scotland, Lake District)
   - Links to relevant planners

4. **/guides/wedding-planner-vs-coordinator**
   - What's the difference, when do you need each?

5. **/blog/** (Shopify blog — if using Shopify, or Next.js blog)
   - Monthly 800-word SEO blog posts

### Interlinking Map
```
Home
├── /how-it-works
├── /planners
├── /for-planners
├── /guides/wedding-planner-cost-uk
│   └── links to: /how-it-works, /planners, /guides/destination-wedding-uk
├── /guides/questions-to-ask-wedding-planner
│   └── links to: /how-it-works, /planners
└── /guides/destination-wedding-uk
    └── links to: /planners (by region)
```

---

## 4. Local SEO (For Planner Pages)

Each planner profile page should target their region:
- `/planners/charlotte-ashford` → targets "wedding planner London"
- `/planners/isla-drummond` → targets "wedding planner Cotswolds"

Schema for each planner:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Charlotte Ashford",
  "jobTitle": "Wedding Planner",
  "areaServed": "London, United Kingdom",
  "url": "https://luminaryweddings.com/planners/charlotte-ashford"
}
```

---

## 5. On-Page SEO Checklist

- [ ] All images have descriptive `alt` text
- [ ] All internal links use descriptive anchor text (not "click here")
- [ ] Page speed: LCP < 2.5s (use Cloudinary for image optimization)
- [ ] Canonical tags on all pages
- [ ] XML sitemap submitted to Google Search Console
- [ ] robots.txt allows all crawlers
- [ ] Core Web Vitals: green (LCP, FID, CLS)
- [ ] Mobile-first design (all pages)
- [ ] HTTPS (Vercel handles this)
- [ ] Structured data on every page (JSON-LD)
- [ ] Open Graph tags on every page
- [ ] Twitter card tags

---

## 6. Google Business Profile

Create GBP for Luminary Weddings:
- **Business name:** Luminary Weddings
- **Category:** Wedding Planner
- **Description:** Be matched with the UK's most exceptional wedding planners. Commission-based — we only earn when you are.
- **Website:** https://luminaryweddings.com
- **Areas served:** United Kingdom
- **Post regularly:** Weekly updates with wedding tips, planner spotlights

Posts calendar:
- Monday: Planner spotlight (photo + bio snippet)
- Wednesday: Wedding tip of the week
- Friday: "Know a couple getting married?" (share CTA)
- Sunday: "Planning a wedding in [region]?" (region targeting)

---

## 7. Keyword Map

### Couples (Search Intent)

| Keyword | Intent | Volume Est. |
|---|---|---|
| wedding planner UK | Informational/Commercial | High |
| luxury wedding planner London | Commercial | Medium |
| wedding planner near me | Local Commercial | High |
| how to find a wedding planner | Informational | Medium |
| wedding planner cost UK | Informational/Commercial | Medium |
| full service wedding planner | Commercial | Medium |
| destination wedding planner UK | Commercial | Low-Med |
| best wedding planners UK | Commercial | Medium |
| wedding planning service UK | Commercial | Medium |

### Planners (Search Intent)

| Keyword | Intent |
|---|---|
| wedding planner leads UK | Commercial |
| get wedding clients UK | Commercial |
| wedding planner marketing | Informational |
| how to get more wedding clients | Informational/Commercial |
| wedding planner commission platform | Commercial |

---

## 8. Quick Wins (Do in Week 1)

1. Submit sitemap to Google Search Console (when live)
2. Create GBP and post 3x this week
3. Add FAQ schema to /how-it-works
4. Add FAQ schema to /for-planners  
5. Create /guides/wedding-planner-cost-uk (800 words)
6. Create /guides/questions-to-ask-wedding-planner (1000 words)
7. Add alt text to all images
8. Check mobile speed on PageSpeed Insights

---

## 9. Progress Tracking

Track these monthly in a spreadsheet:

| Metric | Tool | Target |
|---|---|---|
| Organic sessions | Google Search Console | +20% MoM |
| Keywords ranking in top 20 | GSC | 50+ |
| AI overview impressions | GSC (if available) | Growing |
| Core Web Vitals | PageSpeed Insights | All Green |
| Backlinks | Ahrefs / SEMrush | 10 new/month |
| GBP stars + reviews | GBP | 5 reviews |

---

_Luminary Weddings — Dominate the answer, not just the link._