import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // Lookup affiliate link
    const { data, error } = await supabaseAdmin
      .from("affiliates")
      .select("google_form_url, click_count")
      .ilike("code", code)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Affiliate code not found" }, { status: 404 });
    }

    // Increment click count (fire and forget)
    await supabaseAdmin
      .from("affiliates")
      .update({ click_count: (data.click_count || 0) + 1 })
      .eq("code", code);

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
