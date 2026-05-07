import { NextRequest, NextResponse } from "next/server";

// Tally form submission webhook
// Connect this URL to your Tally form: https://tally.so/r/XXXXX → Webhooks → add endpoint
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      couple_name,
      email,
      phone,
      wedding_date,
      location,
      region,
      guest_count,
      budget,
      style_notes,
      source,
    } = body;

    // Validate required fields
    if (!couple_name || !email || !region) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Insert into Supabase
    // const { data, error } = await supabaseAdmin
    //   .from("couples_enquiries")
    //   .insert({
    //     couple_name,
    //     email,
    //     phone,
    //     wedding_date,
    //     location,
    //     region,
    //     guest_count,
    //     budget,
    //     style_notes,
    //     source: source || "tally_form",
    //     status: "new",
    //   });

    // TODO: Send confirmation email to couple via Resend
    // await resend.emails.send({
    //   from: "Luminary Weddings <hello@luminaryweddings.com>",
    //   to: email,
    //   subject: "We've received your enquiry — Luminary Weddings",
    //   html: `...`
    // });

    console.log("New enquiry received:", { couple_name, email, region });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Tally webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}