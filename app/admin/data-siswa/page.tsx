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
  initialStudents,
  formatDate,
  type Student,
} from "../mockData";

const emptyForm = {
  name: "",
  nis: "",
  program: "Kapal Pesiar",
  batch: "Batch 27",
  phone: "",
  email: "",
  status: "active" as Student["status"],
};

type FormData = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function DataSiswaPage() {
  const [data, setLocalData] = useState<Student[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Student | null>(null);
  const [editItem, setEditItem] = useState<Student | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    setLocalData(getData("students", initialStudents));
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.nis.trim()) e.nis = "NIS wajib diisi";
    if (!form.phone.trim()) e.phone = "No. HP wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (item: Student) => {
    setEditItem(item);
    setForm({
      name: item.name,
      nis: item.nis,
      program: item.program,
      batch: item.batch,
      phone: item.phone,
      email: item.email,
      status: item.status,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!validate()) return;

    let updated: Student[];
    if (editItem) {
      updated = data.map((d) =>
        d.id === editItem.id ? { ...d, ...form } : d
      );
      showToast("Data siswa berhasil diperbarui");
    } else {
      const newItem: Student = {
        id: generateId(),
        ...form,
        enrollDate: new Date().toISOString().split("T")[0],
      };
      updated = [...data, newItem];
      showToast("Data siswa berhasil ditambahkan");
    }

    setLocalData(updated);
    setData("students", updated);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteModal) return;
    const updated = data.filter((d) => d.id !== deleteModal.id);
    setLocalData(updated);
    setData("students", updated);
    setDeleteModal(null);
    showToast("Data siswa berhasil dihapus");
  };

  const columns: Column<Student>[] = [
    {
      key: "name",
      label: "Nama",
      render: (item) => <span style={{ fontWeight: 500 }}>{item.name}</span>,
    },
    {
      key: "nis",
      label: "NIS",
      render: (item) => (
        <code style={{ fontSize: 12, background: "#f1f5f9", padding: "2px 8px", borderRadius: 6, color: "#475569" }}>
          {item.nis}
        </code>
      ),
    },
    { key: "program", label: "Program" },
    {
      key: "batch",
      label: "Batch",
      render: (item) => <span className="admin-badge neutral">{item.batch}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`admin-badge ${
            item.status === "active"
              ? "success"
              : item.status === "graduated"
              ? "info"
              : "danger"
          }`}
        >
          {item.status === "active"
            ? "Aktif"
            : item.status === "graduated"
            ? "Lulus"
            : "Keluar"}
        </span>
      ),
    },
    {
      key: "enrollDate",
      label: "Tgl Masuk",
      render: (item) => (
        <span style={{ color: "#94a3b8", fontSize: 13 }}>{formatDate(item.enrollDate)}</span>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <AdminHeader title="Data Siswa" subtitle="Kelola data siswa Kastara Ocean" />
      <div className="admin-content">
        <DataTable
          columns={columns}
          data={data}
          searchKeys={["name", "nis", "program", "batch", "email"]}
          onAdd={openAdd}
          addLabel="Tambah Siswa"
          onEdit={openEdit}
          onDelete={(item) => setDeleteModal(item)}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Data Siswa" : "Tambah Siswa Baru"}
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
          <FormField label="Nama Lengkap" required error={errors.name}>
            <input
              className={`admin-form-input ${errors.name ? "error" : ""}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama lengkap siswa"
            />
          </FormField>
          <FormField label="NIS" required error={errors.nis}>
            <input
              className={`admin-form-input ${errors.nis ? "error" : ""}`}
              value={form.nis}
              onChange={(e) => setForm({ ...form, nis: e.target.value })}
              placeholder="KO-2026-XXX"
            />
          </FormField>
        </div>

        <div className="admin-form-row">
          <FormField label="Program" required>
            <select
              className="admin-form-select"
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
            >
              <option value="Kapal Pesiar">Kapal Pesiar</option>
              <option value="Perhotelan">Perhotelan</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Housekeeping">Housekeeping</option>
            </select>
          </FormField>
          <FormField label="Batch" required>
            <select
              className="admin-form-select"
              value={form.batch}
              onChange={(e) => setForm({ ...form, batch: e.target.value })}
            >
              <option value="Batch 25">Batch 25</option>
              <option value="Batch 26">Batch 26</option>
              <option value="Batch 27">Batch 27</option>
              <option value="Batch 28">Batch 28</option>
            </select>
          </FormField>
        </div>

        <div className="admin-form-row">
          <FormField label="No. HP" required error={errors.phone}>
            <input
              type="tel"
              className={`admin-form-input ${errors.phone ? "error" : ""}`}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="08xxxxxxxxxx"
            />
          </FormField>
          <FormField label="Email" required error={errors.email}>
            <input
              type="email"
              className={`admin-form-input ${errors.email ? "error" : ""}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@example.com"
            />
          </FormField>
        </div>

        <FormField label="Status">
          <select
            className="admin-form-select"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as Student["status"] })}
          >
            <option value="active">Aktif</option>
            <option value="graduated">Lulus</option>
            <option value="dropped">Keluar</option>
          </select>
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
