"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import FormField from "@/components/admin/FormField";
import ImageUpload from "@/components/admin/ImageUpload";
import { supabase } from "@/lib/supabase";
import { formatDate } from "../mockData";
import { useAuth } from "@/context/AuthContext";

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  status: "published" | "draft";
  author: string;
  created_at: string;
}

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
  const [data, setData] = useState<NewsItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<NewsItem | null>(null);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: news, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching news:", error);
    else setData(news || []);
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
    if (!form.title.trim()) e.title = "Judul wajib diisi";
    if (!form.excerpt.trim()) e.excerpt = "Ringkasan wajib diisi";
    if (!form.content.trim()) e.content = "Konten wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ ...emptyForm, author: user?.name || "Admin Kastara" });
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

  const handleSave = async () => {
    if (!validate()) return;

    if (editItem) {
      const { error } = await supabase
        .from("news")
        .update(form)
        .eq("id", editItem.id);

      if (error) console.error("Error updating news:", error);
      else {
        showToast("Berita berhasil diperbarui");
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from("news")
        .insert([form]);

      if (error) console.error("Error inserting news:", error);
      else {
        showToast("Berita berhasil ditambahkan");
        fetchData();
      }
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", deleteModal.id);

    if (error) console.error("Error deleting news:", error);
    else {
      showToast("Berita berhasil dihapus");
      fetchData();
    }
    setDeleteModal(null);
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
      <AdminHeader title="News" subtitle="Kelola berita dan artikel website" />
      <div className="admin-content">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            searchKeys={["title", "category", "author"]}
            onAdd={openAdd}
            addLabel="Tambah Berita"
            onEdit={openEdit}
            onDelete={(item) => setDeleteModal(item)}
          />
        )}
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

        <FormField label="Gambar Sampul Berita" required>
          <ImageUpload 
            value={form.image} 
            onChange={(url: string) => setForm({ ...form, image: url })} 
            folder="news" 
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
