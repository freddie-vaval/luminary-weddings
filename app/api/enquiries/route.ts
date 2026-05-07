import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const plannerId = req.nextUrl.searchParams.get("planner_id");

  if (!plannerId) {
    return NextResponse.json(
      { error: "planner_id is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("couples_enquiries")
    .select("*")
    .eq("planner_id", plannerId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }

  return NextResponse.json({ enquiries: data });
}