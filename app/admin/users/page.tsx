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
  const { user } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<AdminUser[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<AdminUser | null>(null);
  const [editItem, setEditItem] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: users, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching users:", error);
    else setData(users || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Role-based Access Protection
    if (!user) return; 
    
    if (user.role !== "Super Admin") {
      router.replace("/admin");
    } else {
      setMounted(true);
      fetchData();
    }
  }, [user, router, fetchData]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
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
      password: "", // Jangan tampilkan password lama
      name: item.name,
      role: item.role,
      avatar: item.avatar,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!validate()) return;

    // Build the package ignoring password if it wasn't edited
    const payload: Partial<AdminUser> & { password?: string } = {
      username: form.username,
      name: form.name,
      role: form.role,
      avatar: form.avatar,
    };

    if (form.password) {
      payload.password = form.password; 
    }

    if (editItem) {
      const { error } = await supabase
        .from("admin_users")
        .update(payload)
        .eq("id", editItem.id);

      if (error) console.error("Error updating user:", error);
      else {
        showToast("Pengguna berhasil diperbarui");
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from("admin_users")
        .insert([payload]);

      if (error) console.error("Error inserting user:", error);
      else {
        showToast("Pengguna baru berhasil ditambahkan");
        fetchData();
      }
    }

    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    const { error } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", deleteModal.id);

    if (error) console.error("Error deleting user:", error);
    else {
      showToast("Pengguna berhasil dihapus permanen");
      fetchData();
    }
    setDeleteModal(null);
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
      key: "created_at",
      label: "Terdaftar Pada",
      render: (item) => (
        <span style={{ color: "#94a3b8", fontSize: 13 }}>
          {new Date(item.created_at).toLocaleDateString("id-ID")}
        </span>
      ),
    },
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
            <button className="admin-btn admin-btn-primary" onClick={handleSave}>
              {editItem ? "Simpan Perubahan" : "Terbitkan User"}
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
              type="text"
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

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        itemName={`Akun @${deleteModal?.username}`}
      />

      {/* Toast */}
      {toast && <div className="admin-toast success">{toast}</div>}
    </>
  );
}
