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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Constants removed since they were unused and causing lint errors

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kastara_admin_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem("kastara_admin_session");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const { data: supabaseUser, error } = await supabase
          .from("admin_users")
          .select("*")
          .eq("username", username)
          .eq("password", password)
          .single();

        if (error || !supabaseUser) {
          return { success: false, error: "Username atau password salah" };
        }

        const userData = {
          id: supabaseUser.id,
          username: supabaseUser.username,
          name: supabaseUser.name,
          email: `${supabaseUser.username}@kastaraocean.com`, // mock email
          role: supabaseUser.role || "Admin",
          avatar: supabaseUser.avatar,
        };

        setUser(userData);
        localStorage.setItem("kastara_admin_session", JSON.stringify(userData));
        return { success: true };
      } catch {
        return { success: false, error: "Terjadi kesalahan server." };
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("kastara_admin_session");
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile,
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
