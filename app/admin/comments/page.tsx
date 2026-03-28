"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import FormField from "@/components/admin/FormField";
import {
  getData,
  setData,
  generateId,
  initialComments,
  formatDate,
  type Comment,
} from "../mockData";

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
  const [data, setLocalData] = useState<Comment[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Comment | null>(null);
  const [editItem, setEditItem] = useState<Comment | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    setLocalData(getData("comments", initialComments));
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.author.trim()) e.author = "Nama wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid";
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

  const handleSave = () => {
    if (!validate()) return;

    let updated: Comment[];
    if (editItem) {
      updated = data.map((d) =>
        d.id === editItem.id ? { ...d, ...form } : d
      );
      showToast("Komentar berhasil diperbarui");
    } else {
      const newItem: Comment = {
        id: generateId(),
        ...form,
        createdAt: new Date().toISOString().split("T")[0],
      };
      updated = [...data, newItem];
      showToast("Komentar berhasil ditambahkan");
    }

    setLocalData(updated);
    setData("comments", updated);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteModal) return;
    const updated = data.filter((d) => d.id !== deleteModal.id);
    setLocalData(updated);
    setData("comments", updated);
    setDeleteModal(null);
    showToast("Komentar berhasil dihapus");
  };

  const handleStatusChange = (item: Comment, status: Comment["status"]) => {
    const updated = data.map((d) =>
      d.id === item.id ? { ...d, status } : d
    );
    setLocalData(updated);
    setData("comments", updated);
    showToast(`Status diubah ke ${status}`);
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
          className={`admin-badge ${
            item.status === "approved"
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
      key: "createdAt",
      label: "Tanggal",
      render: (item) => (
        <span style={{ color: "#94a3b8", fontSize: 13 }}>{formatDate(item.createdAt)}</span>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <AdminHeader title="Comments" subtitle="Kelola komentar pengunjung website" />
      <div className="admin-content">
        <DataTable
          columns={columns}
          data={data}
          searchKeys={["author", "comment", "page"]}
          onAdd={openAdd}
          addLabel="Tambah Komentar"
          onEdit={openEdit}
          onDelete={(item) => setDeleteModal(item)}
        />
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
