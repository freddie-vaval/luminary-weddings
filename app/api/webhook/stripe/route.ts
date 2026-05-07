import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

// Disable body parsing so we can read the raw body for Stripe signature verification
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { planner_id, planner_email, planner_name, couple_name, luminary_amount } =
      paymentIntent.metadata;

    if (!planner_id) {
      console.warn("[stripe-webhook] No planner_id in payment intent metadata");
      return NextResponse.json({ ok: true });
    }

    // Update commission record to paid
    const { error: updateError } = await supabaseAdmin
      .from("commissions")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("stripe_payment_intent_id", paymentIntent.id);

    if (updateError) {
      console.error("[stripe-webhook] Failed to update commission:", updateError);
    }

    // Send confirmation email to planner via Resend
    try {
      await resend.emails.send({
        from: "Luminary Weddings <hello@luminaryweddings.com>",
        to: planner_email,
        subject: `Payment confirmed — Luminary Weddings Commission`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Commission Payment Confirmed ✓</h2>
            <p>Hi ${planner_name || "Planner"},</p>
            <p>We have received your commission payment for the following booking:</p>
            <table style="border-collapse: collapse; margin: 24px 0;">
              <tr>
                <td style="padding: 8px 16px; color: #666;">Couple</td>
                <td style="padding: 8px 16px; font-weight: bold;">${couple_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 16px; color: #666;">Booking Amount</td>
                <td style="padding: 8px 16px;">£${(parseFloat(paymentIntent.metadata.booking_amount) || 0).toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 16px; color: #666;">Your Commission to Luminary</td>
                <td style="padding: 8px 16px; font-weight: bold;">£${parseFloat(luminary_amount || "0").toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 16px; color: #666;">Payment Reference</td>
                <td style="padding: 8px 16px; font-family: monospace;">${paymentIntent.id}</td>
              </tr>
            </table>
            <p>Thank you for your continued partnership with Luminary Weddings.</p>
            <p>The Luminary Team<br/><a href="https://luminaryweddings.com">luminaryweddings.com</a></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("[stripe-webhook] Failed to send email:", emailError);
    }
  }

  return NextResponse.json({ ok: true });
}