import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

// GET /api/request-payout?planner_id=xxx
// Creates a Stripe Payment Link for the planner to pay their outstanding commissions
export async function GET(req: NextRequest) {
  const plannerId = req.nextUrl.searchParams.get("planner_id");

  if (!plannerId) {
    return NextResponse.json(
      { error: "planner_id is required" },
      { status: 400 }
    );
  }

  // Fetch all pending/invoiced commissions for this planner
  const { data: commissions, error } = await supabaseAdmin
    .from("commissions")
    .select("*")
    .eq("planner_id", plannerId)
    .in("status", ["pending", "invoiced"]);

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch commissions" },
      { status: 500 }
    );
  }

  if (!commissions || commissions.length === 0) {
    return NextResponse.json(
      { error: "No outstanding commissions to pay" },
      { status: 404 }
    );
  }

  const totalOwed = commissions.reduce(
    (sum, c) => sum + parseFloat(c.luminary_amount || "0"),
    0
  );

  // Get planner info
  const { data: planner } = await supabaseAdmin
    .from("planners")
    .select("name, email")
    .eq("id", plannerId)
    .single();

  // Create a Stripe Payment Link
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(totalOwed * 100),
          product_data: {
            name: "Luminary Weddings — Planner Commission",
            description: `Commission for ${commissions.length} booking(s): ${commissions
              .map((c) => c.couple_name)
              .join(", ")}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      planner_id: plannerId,
      planner_email: planner?.email || "",
      commission_ids: commissions.map((c) => c.id).join(","),
    },
  });

  return NextResponse.json({
    payment_link_url: paymentLink.url,
    total_amount: totalOwed,
    commission_count: commissions.length,
  });
}