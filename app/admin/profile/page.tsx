"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import FormField from "@/components/admin/FormField";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<"info" | "security">("info");
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile Form
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    username: user?.username || "",
  });

  // Password Form
  const [pwdForm, setPwdForm] = useState({
    old: "",
    new: "",
    confirm: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
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

  const handleSaveProfile = () => {
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

  const handleChangePassword = async () => {
    const e: Record<string, string> = {};
    if (!pwdForm.old) e.old = "Sandi lama wajib diisi";
    if (!pwdForm.new) e.new = "Sandi baru wajib diisi";
    if (pwdForm.new.length < 6) e.new = "Sandi minimal 6 karakter";
    if (pwdForm.new !== pwdForm.confirm) e.confirm = "Konfirmasi sandi tidak cocok";
    
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    const result = await changePassword(pwdForm.old, pwdForm.new);
    setLoading(false);

    if (result.success) {
      showToast("Kata sandi berhasil diperbarui");
      setPwdForm({ old: "", new: "", confirm: "" });
    } else {
      showToast(result.error || "Gagal mengubah kata sandi", "error");
    }
  };

  return (
    <>
      <AdminHeader title="Profile & Akun" subtitle="Kelola informasi pribadi dan keamanan akun Anda" />
      
      <div className="admin-content">
        <div className="admin-profile-container">
          {/* Sidebar Profil */}
          <div className="admin-profile-sidebar">
            <div className="admin-profile-card center">
              <div className="admin-profile-avatar large">
                {user?.name?.charAt(0) || "A"}
              </div>
              <h3 style={{ marginTop: 15, marginBottom: 5 }}>{user?.name}</h3>
              <span className="admin-badge info">{user?.role}</span>
              <p style={{ color: "#64748b", fontSize: "13px", marginTop: 10 }}>@{user?.username}</p>
            </div>

            <div className="admin-profile-nav">
              <button 
                className={`admin-profile-nav-item ${activeTab === "info" ? "active" : ""}`}
                onClick={() => { setActiveTab("info"); setIsEditing(false); setErrors({}); }}
              >
                Informasi Umum
              </button>
              <button 
                className={`admin-profile-nav-item ${activeTab === "security" ? "active" : ""}`}
                onClick={() => { setActiveTab("security"); setErrors({}); }}
              >
                Keamanan & Sandi
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="admin-profile-main">
            <div className="admin-profile-card">
              {activeTab === "info" ? (
                <div className="admin-profile-section">
                  <div className="admin-profile-section-header">
                    <h3>Detail Informasi</h3>
                    {!isEditing && (
                      <button className="admin-btn admin-btn-secondary btn-sm" onClick={handleEdit}>
                        Edit Profil
                      </button>
                    )}
                  </div>

                  <div className="admin-profile-fields">
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
                            <input className="admin-form-input disabled" value={form.username} disabled />
                          </FormField>
                          <FormField label="Role">
                            <input className="admin-form-input disabled" value={form.role} disabled />
                          </FormField>
                        </div>
                        <div className="admin-form-actions">
                          <button className="admin-btn admin-btn-secondary" onClick={() => setIsEditing(false)}>Batal</button>
                          <button className="admin-btn admin-btn-primary" onClick={handleSaveProfile}>Simpan Perubahan</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="admin-profile-info-grid">
                          <div className="info-item">
                            <label>Nama Lengkap</label>
                            <p>{user?.name}</p>
                          </div>
                          <div className="info-item">
                            <label>Email</label>
                            <p>{user?.email || "Tidak diatur"}</p>
                          </div>
                          <div className="info-item">
                            <label>Username</label>
                            <p>@{user?.username}</p>
                          </div>
                          <div className="info-item">
                            <label>Status Akun</label>
                            <p><span className="admin-badge success">Aktif</span></p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="admin-profile-section">
                  <div className="admin-profile-section-header">
                    <h3>Ubah Kata Sandi</h3>
                  </div>
                  
                  <div className="admin-profile-password-form" style={{ maxWidth: 500 }}>
                    <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
                      Pastikan kata sandi Anda kuat untuk menjaga keamanan akses dashboard.
                    </p>
                    
                    <FormField label="Kata Sandi Saat Ini" required error={errors.old}>
                      <input
                        type="password"
                        className={`admin-form-input ${errors.old ? "error" : ""}`}
                        value={pwdForm.old}
                        onChange={(e) => setPwdForm({ ...pwdForm, old: e.target.value })}
                        placeholder="••••••••"
                      />
                    </FormField>

                    <FormField label="Kata Sandi Baru" required error={errors.new}>
                      <input
                        type="password"
                        className={`admin-form-input ${errors.new ? "error" : ""}`}
                        value={pwdForm.new}
                        onChange={(e) => setPwdForm({ ...pwdForm, new: e.target.value })}
                        placeholder="Minimal 6 karakter"
                      />
                    </FormField>

                    <FormField label="Konfirmasi Kata Sandi Baru" required error={errors.confirm}>
                      <input
                        type="password"
                        className={`admin-form-input ${errors.confirm ? "error" : ""}`}
                        value={pwdForm.confirm}
                        onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
                        placeholder="Ulangi sandi baru"
                      />
                    </FormField>

                    <div className="admin-form-actions" style={{ marginTop: 30 }}>
                      <button 
                        className="admin-btn admin-btn-primary" 
                        onClick={handleChangePassword}
                        disabled={loading}
                      >
                        {loading ? "Memproses..." : "Perbarui Kata Sandi"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

      <style jsx>{`
        .admin-profile-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
        }
        .admin-profile-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .admin-profile-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .admin-profile-card.center {
          text-align: center;
        }
        .admin-profile-avatar.large {
          width: 80px;
          height: 80px;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
          border-radius: 50%;
          margin: 0 auto;
        }
        .admin-profile-nav {
          background: white;
          border-radius: 12px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .admin-profile-nav-item {
          padding: 10px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          text-align: left;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-profile-nav-item:hover {
          background: #f8fafc;
        }
        .admin-profile-nav-item.active {
          background: #eff6ff;
          color: #3b82f6;
        }
        .admin-profile-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .admin-profile-section-header h3 {
          font-size: 18px;
          color: #1e293b;
        }
        .admin-profile-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .info-item label {
          display: block;
          font-size: 13px;
          color: #64748b;
          margin-bottom: 6px;
        }
        .info-item p {
          font-size: 15px;
          font-weight: 500;
          color: #1e293b;
        }
        .admin-form-input.disabled {
          background: #f8fafc;
          cursor: not-allowed;
          opacity: 0.7;
        }
        .btn-sm {
          padding: 6px 12px;
          font-size: 13px;
        }
        .admin-form-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
