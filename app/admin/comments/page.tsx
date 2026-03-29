"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import FormField from "@/components/admin/FormField";
import { supabase } from "@/lib/supabase";
import { formatDate } from "../mockData";
import { useAuth } from "@/context/AuthContext";

export interface Comment {
  id: string;
  author: string;
  email: string;
  comment: string;
  page: string;
  status: "approved" | "pending" | "rejected";
  created_at: string;
}

const emptyForm = {
  author: "",
  email: "",
  comment: "",
  page: "Home",
  status: "pending" as Comment["status"],
};

type FormData = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function CommentsPage() {
  const [data, setData] = useState<Comment[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Comment | null>(null);
  const [editItem, setEditItem] = useState<Comment | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching comments:", error);
    else setData(comments || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchData();
      setMounted(true);
    };
    init();
  }, [fetchData]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.author.trim()) e.author = "Nama wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Format email tidak valid";
    if (!form.comment.trim()) e.comment = "Komentar wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (item: Comment) => {
    setEditItem(item);
    setForm({
      author: item.author,
      email: item.email,
      comment: item.comment,
      page: item.page,
      status: item.status,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!validate()) return;

    if (editItem) {
      const { error } = await supabase
        .from("comments")
        .update(form)
        .eq("id", editItem.id);

      if (error) console.error("Error updating comment:", error);
      else {
        showToast("Komentar berhasil diperbarui");
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from("comments")
        .insert([form]);

      if (error) console.error("Error inserting comment:", error);
      else {
        showToast("Komentar berhasil ditambahkan");
        fetchData();
      }
    }

    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", deleteModal.id);

    if (error) console.error("Error deleting comment:", error);
    else {
      showToast("Komentar berhasil dihapus");
      fetchData();
    }

    setDeleteModal(null);
  };

  const columns: Column<Comment>[] = [
    { key: "author", label: "Penulis" },
    {
      key: "comment",
      label: "Komentar",
      render: (item) => (
        <span style={{ maxWidth: 300, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.comment}
        </span>
      ),
    },
    { key: "page", label: "Halaman" },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`admin-badge ${item.status === "approved"
              ? "success"
              : item.status === "pending"
                ? "warning"
                : "danger"
            }`}
        >
          {item.status === "approved" ? "Disetujui" : item.status === "pending" ? "Pending" : "Ditolak"}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Tanggal",
      render: (item) => (
        <span style={{ color: "#94a3b8", fontSize: 13 }}>{formatDate(item.created_at)}</span>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <AdminHeader title="Comments" subtitle="Kelola komentar pengunjung website" />
      <div className="admin-content">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            searchKeys={["author", "comment", "page"]}
            onAdd={openAdd}
            addLabel="Tambah Komentar"
            onEdit={openEdit}
            onDelete={(item) => setDeleteModal(item)}
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Komentar" : "Tambah Komentar"}
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave}>
              {editItem ? "Simpan Perubahan" : "Tambah"}
            </button>
          </>
        }
      >
        <div className="admin-form-row">
          <FormField label="Nama" required error={errors.author}>
            <input
              className={`admin-form-input ${errors.author ? "error" : ""}`}
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Nama penulis"
            />
          </FormField>
          <FormField label="Email" required error={errors.email}>
            <input
              type="email"
              className={`admin-form-input ${errors.email ? "error" : ""}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email penulis"
            />
          </FormField>
        </div>

        <div className="admin-form-row">
          <FormField label="Halaman">
            <select
              className="admin-form-select"
              value={form.page}
              onChange={(e) => setForm({ ...form, page: e.target.value })}
            >
              <option value="Home">Home</option>
              <option value="About">About</option>
              <option value="Contact">Contact</option>
              <option value="News">News</option>
              <option value="Program">Program</option>
              <option value="Gallery">Gallery</option>
            </select>
          </FormField>
          <FormField label="Status">
            <select
              className="admin-form-select"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Comment["status"] })}
            >
              <option value="pending">Pending</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
            </select>
          </FormField>
        </div>

        <FormField label="Komentar" required error={errors.comment}>
          <textarea
            className={`admin-form-textarea ${errors.comment ? "error" : ""}`}
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            placeholder="Isi komentar..."
            rows={4}
          />
        </FormField>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        itemName={deleteModal?.author || ""}
      />

      {/* Toast */}
      {toast && <div className="admin-toast success">{toast}</div>}
    </>
  );
}
