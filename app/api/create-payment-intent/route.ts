import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export async function POST(req: NextRequest) {
  try {
    const { planner_id, booking_amount, couple_name } = await req.json();

    if (!planner_id || !booking_amount || !couple_name) {
      return NextResponse.json(
        { error: "Missing required fields: planner_id, booking_amount, couple_name" },
        { status: 400 }
      );
    }

    const numericAmount = parseFloat(booking_amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: "booking_amount must be a positive number" },
        { status: 400 }
      );
    }

    // Look up the planner
    const { data: planner, error: plannerError } = await supabaseAdmin
      .from("planners")
      .select("id, name, email")
      .eq("id", planner_id)
      .single();

    if (plannerError || !planner) {
      return NextResponse.json(
        { error: "Planner not found" },
        { status: 404 }
      );
    }

    // Calculate Luminary's 25% commission
    const luminaryAmount = Math.round(numericAmount * 0.25 * 100) / 100;

    // Create or find existing pending commission for this couple + planner
    const { data: existingCommission } = await supabaseAdmin
      .from("commissions")
      .select("id, stripe_payment_intent_id")
      .eq("planner_id", planner_id)
      .eq("couple_name", couple_name)
      .eq("status", "pending")
      .maybeSingle();

    if (existingCommission?.stripe_payment_intent_id) {
      return NextResponse.json(
        { error: "A pending payment already exists for this booking. Use the existing payment intent." },
        { status: 409 }
      );
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(luminaryAmount * 100),
      currency: "gbp",
      description: `Luminary Weddings commission — ${couple_name}`,
      metadata: {
        planner_id,
        planner_email: planner.email,
        planner_name: planner.name,
        couple_name,
        booking_amount: numericAmount.toString(),
        luminary_amount: luminaryAmount.toString(),
      },
    });

    // Upsert commission record
    const commissionData = {
      planner_id,
      couple_name,
      booking_amount: numericAmount,
      luminary_amount: luminaryAmount,
      status: "pending",
      stripe_payment_intent_id: paymentIntent.id,
    };

    let commissionId: string;

    if (existingCommission) {
      const { data: updated } = await supabaseAdmin
        .from("commissions")
        .update(commissionData)
        .eq("id", existingCommission.id)
        .select("id")
        .single();
      commissionId = updated!.id;
    } else {
      const { data: inserted } = await supabaseAdmin
        .from("commissions")
        .insert(commissionData)
        .select("id")
        .single();
      commissionId = inserted!.id;
    }

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      commission_id: commissionId,
      luminary_amount: luminaryAmount,
    });
  } catch (error) {
    console.error("[create-payment-intent] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}