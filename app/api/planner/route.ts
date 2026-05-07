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
    .from("planners")
    .select("id, name, company, email, location, region, status, created_at")
    .eq("id", plannerId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Planner not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}