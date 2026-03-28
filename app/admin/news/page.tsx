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
  initialNews,
  formatDate,
  type NewsItem,
} from "../mockData";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "Prestasi",
  image: "/heroHome.png",
  status: "draft" as NewsItem["status"],
  author: "Admin Kastara",
};

type FormData = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function NewsPage() {
  const [data, setLocalData] = useState<NewsItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<NewsItem | null>(null);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    setLocalData(getData("news", initialNews));
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = "Judul wajib diisi";
    if (!form.excerpt.trim()) e.excerpt = "Ringkasan wajib diisi";
    if (!form.content.trim()) e.content = "Konten wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditItem(item);
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      image: item.image,
      status: item.status,
      author: item.author,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!validate()) return;

    let updated: NewsItem[];
    if (editItem) {
      updated = data.map((d) =>
        d.id === editItem.id ? { ...d, ...form } : d
      );
      showToast("Berita berhasil diperbarui");
    } else {
      const newItem: NewsItem = {
        id: generateId(),
        ...form,
        createdAt: new Date().toISOString().split("T")[0],
      };
      updated = [...data, newItem];
      showToast("Berita berhasil ditambahkan");
    }

    setLocalData(updated);
    setData("news", updated);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteModal) return;
    const updated = data.filter((d) => d.id !== deleteModal.id);
    setLocalData(updated);
    setData("news", updated);
    setDeleteModal(null);
    showToast("Berita berhasil dihapus");
  };

  const columns: Column<NewsItem>[] = [
    {
      key: "title",
      label: "Judul",
      render: (item) => (
        <span style={{ fontWeight: 500, maxWidth: 250, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.title}
        </span>
      ),
    },
    {
      key: "category",
      label: "Kategori",
      render: (item) => <span className="admin-badge neutral">{item.category}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className={`admin-badge ${item.status === "published" ? "success" : "warning"}`}>
          {item.status === "published" ? "Published" : "Draft"}
        </span>
      ),
    },
    { key: "author", label: "Penulis" },
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
      <AdminHeader title="News" subtitle="Kelola berita dan artikel website" />
      <div className="admin-content">
        <DataTable
          columns={columns}
          data={data}
          searchKeys={["title", "category", "author"]}
          onAdd={openAdd}
          addLabel="Tambah Berita"
          onEdit={openEdit}
          onDelete={(item) => setDeleteModal(item)}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Berita" : "Tambah Berita"}
        wide
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
        <FormField label="Judul" required error={errors.title}>
          <input
            className={`admin-form-input ${errors.title ? "error" : ""}`}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Judul berita"
          />
        </FormField>

        <FormField label="Ringkasan" required error={errors.excerpt}>
          <input
            className={`admin-form-input ${errors.excerpt ? "error" : ""}`}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Ringkasan singkat berita"
          />
        </FormField>

        <div className="admin-form-row">
          <FormField label="Kategori">
            <select
              className="admin-form-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Prestasi">Prestasi</option>
              <option value="Pendaftaran">Pendaftaran</option>
              <option value="Alumni">Alumni</option>
              <option value="Kerjasama">Kerjasama</option>
              <option value="Event">Event</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </FormField>
          <FormField label="Status">
            <select
              className="admin-form-select"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as NewsItem["status"] })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </FormField>
        </div>

        <FormField label="Konten" required error={errors.content}>
          <textarea
            className={`admin-form-textarea ${errors.content ? "error" : ""}`}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Isi konten berita..."
            rows={6}
          />
        </FormField>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        itemName={deleteModal?.title || ""}
      />

      {/* Toast */}
      {toast && <div className="admin-toast success">{toast}</div>}
    </>
  );
}
