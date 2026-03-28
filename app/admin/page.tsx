"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import { supabase } from "@/lib/supabase";
import { formatDate } from "./mockData"; // You can keep this or move to utils
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
        { data: ne }
      ] = await Promise.all([
        supabase.from("students").select("*"),
        supabase.from("testimonials").select("*"),
        supabase.from("comments").select("*"),
        supabase.from("news").select("*")
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
  const graduatedStudents = students.filter((s) => s.status === "graduated").length;
  const pendingComments = comments.filter((c) => c.status === "pending").length;
  const publishedNews = news.filter((n) => n.status === "published").length;

  // Recent activity: combine records from all entities
  const recentItems = [
    ...students.slice(-3).map((s) => ({
      type: "Siswa",
      name: s.name,
      detail: s.program,
      date: s.created_at || s.enroll_date, // use created_at mapping
    })),
    ...comments.slice(-3).map((c) => ({
      type: "Komentar",
      name: c.author,
      detail: c.page,
      date: c.created_at,
    })),
    ...news.slice(-2).map((n) => ({
      type: "Berita",
      name: n.title.length > 40 ? n.title.slice(0, 40) + "..." : n.title,
      detail: n.category,
      date: n.created_at,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

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
              <StatsCard
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 10 3 12 0v-5" />
                  </svg>
                }
                label="Lulusan"
                value={graduatedStudents}
                color="violet"
              />
              <StatsCard
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
                label="Batch Aktif"
                value="Batch 27"
                color="cyan"
              />
            </div>

            {/* Recent Activity Table */}
            <div className="admin-table-container">
              <div className="admin-table-toolbar">
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  Aktivitas Terbaru
                </h3>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tipe</th>
                    <th>Nama</th>
                    <th>Detail</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {recentItems.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <span
                          className={`admin-badge ${
                            item.type === "Siswa"
                              ? "info"
                              : item.type === "Komentar"
                              ? "warning"
                              : "success"
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{item.name}</td>
                      <td style={{ color: "#64748b" }}>{item.detail}</td>
                      <td style={{ color: "#94a3b8", fontSize: 13 }}>{formatDate(item.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
