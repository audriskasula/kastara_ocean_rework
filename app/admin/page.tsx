"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import { supabase } from "@/lib/supabase";
import { formatDate } from "./mockData";
import type { Student, Comment, NewsItem, Testimonial } from "./mockData";

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const [
        { data: st },
        { data: te },
        { data: co },
        { data: ne },
      ] = await Promise.all([
        supabase.from("students").select("*"),
        supabase.from("testimonials").select("*"),
        supabase.from("comments").select("*"),
        supabase.from("news").select("*"),
      ]);

      setStudents(st || []);
      setTestimonials(te || []);
      setComments(co || []);
      setNews(ne || []);
      setLoading(false);
      setMounted(true);
    }

    fetchAll();
  }, []);

  if (!mounted) return null;

  const activeStudents = students.filter((s) => s.status === "active").length;
  const pendingComments = comments.filter((c) => c.status === "pending").length;
  const publishedNews = news.filter((n) => n.status === "published").length;

  // Build recent activity from existing data, sorted by created_at desc
  const recentItems = [
    ...students.map((s) => ({
      module: "Siswa",
      label: s.name,
      date: s.created_at,
      author: s.author || "Admin",
    })),
    ...testimonials.map((t) => ({
      module: "Testimonial",
      label: t.name,
      date: t.created_at,
      author: t.author || "Admin",
    })),
    ...comments.map((c) => ({
      module: "Komentar",
      label: c.comment,
      date: c.created_at,
      author: c.author,
    })),
    ...news.map((n) => ({
      module: "Berita",
      label: n.title,
      date: n.created_at,
      author: n.author,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  const moduleConfig: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
    Siswa: {
      bg: "#fff1f2", text: "#be123c", border: "#fecdd3",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width={13} height={13}>
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width={13} height={13}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    Komentar: {
      bg: "#fffbeb", text: "#b45309", border: "#fde68a",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width={13} height={13}>
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
        </svg>
      ),
    },
    Berita: {
      bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width={13} height={13}>
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <rect x="10" y="6" width="8" height="4" rx="1" />
        </svg>
      ),
    },
  };

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Ringkasan data admin panel" />
      <div className="admin-content">
        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="admin-stats-grid">
              <StatsCard
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
                label="Total Siswa"
                value={students.length}
                trend={{ value: `${activeStudents} aktif`, direction: "up" }}
                color="rose"
              />
              <StatsCard
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                }
                label="Testimonial"
                value={testimonials.length}
                color="blue"
              />
              <StatsCard
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
                  </svg>
                }
                label="Komentar"
                value={comments.length}
                trend={{ value: `${pendingComments} pending`, direction: pendingComments > 0 ? "down" : "up" }}
                color="amber"
              />
              <StatsCard
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                    <rect x="10" y="6" width="8" height="4" rx="1" />
                  </svg>
                }
                label="Berita"
                value={news.length}
                trend={{ value: `${publishedNews} published`, direction: "up" }}
                color="emerald"
              />
            </div>

            {/* Recent Data Table */}
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
                              {cfg.icon}
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
          </>
        )}
      </div>
    </>
  );
}
