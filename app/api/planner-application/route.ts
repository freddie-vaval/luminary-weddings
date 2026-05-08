import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      company,
      email,
      phone,
      website,
      instagram,
      region,
      price_range,
      bio,
    } = body;

    if (!name || !email || !region || !bio) {
      return NextResponse.json(
        { error: "Please provide your name, email, region, and a description of your work." },
        { status: 400 }
      );
    }

    // Check if email already applied
    const { data: existing } = await supabaseAdmin
      .from("planners")
      .select("id, status")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existing) {
      if (existing.status === "approved") {
        return NextResponse.json(
          { error: "This email is already registered with us. Please email hello@luminaryweddings.com." },
          { status: 409 }
        );
      }
      if (existing.status === "pending") {
        return NextResponse.json(
          { error: "We've already received your application. We'll be in touch within 48 hours." },
          { status: 409 }
        );
      }
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("planners")
      .insert({
        name: name.trim(),
        company: company?.trim() || null,
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        website: website?.trim() || null,
        instagram: instagram?.trim() || null,
        region,
        price_range: price_range || null,
        bio: bio.trim(),
        status: "pending",
        style: [],
        availability: "available",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[planner-application] Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to submit your application. Please email us directly at hello@luminaryweddings.com." },
        { status: 500 }
      );
    }

    // Notify Luminary team
    try {
      const resend = getResend();
      await resend.emails.send({
        from: "Luminary Weddings <hello@luminaryweddings.com>",
        to: "hello@luminaryweddings.com",
        subject: `New Planner Application — ${name} (${region})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="border-bottom: 2px solid #C9A84C; padding-bottom: 12px;">
              New Planner Application
            </h2>
            <table style="border-collapse: collapse; width: 100%; margin-top: 24px;">
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Name</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Company</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${company || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${phone}</td></tr>` : ""}
              ${website ? `<tr><td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Website</td><td style="padding: 10px 16px; border-bottom: 1px solid #eee;"><a href="${website}">${website}</a></td></tr>` : ""}
              ${instagram ? `<tr><td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Instagram</td><td style="padding: 10px 16px; border-bottom: 1px solid #eee;"><a href="https://instagram.com/${instagram.replace("@", "")}">${instagram}</a></td></tr>` : ""}
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Region</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${region}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">Fee Range</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">${price_range || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 16px; color: #666; border-bottom: 1px solid #eee; font-weight: bold;">About</td>
                <td style="padding: 10px 16px; border-bottom: 1px solid #eee; line-height: 1.6;">${bio.replace(/\n/g, "<br/>")}</td>
              </tr>
            </table>
            <p style="margin-top: 24px; color: #999; font-size: 0.85rem;">
              Application ID: ${data.id} — Log into Supabase to review and approve/reject.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("[planner-application] Email error (application still saved):", emailError);
    }

    return NextResponse.json({ success: true, application_id: data.id });
  } catch (err) {
    console.error("[planner-application] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email us directly at hello@luminaryweddings.com." },
      { status: 500 }
    );
  }
}
