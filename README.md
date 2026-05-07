# Luminary Weddings

**Live:** https://luminaryweddings.com _(deploy in progress)_

A curated marketplace connecting couples with the UK's most exceptional wedding planners.
Commission: **25%** — taken from the planner on confirmed bookings only. Couples pay planners directly.

---

## What We Built

| Page | File | Status |
|---|---|---|
| Landing page | `app/page.tsx` | ✅ |
| Planners listing + filters | `app/planners/page.tsx` | ✅ |
| How It Works | `app/how-it-works/page.tsx` | ✅ |
| For Planners (application form) | `app/for-planners/page.tsx` | ✅ |
| Planner dashboard | `app/dashboard/page.tsx` | ✅ |
| Stripe commission payment | `app/api/create-payment-intent/route.ts` | ✅ |
| Stripe webhook | `app/api/webhook/stripe/route.ts` | ✅ |
| Tally webhook | `app/api/tally-webhook/route.ts` | ✅ |
| SEO sitemap | `app/sitemap.ts` | ✅ |
| Commission estimator | Built into `/for-planners` | ✅ |
| Facebook + Google Ads strategy | `FACEBOOK-GOOGLE-AD-SETUP.md` | ✅ |
| SEO + AEO strategy | `SEO-AEO-STRATEGY.md` | ✅ |
| Planner outreach sequence | `PLANNER-OUTREACH.md` | ✅ |
| Supabase schema | `SUPABASE-SCHEMA.sql` | ✅ |

---

## Commission Model

```
Couple books planner for: £12,000
Luminary Weddings (25%): £3,000  ← paid by planner
Planner receives: £9,000           ← paid directly by couple
```

Couples pay planners directly. We invoice the planner via Stripe after booking confirmation.

---

## Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 14 (App Router, TypeScript) |
| Hosting | Vercel |
| Database | Supabase |
| Forms | Tally |
| Email | Resend |
| Payments | Stripe |
| Images | Unsplash + real planner photos (scraped) |

---

## Setup

```bash
# 1. Install
npm install

# 2. Environment variables
cp .env.local.example .env.local
# Fill in all keys (see below)

# 3. Push Supabase schema
# Copy SUPABASE-SCHEMA.sql → Supabase dashboard → SQL Editor → Run

# 4. Create Tally form → get form ID → replace rXXXXX in:
#    components/CTASection.tsx (formId prop)
#    app/api/tally-webhook/route.ts (formId check if needed)

# 5. Run locally
npm run dev
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=           # sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=       # whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # pk_live_... or pk_test_...

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://luminaryweddings.com
```

---

## Deploy to Vercel

```bash
# Push to GitHub (already done)
gh repo view freddie-vaval/luminary-weddings

# 1. Go to vercel.com → Import Project → select luminary-weddings repo
# 2. Framework: Next.js (auto-detected)
# 3. Add environment variables from .env.local
# 4. Deploy

# Custom domain: buy luminaryweddings.com → Vercel → Domains → Add
```

---

## To-Do Before Launch

- [ ] Create Tally enquiry form (tally.so) → get form ID
- [ ] Connect Supabase → run schema SQL
- [ ] Add Stripe keys to Vercel env vars
- [ ] Add Resend API key
- [ ] Set up Stripe webhook pointing to `/api/webhook/stripe`
- [ ] Seed 5 planners into Supabase
- [ ] Create GBP (Google Business Profile) listing
- [ ] Submit sitemap to Google Search Console
- [ ] Buy domain → point to Vercel

---

## First 30 Days

| Week | Focus |
|---|---|
| Week 1 | Deploy site, set up Stripe/Supabase, seed data, create GBP |
| Week 2 | Publish SEO content cluster (4 guide pages), start Facebook ads |
| Week 3 | Cold email outreach to 50 UK wedding planners |
| Week 4 | Google Ads campaign launch, A/B test copy |

---

_Luminary Weddings — The UK's Most Exceptional Wedding Planners. Curated For You._
