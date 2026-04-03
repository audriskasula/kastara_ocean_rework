// supabase/functions/admin-login/index.ts
//
// Supabase Edge Function untuk handle login admin.
// Berjalan di server Supabase (Deno runtime) — menggunakan SERVICE ROLE KEY
// yang TIDAK pernah dikirim ke browser.
//
// Flow:
// 1. Client kirim POST { username, password }
// 2. Edge function query admin_users dengan service role key (bypass RLS)
// 3. Verifikasi password di server (SHA-256 atau plain text legacy)
// 4. Return user data (tanpa password) atau error

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── CORS headers ─────────────────────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ─── Password verification (same logic as lib/crypto.ts) ──────────────────────
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

  // Legacy: plain text comparison (untuk masa transisi)
  console.warn("Legacy plain-text password comparison. Please migrate!");
  return plain === stored;
}

// ─── Rate limiting sederhana (in-memory, per Edge Function instance) ──────────
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

function checkRateLimit(username: string): { blocked: boolean; secondsLeft: number } {
  const now = Date.now();
  const entry = loginAttempts.get(username);

  if (entry && entry.lockedUntil > now) {
    return { blocked: true, secondsLeft: Math.ceil((entry.lockedUntil - now) / 1000) };
  }

  return { blocked: false, secondsLeft: 0 };
}

function recordFailedAttempt(username: string) {
  const now = Date.now();
  const entry = loginAttempts.get(username) ?? { count: 0, lockedUntil: 0 };
  entry.count += 1;

  if (entry.count >= 5) {
    entry.lockedUntil = now + 15 * 60 * 1000; // 15 menit
    entry.count = 0;
  }

  loginAttempts.set(username, entry);
}

function clearAttempts(username: string) {
  loginAttempts.delete(username);
}

// ─── Main handler ──────────────────────────────────────────────────────────────
serve(async (req: Request) => {
  // Handle preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username dan password wajib diisi" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Rate limit check ──
    const { blocked, secondsLeft } = checkRateLimit(username);
    if (blocked) {
      const menit = Math.ceil(secondsLeft / 60);
      return new Response(
        JSON.stringify({ error: `Terlalu banyak percobaan. Coba lagi dalam ${menit} menit.` }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Query DB dengan Service Role Key (bypass RLS) ──
    // SERVICE_ROLE_KEY otomatis tersedia sebagai env var di Edge Functions
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: user, error } = await supabase
      .from("admin_users")
      .select("id, username, name, role, avatar, password")
      .eq("username", username.trim().toLowerCase())
      .single();

    if (error || !user) {
      recordFailedAttempt(username);
      return new Response(
        JSON.stringify({ error: "Username atau password salah" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Verifikasi password di server ──
    const isValid = await verifyPassword(password, user.password ?? "");
    if (!isValid) {
      recordFailedAttempt(username);
      return new Response(
        JSON.stringify({ error: "Username atau password salah" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Login berhasil ──
    clearAttempts(username);

    // Kirim data user TANPA password
    const { password: _pwd, ...safeUser } = user;

    return new Response(
      JSON.stringify({ user: safeUser }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan server" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
