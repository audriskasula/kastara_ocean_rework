"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import FormField from "@/components/admin/FormField";
import ImageUpload from "@/components/admin/ImageUpload";
import { supabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/crypto";
import { useRouter } from "next/navigation";

export interface AdminUser {
  id: string;
  username: string;
  password?: string;
  name: string;
  role: string;
  avatar: string;
  created_at: string;
}

const emptyForm = {
  username: "",
  password: "",
  name: "",
  role: "Admin",
  avatar: "/femaleAvatar.svg",
};

type FormData = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function AdminUsersPage() {
  const { user, resetUserPassword, isSuperAdmin } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<AdminUser[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<AdminUser | null>(null);
  const [resetModal, setResetModal] = useState<AdminUser | null>(null);
  const [newPwd, setNewPwd] = useState("");
  const [editItem, setEditItem] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const fnUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/admin-management`;
      const response = await fetch(fnUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" 
        },
        body: JSON.stringify({ action: "get-users", adminUserId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data user");
      }

      const { data: users } = await response.json();
      setData(users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("Gagal memuat daftar pengguna", "error");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Role-based Access Protection
    if (!user) return; 
    
    if (!isSuperAdmin) {
      router.replace("/admin");
    } else {
      setMounted(true);
      fetchData();
    }
  }, [user, router, fetchData, isSuperAdmin]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.username.trim()) e.username = "Username wajib diisi";
    if (!editItem && !form.password.trim()) e.password = "Password wajib diisi untuk keamanan pengguna baru";
    if (!form.name.trim()) e.name = "Nama lengkap wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (item: AdminUser) => {
    setEditItem(item);
    setForm({
      username: item.username,
      password: "", 
      name: item.name,
      role: item.role,
      avatar: item.avatar,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!validate()) return;

    setActionLoading(true);
    const payload: Partial<AdminUser> & { password?: string } = {
      username: form.username.trim().toLowerCase(),
      name: form.name.trim(),
      role: form.role,
      avatar: form.avatar,
    };

    if (form.password) {
      payload.password = await hashPassword(form.password);
    }

    if (editItem) {
      const { error } = await supabase
        .from("admin_users")
        .update(payload)
        .eq("id", editItem.id);

      if (error) showToast("Gagal memperbarui pengguna", "error");
      else {
        showToast("Pengguna berhasil diperbarui");
        fetchData();
        setModalOpen(false);
      }
    } else {
      const { error } = await supabase
        .from("admin_users")
        .insert([payload]);

      if (error) showToast("Gagal menambah pengguna", "error");
      else {
        showToast("Pengguna baru berhasil ditambahkan");
        fetchData();
        setModalOpen(false);
      }
    }
    setActionLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    setActionLoading(true);
    const { error } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", deleteModal.id);

    if (error) showToast("Gagal menghapus pengguna", "error");
    else {
      showToast("Pengguna berhasil dihapus permanen");
      fetchData();
    }
    setDeleteModal(null);
    setActionLoading(false);
  };

  const handleResetPassword = async () => {
    if (!resetModal || !newPwd.trim()) return;
    if (newPwd.length < 6) {
      showToast("Sandi minimal 6 karakter", "error");
      return;
    }

    setActionLoading(true);
    const result = await resetUserPassword(resetModal.id, newPwd);
    setActionLoading(false);

    if (result.success) {
      showToast(`Sandi @${resetModal.username} berhasil direset`);
      setResetModal(null);
      setNewPwd("");
    } else {
      showToast(result.error || "Gagal mereset sandi", "error");
    }
  };

  const columns: Column<AdminUser>[] = [
    {
      key: "username",
      label: "Username",
      render: (item) => (
        <span style={{ fontWeight: 600 }}>{item.username}</span>
      ),
    },
    { key: "name", label: "Nama Lengkap" },
    {
      key: "role",
      label: "Role",
      render: (item) => (
        <span className={`admin-badge ${item.role === "Super Admin" ? "success" : "neutral"}`}>
          {item.role}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Reset",
      render: (item) => (
        <button 
          className="admin-btn-icon" 
          title="Reset Password"
          onClick={() => { setResetModal(item); setNewPwd(""); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z" />
          </svg>
        </button>
      )
    }
  ];

  if (!mounted || user?.role !== "Super Admin") return null;

  return (
    <>
      <AdminHeader title="Users & Role (RBAC)" subtitle="Kelola pengguna akses dashboard admin" />
      <div className="admin-content">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          searchKeys={["username", "name", "role"]}
          onAdd={openAdd}
          addLabel="Tambah Akses User"
          onEdit={openEdit}
          onDelete={(item) => setDeleteModal(item)}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Administrator" : "Beri Akses Admin"}
        wide
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={actionLoading}>
              {actionLoading ? "Memproses..." : (editItem ? "Simpan Perubahan" : "Terbitkan User")}
            </button>
          </>
        }
      >
        <div className="admin-form-row">
          <FormField label="Username Login" required error={errors.username}>
            <input
              className={`admin-form-input ${errors.username ? "error" : ""}`}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Isikan satu kata unik, misal: irfan123"
            />
          </FormField>
          <FormField label="Password" required={!editItem} error={errors.password}>
            <input
              type="password"
              autoComplete="new-password"
              className={`admin-form-input ${errors.password ? "error" : ""}`}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={editItem ? "(Kosongkan jika tak ingin ganti sandi)" : "Sandi baru yang tak bisa ditebak"}
            />
          </FormField>
        </div>

        <div className="admin-form-row">
          <FormField label="Nama Lengkap" required error={errors.name}>
            <input
              className={`admin-form-input ${errors.name ? "error" : ""}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Contoh: Irfan Hakim"
            />
          </FormField>
          <FormField label="Jabatan/Role" required>
            <select
              className="admin-form-select"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="Super Admin">Super Admin (Akses Kontrol Penuh)</option>
              <option value="Admin">Admin Biasa</option>
            </select>
          </FormField>
        </div>

        <FormField label="Foto Profil" required>
          <ImageUpload 
            value={form.avatar} 
            onChange={(url: string) => setForm({ ...form, avatar: url })} 
            folder="avatars" 
          />
        </FormField>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={!!resetModal}
        onClose={() => setResetModal(null)}
        title={`Reset Sandi @${resetModal?.username}`}
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setResetModal(null)}>Batal</button>
            <button className="admin-btn admin-btn-primary" onClick={handleResetPassword} disabled={actionLoading}>
              {actionLoading ? "Memproses..." : "Konfirmasi Reset"}
            </button>
          </>
        }
      >
        <p style={{ marginBottom: 15, fontSize: 14, color: "#64748b" }}>
          Tentukan kata sandi baru untuk <strong>{resetModal?.name}</strong>. User harus diberitahu secara manual setelah reset.
        </p>
        <FormField label="Kata Sandi Baru" required>
          <input
            type="password"
            className="admin-form-input"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="Minimal 6 karakter"
            autoFocus
          />
        </FormField>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        itemName={`Akun @${deleteModal?.username}`}
      />

      {/* Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

      <style jsx>{`
        .admin-btn-icon {
          background: #f1f5f9;
          border: none;
          color: #64748b;
          width: 30px;
          height: 30px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-btn-icon:hover {
          background: #e2e8f0;
          color: #1e293b;
        }
      `}</style>
    </>
  );
}
