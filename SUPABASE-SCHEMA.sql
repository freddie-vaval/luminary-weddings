# Luminary Weddings — Supabase SQL Schema
# Run this in your Supabase dashboard → SQL Editor

-- ============================================================
-- PLANNERS
-- ============================================================
CREATE TABLE planners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  website TEXT,
  instagram TEXT,
  location TEXT,
  region TEXT NOT NULL,
  style TEXT[],
  price_range TEXT,
  availability TEXT DEFAULT 'available',
  bio TEXT,
  status TEXT DEFAULT 'pending',
  stripe_customer_id TEXT,
  stripe_account_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- COUPLES ENQUIRIES
-- ============================================================
CREATE TABLE couples_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  wedding_date DATE,
  location TEXT,
  region TEXT NOT NULL,
  guest_count TEXT,
  budget TEXT,
  style_notes TEXT,
  planner_id UUID REFERENCES planners(id),
  status TEXT DEFAULT 'new',
  source TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- PLACEMENTS
-- ============================================================
CREATE TABLE placements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enquiry_id UUID NOT NULL REFERENCES couples_enquiries(id),
  planner_id UUID NOT NULL REFERENCES planners(id),
  commission_rate NUMERIC(5,2) DEFAULT 0.25,
  planning_fee NUMERIC(10,2),
  status TEXT DEFAULT 'pending',
  placed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- COMMISSIONS
-- ============================================================
CREATE TABLE commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  planner_id UUID NOT NULL REFERENCES planners(id),
  couple_name TEXT NOT NULL,
  booking_amount NUMERIC(10,2) NOT NULL,
  luminary_amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'invoiced', 'paid')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ
);

-- ============================================================
-- LANDING PAGE CTA CLICKS (analytics)
-- ============================================================
CREATE TABLE landing_page_cta_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  click_type TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_planners_region ON planners(region);
CREATE INDEX idx_planners_status ON planners(status);
CREATE INDEX idx_enquiries_status ON couples_enquiries(status);
CREATE INDEX idx_enquiries_region ON couples_enquiries(region);
CREATE INDEX idx_placements_status ON placements(status);
CREATE INDEX idx_commissions_planner ON commissions(planner_id);
CREATE INDEX idx_commissions_status ON commissions(status);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE couples_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "planners_see_own_enquiries" ON couples_enquiries
  FOR SELECT USING (auth.uid() = planner_id);

ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_only_commissions" ON commissions
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "planners_see_own_placements" ON placements
  FOR SELECT USING (auth.uid() = planner_id);