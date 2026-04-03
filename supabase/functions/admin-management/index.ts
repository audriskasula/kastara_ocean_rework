// supabase/functions/admin-management/index.ts
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  if (stored.startsWith("sha256:")) {
    const parts = stored.split(":");
    if (parts.length !== 3) return false;
    const salt = parts[1];
    const expectedHash = parts[2];

    const encoder = new TextEncoder();
    const data = encoder.encode(salt + plain);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return hashHex === expectedHash;
  }
  return plain === stored;
}

async function hashPassword(password: string): Promise<string> {
  const saltBytes = new Uint8Array(16);
  crypto.getRandomValues(saltBytes);
  const salt = Array.from(saltBytes).map(b => b.toString(16).padStart(2, "0")).join("");

  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return `sha256:${salt}:${hashHex}`;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { action, userId, oldPassword, newPassword, adminUserId } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ── ACTION: GET ALL USERS (Super Admin Only) ──
    if (action === "get-users") {
      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("role")
        .eq("id", adminUserId)
        .single();

      if (adminError || admin.role !== "Super Admin") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403, headers: corsHeaders });
      }

      const { data, error } = await supabase
        .from("admin_users")
        .select("id, username, name, role, avatar, created_at")
        .order("created_at", { ascending: false });

      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
      return new Response(JSON.stringify({ data }), { status: 200, headers: corsHeaders });
    }

    // ── ACTION: CHANGE PASSWORD ──
    if (action === "change-password") {
      const { data: user, error: fetchError } = await supabase
        .from("admin_users")
        .select("password")
        .eq("id", userId)
        .single();

      if (fetchError || !user) {
        return new Response(JSON.stringify({ error: "User tidak ditemukan" }), { status: 404, headers: corsHeaders });
      }

      const isValid = await verifyPassword(oldPassword, user.password);
      if (!isValid) {
        return new Response(JSON.stringify({ error: "Password lama salah" }), { status: 401, headers: corsHeaders });
      }

      const newHashed = await hashPassword(newPassword);
      await supabase.from("admin_users").update({ password: newHashed }).eq("id", userId);

      return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
    }

    // ── ACTION: RESET PASSWORD (Super Admin Only) ──
    if (action === "reset-password") {
      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("role")
        .eq("id", adminUserId)
        .single();

      if (adminError || admin.role !== "Super Admin") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403, headers: corsHeaders });
      }

      const newHashed = await hashPassword(newPassword);
      await supabase.from("admin_users").update({ password: newHashed }).eq("id", userId);

      return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: corsHeaders });
  }
});
