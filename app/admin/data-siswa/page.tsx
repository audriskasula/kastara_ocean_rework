"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import FormField from "@/components/admin/FormField";
import { supabase } from "@/lib/supabase";
import { formatDate } from "../mockData";

export interface Student {
  id: string;
  name: string;
  program: string;
  batch: string;
  phone: string;
  email: string;
  status: "active" | "graduated" | "dropped";
  enroll_date: string;
  created_at: string;
}

const emptyForm = {
  name: "",
  program: "Kapal Pesiar",
  batch: "Batch 27",
  phone: "",
  email: "",
  status: "active" as Student["status"],
};

type FormData = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function DataSiswaPage() {
  const [data, setData] = useState<Student[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Student | null>(null);
  const [editItem, setEditItem] = useState<Student | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: students, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching students:", error);
    else setData(students || []);
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
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.phone.trim()) e.phone = "No. HP wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Format email tidak valid";
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
      program: item.program,
      batch: item.batch,
      phone: item.phone,
      email: item.email,
      status: item.status,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!validate()) return;

    if (editItem) {
      const { error } = await supabase
        .from("students")
        .update(form)
        .eq("id", editItem.id);

      if (error) console.error("Error updating student:", error);
      else {
        showToast("Data siswa berhasil diperbarui");
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from("students")
        .insert([{ ...form, enroll_date: new Date().toISOString().split("T")[0] }]);

      if (error) console.error("Error inserting student:", error);
      else {
        showToast("Data siswa berhasil ditambahkan");
        fetchData();
      }
    }

    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", deleteModal.id);

    if (error) console.error("Error deleting student:", error);
    else {
      showToast("Data siswa berhasil dihapus");
      fetchData();
    }
    setDeleteModal(null);
  };

  const columns: Column<Student>[] = [
    {
      key: "name",
      label: "Nama",
      render: (item) => <span style={{ fontWeight: 500 }}>{item.name}</span>,
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
          className={`admin-badge ${item.status === "active"
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
      key: "enroll_date",
      label: "Tgl Masuk",
      render: (item) => (
        <span style={{ color: "#94a3b8", fontSize: 13 }}>{formatDate(item.enroll_date)}</span>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <AdminHeader title="Data Siswa" subtitle="Kelola data siswa Kastara Ocean" />
      <div className="admin-content">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            searchKeys={["name", "nis", "program", "batch", "email"]}
            onAdd={openAdd}
            addLabel="Tambah Siswa"
            onEdit={openEdit}
            onDelete={(item) => setDeleteModal(item)}
          />
        )}
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
        <div>
          <FormField label="Nama Lengkap" required error={errors.name}>
            <input
              className={`admin-form-input ${errors.name ? "error" : ""}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama lengkap siswa"
            />
          </FormField>
        </div>

        <div className="admin-form-row">
          <FormField label="Jurusan" required>
            <select
              className="admin-form-select"
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
            >
              <option value="Food & Beverage Service">Food & Beverage Service</option>
              <option value="Food & Beverage Product">Food & Beverage Product</option>
              <option value="Housekeeping">Housekeeping</option>
            </select>
          </FormField>
          <FormField label="Batch" required>
            <select
              className="admin-form-select"
              value={form.batch}
              onChange={(e) => setForm({ ...form, batch: e.target.value })}
            >
              <option value="Batch 20">Batch 20</option>
              <option value="Batch 21">Batch 21</option>
              <option value="Batch 22">Batch 22</option>
              <option value="Batch 23">Batch 23</option>
              <option value="Batch 24">Batch 24</option>
            </select>
          </FormField>
        </div>

        <div className="admin-form-row">
          <FormField label="No. HP" error={errors.phone}>
            <input
              type="tel"
              className={`admin-form-input ${errors.phone ? "error" : ""}`}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="08xxxxxxxxxx"
            />
          </FormField>
          <FormField label="Email" error={errors.email}>
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
