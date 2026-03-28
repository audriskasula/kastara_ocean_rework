"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/shared/Navbar";
import Footer from "@/shared/Footer";
import { useState, useEffect } from "react";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide Navbar and Footer on admin and login routes
  const isAdminOrLogin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  // During SSR or before mounting, wrap in AuthProvider but don't conditionally render Navbar/Footer yet
  // to prevent hydration mismatch. Initial render should match the server's output potentially.
  // However, Next.js metadata and dynamic routes often benefit from a stable structure.
  
  return (
    <AuthProvider>
      {mounted && !isAdminOrLogin && <Navbar />}
      <main className={!mounted || isAdminOrLogin ? "" : "min-h-screen"}>
        {children}
      </main>
      {mounted && !isAdminOrLogin && <Footer />}
    </AuthProvider>
  );
}
