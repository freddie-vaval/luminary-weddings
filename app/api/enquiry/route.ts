import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");

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
    } = body;

    // Validate required fields
    if (!couple_name || !email || !region) {
      return NextResponse.json(
        { error: "Please provide your name, email, and preferred region." },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("couples_enquiries")
      .insert({
        couple_name,
        email,
        phone: phone || null,
        wedding_date: wedding_date || null,
        location: location || null,
        region,
        guest_count: guest_count || null,
        budget: budget || null,
        style_notes: style_notes || null,
        status: "new",
        source: "website",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[enquiry] Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save your enquiry. Please try again." },
        { status: 500 }
      );
    }

    // Send email notification
    try {
      const resend = getResend();
      await resend.emails.send({
        from: "Luminary Weddings <hello@luminaryweddings.com>",
        to: "hello@luminaryweddings.com",
        subject: `New Enquiry — ${couple_name} (${region})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="border-bottom: 2px solid #C9A84C; padding-bottom: 12px;">
              New Luminary Weddings Enquiry
            </h2>
            <table style="border-collapse: collapse; width: 100%; margin-top: 24px;">
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Couple</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${couple_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${phone}</td></tr>` : ""}
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Wedding Date</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${wedding_date || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Location</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${location || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Region</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${region}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Guest Count</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${guest_count || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Budget</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${budget || "Not specified"}</td>
              </tr>
              ${style_notes ? `<tr><td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Style Notes</td><td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${style_notes}</td></tr>` : ""}
            </table>
            <p style="margin-top: 24px; color: #999; font-size: 0.85rem;">
              Submitted via luminaryweddings.com — enquiry ID: ${data.id}
            </p>
          </div>
        `,
      });

      // Send confirmation email to couple
      await resend.emails.send({
        from: "Luminary Weddings <hello@luminaryweddings.com>",
        to: email,
        subject: "We've received your enquiry — Luminary Weddings",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="border-bottom: 2px solid #C9A84C; padding-bottom: 12px;">Thank you, ${couple_name.split(" ")[0]}.</h2>
            <p style="font-size: 1rem; line-height: 1.7; color: #333;">
              We've received your enquiry and it's being reviewed by our team. We'll be in touch within <strong>24 hours</strong> with a shortlist of planners matched to your vision.
            </p>
            <p style="font-size: 1rem; line-height: 1.7; color: #333; margin-top: 16px;">
              In the meantime, feel free to explore our <a href="https://luminaryweddings.com/planners" style="color: #C9A84C;">planner network</a> to get a sense of who might be the right fit.
            </p>
            <p style="font-size: 1rem; line-height: 1.7; color: #333; margin-top: 24px;">
              See you soon,<br/>
              <strong>The Luminary Team</strong><br/>
              <a href="https://luminaryweddings.com" style="color: #C9A84C;">luminaryweddings.com</a>
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("[enquiry] Email error (enquiry still saved):", emailError);
      // Don't fail the request if email fails — enquiry is already saved
    }

    return NextResponse.json({ success: true, enquiry_id: data.id });
  } catch (err) {
    console.error("[enquiry] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
