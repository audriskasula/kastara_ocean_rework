"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import { TableSkeleton } from "@/components/admin/AdminSkeletons";
import { supabase } from "@/lib/supabase";
import { formatDate } from "./mockData";

const moduleConfig: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  Siswa: {
    bg: "#fff1f2", text: "#be123c", border: "#fecdd3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  Testimonial: {
    bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  Komentar: {
    bg: "#fffbeb", text: "#b45309", border: "#fde68a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
      </svg>
    ),
  },
  Berita: {
    bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <rect x="10" y="6" width="8" height="4" rx="1" />
      </svg>
    ),
  },
};

interface RecentItem {
  module: string;
  label: string;
  date: string;
  author: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0, activeStudents: 0,
    totalTestimonials: 0,
    totalComments: 0, pendingComments: 0,
    totalNews: 0, publishedNews: 0,
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      
      const [
        { count: totalStudents }, { count: activeStudents },
        { count: totalTestimonials },
        { count: totalComments }, { count: pendingComments },
        { count: totalNews }, { count: publishedNews },
      ] = await Promise.all([
        supabase.from("students").select("*", { count: "exact", head: true }),
        supabase.from("students").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("comments").select("*", { count: "exact", head: true }),
        supabase.from("comments").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("news").select("*", { count: "exact", head: true }),
        supabase.from("news").select("*", { count: "exact", head: true }).eq("status", "published"),
      ]);

      setStats({
        totalStudents: totalStudents || 0, activeStudents: activeStudents || 0,
        totalTestimonials: totalTestimonials || 0,
        totalComments: totalComments || 0, pendingComments: pendingComments || 0,
        totalNews: totalNews || 0, publishedNews: publishedNews || 0,
      });

      const [
        { data: studentsData },
        { data: testimonialsData },
        { data: commentsData },
        { data: newsData },
      ] = await Promise.all([
        supabase.from("students").select("name, created_at, author").order("created_at", { ascending: false }).limit(8),
        supabase.from("testimonials").select("name, created_at, author").order("created_at", { ascending: false }).limit(8),
        supabase.from("comments").select("comment, created_at, author").order("created_at", { ascending: false }).limit(8),
        supabase.from("news").select("title, created_at, author").order("created_at", { ascending: false }).limit(8),
      ]);

      const combinedRecent: RecentItem[] = [
        ...(studentsData || []).map((s: any) => ({ module: "Siswa", label: s.name, date: s.created_at, author: s.author || "Admin" })),
        ...(testimonialsData || []).map((t: any) => ({ module: "Testimonial", label: t.name, date: t.created_at, author: t.author || "Admin" })),
        ...(commentsData || []).map((c: any) => ({ module: "Komentar", label: c.comment, date: c.created_at, author: c.author || "Guest" })),
        ...(newsData || []).map((n: any) => ({ module: "Berita", label: n.title, date: n.created_at, author: n.author || "Admin" })),
      ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 8);

      setRecentItems(combinedRecent);
      setLoading(false);
    }

    setMounted(true);
    fetchDashboardData();
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Ringkasan data admin panel" />
      <div className="admin-content">
        {/* Stats Grid */}
        <div className="admin-stats-grid">
          <StatsCard
            icon={moduleConfig["Siswa"].icon}
            label="Total Siswa"
            value={stats.totalStudents}
            trend={{ value: `${stats.activeStudents} aktif`, direction: "up" }}
            color="rose"
            loading={loading}
          />
          <StatsCard
            icon={moduleConfig["Testimonial"].icon}
            label="Testimonial"
            value={stats.totalTestimonials}
            color="blue"
            loading={loading}
          />
          <StatsCard
            icon={moduleConfig["Komentar"].icon}
            label="Komentar"
            value={stats.totalComments}
            trend={{ value: `${stats.pendingComments} pending`, direction: stats.pendingComments > 0 ? "down" : "up" }}
            color="amber"
            loading={loading}
          />
          <StatsCard
            icon={moduleConfig["Berita"].icon}
            label="Berita"
            value={stats.totalNews}
            trend={{ value: `${stats.publishedNews} published`, direction: "up" }}
            color="emerald"
            loading={loading}
          />
        </div>

        {loading ? (
          <TableSkeleton rows={8} columns={4} />
        ) : (
          <div className="admin-table-container">
            <div className="admin-table-toolbar">
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                Data Terbaru
              </h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Modul</th>
                  <th>Data</th>
                  <th>Pembuat</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.length > 0 ? (
                  recentItems.map((item, idx) => {
                    const cfg = moduleConfig[item.module];
                    return (
                      <tr key={idx}>
                        <td>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 10px",
                              borderRadius: 999,
                              fontSize: 12,
                              fontWeight: 600,
                              background: cfg.bg,
                              color: cfg.text,
                              border: `1px solid ${cfg.border}`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span style={{ fontSize: 13, display: "flex", alignItems: "center" }}>{cfg.icon}</span>
                            {item.module}
                          </span>
                        </td>
                        <td style={{ color: "#1e293b", fontWeight: 500, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.label}
                        </td>
                        <td style={{ color: "#64748b", fontSize: 13, fontWeight: 500 }}>
                          {item.author}
                        </td>
                        <td style={{ color: "#94a3b8", fontSize: 13 }}>{formatDate(item.date)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "#94a3b8", padding: "32px 0" }}>
                      Belum ada data yang tercatat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
