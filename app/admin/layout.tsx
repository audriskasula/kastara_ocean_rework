"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "@/styles/admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Loading state
  if (isLoading || !mounted) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f1f5f9",
      }}>
        <div style={{
          width: 40,
          height: 40,
          border: "3px solid #e2e8f0",
          borderTopColor: "#e11d48",
          borderRadius: "50%",
          animation: "adminSpin 0.6s linear infinite",
        }} />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-layout">
      {/* Mobile Block */}
      <div className="admin-mobile-block">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
        <h2>Tidak Tersedia di Mobile</h2>
        <p>Admin panel hanya dapat diakses melalui perangkat desktop atau tablet. Silakan buka di perangkat dengan layar yang lebih besar.</p>
        <button
          className="admin-btn admin-btn-primary"
          style={{ marginTop: 8 }}
          onClick={() => router.push("/")}
        >
          Kembali ke Website
        </button>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="admin-layout-inner" style={{ display: "flex", flex: 1, minHeight: "100vh" }}>
        <AdminSidebar />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
