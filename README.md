# Luminary Weddings

A curated marketplace connecting couples with the UK's most exceptional wedding planners.

**Live:** [luminaryweddings.com](https://luminaryweddings.com) _(deploy in progress)_

---

## Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 14 (App Router, TypeScript) |
| Hosting | Vercel |
| Database | Supabase (Postgres) |
| Forms | Tally |
| Email | Resend |
| Payments | Stripe Connect |
| Images | Cloudinary |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Fill in your Supabase, Resend, Stripe, and Tally credentials

# 3. Run database migration
# Copy SUPABASE-SCHEMA.sql into your Supabase dashboard → SQL Editor → Run

# 4. Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  page.tsx              # Landing page
  planners/page.tsx     # Planners listing
  how-it-works/page.tsx # How It Works page
  for-planners/page.tsx # Planner application form
  sitemap.ts            # SEO sitemap
  api/tally-webhook/    # Form submission handler

components/
  Navigation.tsx
  Hero.tsx
  HowItWorks.tsx
  PlannersGrid.tsx
  PlannersFilter.tsx   # Client-side filterable grid
  Testimonials.tsx
  CTASection.tsx
  Footer.tsx
  TallyForm.tsx

lib/
  supabase.ts           # Supabase client

SUPABASE-SCHEMA.sql     # Run this in Supabase dashboard
```

---

## Deploy to Vercel

```bash
# Push to GitHub, then:
# 1. Go to vercel.com → Import Project
# 2. Select your repo
# 3. Add environment variables from .env.local.example
# 4. Deploy
```

---

## TODO

- [ ] Connect Supabase (fill in env vars, uncomment DB insert in API route)
- [ ] Create Tally form and add form ID to `components/CTASection.tsx`
- [ ] Set up Resend email for enquiry confirmation
- [ ] Add planner photos to `components/PlannersFilter.tsx` (from scraped data)
- [ ] Connect Stripe Connect for commission tracking
- [ ] Build planner dashboard (`/dashboard`)
- [ ] Add planner authentication via Supabase Auth
- [ ] Add OG image to `public/og-image.jpg`

---

## Commission Model

We take **25%** of the confirmed planning fee from the planner — not from the couple.

```
Planning fee: £12,000
Luminary Weddings: £3,000 (25%)
Planner receives: £9,000
```

Couples pay the planner directly. We invoice the planner separately.

---

_Luminary Weddings — The UK's Most Exceptional Wedding Planners. Curated For You._