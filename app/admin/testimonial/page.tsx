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
  initialTestimonials,
  formatDate,
  type Testimonial,
} from "../mockData";

const emptyForm = {
  name: "",
  program: "",
  workplace: "",
  rating: "5.0",
  text: "",
  image: "/heroHome.png",
  country: "id",
  countryName: "Indonesia",
};

type FormData = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function TestimonialPage() {
  const [data, setLocalData] = useState<Testimonial[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Testimonial | null>(null);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    setLocalData(getData("testimonials", initialTestimonials));
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.program.trim()) e.program = "Program wajib diisi";
    if (!form.workplace.trim()) e.workplace = "Tempat kerja wajib diisi";
    if (!form.text.trim()) e.text = "Testimoni wajib diisi";
    const rating = parseFloat(form.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) e.rating = "Rating harus 0-5";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditItem(item);
    setForm({
      name: item.name,
      program: item.program,
      workplace: item.workplace,
      rating: String(item.rating),
      text: item.text,
      image: item.image,
      country: item.country,
      countryName: item.countryName,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!validate()) return;

    let updated: Testimonial[];
    if (editItem) {
      updated = data.map((d) =>
        d.id === editItem.id
          ? { ...d, ...form, rating: parseFloat(form.rating) }
          : d
      );
      showToast("Testimonial berhasil diperbarui");
    } else {
      const newItem: Testimonial = {
        id: generateId(),
        ...form,
        rating: parseFloat(form.rating),
        createdAt: new Date().toISOString().split("T")[0],
      };
      updated = [...data, newItem];
      showToast("Testimonial berhasil ditambahkan");
    }

    setLocalData(updated);
    setData("testimonials", updated);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteModal) return;
    const updated = data.filter((d) => d.id !== deleteModal.id);
    setLocalData(updated);
    setData("testimonials", updated);
    setDeleteModal(null);
    showToast("Testimonial berhasil dihapus");
  };

  const columns: Column<Testimonial>[] = [
    { key: "name", label: "Nama" },
    { key: "program", label: "Program" },
    { key: "workplace", label: "Tempat Kerja" },
    {
      key: "rating",
      label: "Rating",
      render: (item) => (
        <span style={{ fontWeight: 600, color: "#f59e0b" }}>⭐ {item.rating}</span>
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
      <AdminHeader title="Testimonial" subtitle="Kelola data testimoni alumni" />
      <div className="admin-content">
        <DataTable
          columns={columns}
          data={data}
          searchKeys={["name", "program", "workplace"]}
          onAdd={openAdd}
          addLabel="Tambah Testimonial"
          onEdit={openEdit}
          onDelete={(item) => setDeleteModal(item)}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Testimonial" : "Tambah Testimonial"}
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
        <div className="admin-form-row">
          <FormField label="Nama" required error={errors.name}>
            <input
              className={`admin-form-input ${errors.name ? "error" : ""}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama alumni"
            />
          </FormField>
          <FormField label="Program" required error={errors.program}>
            <select
              className={`admin-form-select ${errors.program ? "error" : ""}`}
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
            >
              <option value="">Pilih program</option>
              <option value="Program Kapal Pesiar">Kapal Pesiar</option>
              <option value="Program Perhotelan">Perhotelan</option>
              <option value="Program Food & Beverage">Food & Beverage</option>
              <option value="Program Housekeeping">Housekeeping</option>
            </select>
          </FormField>
        </div>

        <div className="admin-form-row">
          <FormField label="Tempat Kerja" required error={errors.workplace}>
            <input
              className={`admin-form-input ${errors.workplace ? "error" : ""}`}
              value={form.workplace}
              onChange={(e) => setForm({ ...form, workplace: e.target.value })}
              placeholder="Contoh: Royal Caribbean"
            />
          </FormField>
          <FormField label="Rating" required error={errors.rating}>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className={`admin-form-input ${errors.rating ? "error" : ""}`}
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />
          </FormField>
        </div>

        <div className="admin-form-row">
          <FormField label="Negara">
            <input
              className="admin-form-input"
              value={form.countryName}
              onChange={(e) => setForm({ ...form, countryName: e.target.value })}
              placeholder="Contoh: Indonesia"
            />
          </FormField>
          <FormField label="Kode Negara">
            <input
              className="admin-form-input"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder="Contoh: id"
            />
          </FormField>
        </div>

        <FormField label="Testimoni" required error={errors.text}>
          <textarea
            className={`admin-form-textarea ${errors.text ? "error" : ""}`}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Cerita pengalaman alumni..."
            rows={4}
          />
        </FormField>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        itemName={deleteModal?.name || ""}
      />

      {/* Toast */}
      {toast && <div className="admin-toast success">{toast}</div>}
    </>
  );
}
