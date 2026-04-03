"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  resetUserPassword: (targetUserId: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Cookie helpers ──────────────────────────────────────────────────────────
// Cookie ini dibaca oleh middleware.ts untuk server-side protection.
// Tidak menggunakan localStorage agar lebih aman dari risiko XSS dasar.
const SESSION_COOKIE = "kastara_admin_authenticated";

function setSessionCookie(active: boolean) {
  if (typeof document === "undefined") return;
  if (active) {
    // SameSite=Strict mencegah CSRF.
    // max-age=3600 = sesi otomatis kedaluwarsa setelah 1 jam.
    document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=3600; SameSite=Strict`;
  } else {
    document.cookie = `${SESSION_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

// ─── Rate limiting (client-side, bukan pengganti server-side) ────────────────
const FAIL_KEY = "kastara_login_fails";
const LOCK_KEY = "kastara_login_locked_until";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 menit

function checkRateLimit(): { blocked: boolean; remaining: number; secondsLeft: number } {
  const lockedUntil = parseInt(localStorage.getItem(LOCK_KEY) || "0", 10);
  const now = Date.now();
  if (lockedUntil > now) {
    return { blocked: true, remaining: 0, secondsLeft: Math.ceil((lockedUntil - now) / 1000) };
  }
  const fails = parseInt(localStorage.getItem(FAIL_KEY) || "0", 10);
  return { blocked: false, remaining: MAX_ATTEMPTS - fails, secondsLeft: 0 };
}

function recordFailedAttempt() {
  const fails = parseInt(localStorage.getItem(FAIL_KEY) || "0", 10) + 1;
  localStorage.setItem(FAIL_KEY, String(fails));
  if (fails >= MAX_ATTEMPTS) {
    localStorage.setItem(LOCK_KEY, String(Date.now() + LOCKOUT_MS));
    localStorage.removeItem(FAIL_KEY);
  }
}

function clearLoginAttempts() {
  localStorage.removeItem(FAIL_KEY);
  localStorage.removeItem(LOCK_KEY);
}

// ─── AuthProvider ─────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function syncSession() {
      try {
        const stored = localStorage.getItem("kastara_admin_session");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setSessionCookie(true);
          
          // Sinkronisasi data user dari server secara langsung ditiadakan 
          // karena tabel admin_users sekarang dikunci total (RLS).
          // Validasi dilakukan setiap kali user melakukan aksi CRUD 
          // melalui Edge Function yang menggunakan Service Role Key.
        }
      } catch {
        localStorage.removeItem("kastara_admin_session");
        setSessionCookie(false);
      } finally {
        setIsLoading(false);
      }
    }
    syncSession();
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
      // ── Rate limit check ──
      const { blocked, secondsLeft } = checkRateLimit();
      if (blocked) {
        const menit = Math.ceil(secondsLeft / 60);
        return {
          success: false,
          error: `Terlalu banyak percobaan gagal. Coba lagi dalam ${menit} menit.`,
        };
      }

      try {
        // Panggil Edge Function untuk handle login secara aman di server.
        // Dengan cara ini, kita tidak mengekspos service role key di browser 
        // dan tetap bisa mengakses data user meskipun RLS diaktifkan.
        const fnUrl = process.env.NEXT_PUBLIC_ADMIN_LOGIN_FN || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/admin-login`;
        
        const response = await fetch(fnUrl, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" 
          },
          body: JSON.stringify({ username: username.trim().toLowerCase(), password }),
        });

        if (!response.ok) {
          const err = await response.json();
          recordFailedAttempt();
          const { remaining } = checkRateLimit();
          const hint = remaining > 0 ? ` (${remaining} percobaan tersisa)` : "";
          return { success: false, error: `${err.error || "Login gagal"}${hint}` };
        }

        const { user: supabaseUser } = await response.json();

        // Login berhasil → reset counter
        clearLoginAttempts();

        const userData: User = {
          id: supabaseUser.id,
          username: supabaseUser.username,
          name: supabaseUser.name,
          email: "",
          role: supabaseUser.role || "Admin",
          avatar: supabaseUser.avatar || "/femaleAvatar.svg",
        };

        setUser(userData);
        localStorage.setItem("kastara_admin_session", JSON.stringify(userData));
        setSessionCookie(true);
        return { success: true };
      } catch (err) {
        console.error("Login Error:", err);
        return { success: false, error: "Terjadi kesalahan koneksi ke server." };
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("kastara_admin_session");
    setSessionCookie(false); // hapus cookie
    router.push("/login");
  }, [router]);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem("kastara_admin_session", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
      if (!user) return { success: false, error: "Sesi tidak ditemukan" };
      try {
        const fnUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/admin-management`;
        const response = await fetch(fnUrl, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" 
          },
          body: JSON.stringify({ 
            action: "change-password", 
            userId: user.id, 
            oldPassword, 
            newPassword 
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          return { success: false, error: err.error || "Gagal mengubah password" };
        }

        return { success: true };
      } catch (err) {
        console.error("Change Password Error:", err);
        return { success: false, error: "Terjadi kesalahan koneksi" };
      }
    },
    [user]
  );

  const resetUserPassword = useCallback(
    async (targetUserId: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
      if (!user || user.role !== "Super Admin") return { success: false, error: "Hanya Super Admin yang bisa mereset password" };
      try {
        const fnUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/admin-management`;
        const response = await fetch(fnUrl, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" 
          },
          body: JSON.stringify({ 
            action: "reset-password", 
            userId: targetUserId, 
            adminUserId: user.id, 
            newPassword 
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          return { success: false, error: err.error || "Gagal mereset password" };
        }

        return { success: true };
      } catch (err) {
        console.error("Reset Password Error:", err);
        return { success: false, error: "Terjadi kesalahan koneksi" };
      }
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile,
        changePassword,
        resetUserPassword,
        isSuperAdmin: user?.role?.toLowerCase() === "super admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
