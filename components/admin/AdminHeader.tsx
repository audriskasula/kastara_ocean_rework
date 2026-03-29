"use client";

import { useAuth } from "@/context/AuthContext";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="admin-header-actions">
        <button className="admin-user-menu" onClick={logout} title="Logout">
          <div className="admin-user-avatar">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="admin-user-info">
            <p className="font-bold text-sm">{user?.name || "Admin"}</p>
            <p className="text-xs">{user?.role || "Super Admin"}</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
