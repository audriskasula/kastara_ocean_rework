"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import FormField from "@/components/admin/FormField";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    username: user?.username || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleEdit = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
      username: user?.username || "",
    });
    setErrors({});
    setIsEditing(true);
  };

  const handleSave = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    updateProfile({
      name: form.name,
      email: form.email,
    });
    setIsEditing(false);
    showToast("Profil berhasil diperbarui");
  };

  return (
    <>
      <AdminHeader title="Profile" subtitle="Lihat dan edit informasi profil admin" />
      <div className="admin-content">
        <div className="admin-profile-card">
          {/* Header */}
          <div className="admin-profile-header">
            <div className="admin-profile-avatar">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="admin-profile-header-info">
              <h2>{user?.name || "Admin"}</h2>
              <p>{user?.role || "Super Admin"} • {user?.email || "admin@kastaraocean.com"}</p>
            </div>
          </div>

          {/* Body */}
          <div className="admin-profile-body">
            {isEditing ? (
              <>
                <div className="admin-form-row">
                  <FormField label="Nama Lengkap" required error={errors.name}>
                    <input
                      className={`admin-form-input ${errors.name ? "error" : ""}`}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Email" required error={errors.email}>
                    <input
                      type="email"
                      className={`admin-form-input ${errors.email ? "error" : ""}`}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </FormField>
                </div>
                <div className="admin-form-row">
                  <FormField label="Username">
                    <input
                      className="admin-form-input"
                      value={form.username}
                      disabled
                      style={{ opacity: 0.6, cursor: "not-allowed" }}
                    />
                  </FormField>
                  <FormField label="Role">
                    <input
                      className="admin-form-input"
                      value={form.role}
                      disabled
                      style={{ opacity: 0.6, cursor: "not-allowed" }}
                    />
                  </FormField>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button className="admin-btn admin-btn-secondary" onClick={() => setIsEditing(false)}>
                    Batal
                  </button>
                  <button className="admin-btn admin-btn-primary" onClick={handleSave}>
                    Simpan Perubahan
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="admin-profile-field">
                  <div className="admin-profile-field-label">Nama Lengkap</div>
                  <div className="admin-profile-field-value">{user?.name}</div>
                </div>
                <div className="admin-profile-field">
                  <div className="admin-profile-field-label">Email</div>
                  <div className="admin-profile-field-value">{user?.email}</div>
                </div>
                <div className="admin-profile-field">
                  <div className="admin-profile-field-label">Username</div>
                  <div className="admin-profile-field-value">{user?.username}</div>
                </div>
                <div className="admin-profile-field">
                  <div className="admin-profile-field-label">Role</div>
                  <div className="admin-profile-field-value">
                    <span className="admin-badge info">{user?.role}</span>
                  </div>
                </div>
                <div className="admin-profile-field">
                  <div className="admin-profile-field-label">Status</div>
                  <div className="admin-profile-field-value">
                    <span className="admin-badge success">Aktif</span>
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <button className="admin-btn admin-btn-primary" onClick={handleEdit}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Profil
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="admin-toast success">{toast}</div>}
    </>
  );
}
