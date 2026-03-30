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

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  created_at: string;
}

const emptyForm = {
  src: "",
  alt: "",
};

type FormData = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function AdminGalleryPage() {
  const [data, setData] = useState<GalleryItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<GalleryItem | null>(null);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: gallery, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching gallery:", error);
    else setData(gallery || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, [fetchData]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.src.trim()) e.src = "Gambar wajib diunggah";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditItem(item);
    setForm({
      src: item.src,
      alt: item.alt || "",
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!validate()) return;

    if (editItem) {
      const { error } = await supabase
        .from("gallery")
        .update(form)
        .eq("id", editItem.id);

      if (error) console.error("Error updating gallery:", error);
      else {
        showToast("Foto galeri berhasil diperbarui");
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from("gallery")
        .insert([form]);

      if (error) console.error("Error inserting gallery:", error);
      else {
        showToast("Foto galeri berhasil ditambahkan");
        fetchData();
      }
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", deleteModal.id);

    if (error) console.error("Error deleting gallery:", error);
    else {
      showToast("Foto galeri berhasil dihapus");
      fetchData();
    }
    setDeleteModal(null);
  };

  const columns: Column<GalleryItem>[] = [
    {
      key: "src",
      label: "Preview",
      render: (item) => (
        <div className="w-16 h-12 relative rounded overflow-hidden bg-gray-100">
           <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
        </div>
      ),
    },
    {
      key: "alt",
      label: "Deskripsi (Alt)",
      render: (item) => (
        <span className="text-sm text-gray-600">
          {item.alt || <em className="text-gray-400">Tidak ada deskripsi</em>}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Tanggal Diunggah",
      render: (item) => (
        <span className="text-xs text-slate-400">{formatDate(item.created_at)}</span>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <AdminHeader title="Gallery" subtitle="Kelola foto-foto galeri website" />
      <div className="admin-content">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          searchKeys={["alt"]}
          onAdd={openAdd}
          addLabel="Tambah Foto"
          onEdit={openEdit}
          onDelete={(item) => setDeleteModal(item)}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Foto" : "Tambah Foto Ke Galeri"}
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave}>
              {editItem ? "Simpan Perubahan" : "Tambah ke Galeri"}
            </button>
          </>
        }
      >
        <FormField label="Unggah Foto Galeri" required error={errors.src}>
          <ImageUpload 
            value={form.src} 
            onChange={(url: string) => setForm({ ...form, src: url })} 
            folder="gallery" 
          />
        </FormField>

        <FormField label="Deskripsi / Alt Text (Opsional)">
          <input
            className="admin-form-input"
            value={form.alt}
            onChange={(e) => setForm({ ...form, alt: e.target.value })}
            placeholder="Contoh: Kegiatan praktek housekeeping"
          />
        </FormField>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        itemName={deleteModal?.alt || "Foto ini"}
      />

      {/* Toast */}
      {toast && <div className="admin-toast success">{toast}</div>}
    </>
  );
}
