"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  DashboardIcon, 
  NewsIcon, 
  TestimonialIcon, 
  CommentIcon, 
  StudentIcon, 
  UsersRoleIcon, 
  UserProfileIcon 
} from "@/icons/icons";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout, isSuperAdmin } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const menuSections = [
    {
      title: "Menu Utama",
      items: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: <DashboardIcon />,
        },
      ]
    },
    {
      title: "Konten Website",
      items: [
        {
          label: "Berita & News",
          href: "/admin/news",
          icon: <NewsIcon />,
        },
        {
          label: "Testimonial",
          href: "/admin/testimonial",
          icon: <TestimonialIcon />,
        },
        {
          label: "Komentar",
          href: "/admin/comments",
          icon: <CommentIcon />,
        },
        {
          label: "Galeri Foto",
          href: "/admin/gallery",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          ),
        },
      ]
    },
    {
      title: "Pemasaran",
      items: [
        {
          label: "Affiliate Pendaftaran",
          href: "/admin/affiliates",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          ),
        },
      ]
    },
    {
      title: "Manajemen Data",
      items: [
        {
          label: "Data Siswa",
          href: "/admin/data-siswa",
          icon: <StudentIcon />,
        },
      ]
    },
    {
      title: "Sistem & Akun",
      items: [
        {
          label: "Profil Saya",
          href: "/admin/profile",
          icon: <UserProfileIcon />,
        },
      ]
    }
  ];

  // Role-based additions
  if (isSuperAdmin) {
    // Add Manage Affiliates to "Pemasaran"
    const pemasaranSection = menuSections.find(s => s.title === "Pemasaran");
    if (pemasaranSection) {
      pemasaranSection.items.push({
        label: "Daftar Affiliate",
        href: "/admin/manage-affiliates",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      });
    }

    // Add Users & Role if Super Admin
    const sistemSection = menuSections.find(s => s.title === "Sistem & Akun");
    if (sistemSection) {
      sistemSection.items.unshift({
        label: "Users & Role",
        href: "/admin/users",
        icon: <UsersRoleIcon />,
      });
    }
  }

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="admin-sidebar-brand" style={{ flexShrink: 0 }}>
        <Image src="/logo.svg" alt="Kastara" width={36} height={36} style={{ width: 36, height: 36 }} />
        <div>
          <h2>Kastara Ocean</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav" style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
        {menuSections.map((section, idx) => (
          <div key={section.title} className="admin-sidebar-section" style={{ marginBottom: idx === menuSections.length - 1 ? 0 : 20 }}>
            <p className="admin-sidebar-nav-label" style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0 12px',
              marginBottom: '8px'
            }}>
              {section.title}
            </p>
            <div className="admin-sidebar-items">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-sidebar-link ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="admin-sidebar-footer" style={{ flexShrink: 0 }}>
        <button
          onClick={logout}
          className="admin-sidebar-link"
          style={{ width: "100%", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
