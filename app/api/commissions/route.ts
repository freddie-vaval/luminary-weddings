import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const plannerId = req.nextUrl.searchParams.get("planner_id");

  if (!plannerId) {
    return NextResponse.json(
      { error: "planner_id query parameter is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("commissions")
    .select("*")
    .eq("planner_id", plannerId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch commissions" },
      { status: 500 }
    );
  }

  const pending = data.filter((c) => c.status === "pending");
  const paid = data.filter((c) => c.status === "paid");
  const invoiced = data.filter((c) => c.status === "invoiced");

  return NextResponse.json({
    commissions: data,
    summary: {
      total: data.length,
      pending_count: pending.length,
      pending_amount: pending.reduce((s, c) => s + parseFloat(c.luminary_amount || "0"), 0),
      paid_count: paid.length,
      paid_amount: paid.reduce((s, c) => s + parseFloat(c.luminary_amount || "0"), 0),
      invoiced_count: invoiced.length,
      invoiced_amount: invoiced.reduce((s, c) => s + parseFloat(c.luminary_amount || "0"), 0),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planner_id, couple_name, booking_amount } = body;

    if (!planner_id || !couple_name || !booking_amount) {
      return NextResponse.json(
        { error: "planner_id, couple_name, and booking_amount are required" },
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

    const luminaryAmount = Math.round(numericAmount * 0.25 * 100) / 100;

    const { data, error } = await supabaseAdmin
      .from("commissions")
      .insert({
        planner_id,
        couple_name,
        booking_amount: numericAmount,
        luminary_amount: luminaryAmount,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create commission record" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}