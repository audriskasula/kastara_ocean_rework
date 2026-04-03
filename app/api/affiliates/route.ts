import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Helper to create server-side supabase client with service role
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("affiliates")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, phone, googleFormUrl, code } = body;

    if (!userId || !googleFormUrl || !code) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upsert affiliate info
    const { data, error } = await supabaseAdmin
      .from("affiliates")
      .upsert({
        user_id: userId,
        phone,
        google_form_url: googleFormUrl,
        code: code.toLowerCase(),
      }, { onConflict: "user_id" })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    if (error.code === "23505") { // Unique constraint vialation on code
      return NextResponse.json({ error: "Kode affiliate sudah digunakan orang lain. Gunakan kode lain." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("affiliates")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
