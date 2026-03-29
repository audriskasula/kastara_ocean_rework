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
import countryCodes from "../../countryCodes";

export interface Testimonial {
  id: string;
  name: string;
  program: string;
  workplace: string;
  text: string;
  image: string;
  country: string;
  countryName: string;
  created_at: string;
}

const emptyForm = {
  name: "",
  program: "",
  workplace: "",
  text: "",
  image: "/heroHome.png",
  country: "id",
  countryName: "Indonesia",
};

type FormData = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function TestimonialPage() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Testimonial | null>(null);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryOptions, setShowCountryOptions] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) console.error("Error fetching testimonials:", error);
    else setData(testimonials || []);
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
    if (!form.program.trim()) e.program = "Program wajib diisi";
    if (!form.workplace.trim()) e.workplace = "Tempat kerja wajib diisi";
    if (!form.text.trim()) e.text = "Testimoni wajib diisi";
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
      text: item.text,
      image: item.image,
      country: item.country,
      countryName: item.countryName,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!validate()) return;

    if (editItem) {
      const { error } = await supabase
        .from("testimonials")
        .update(form)
        .eq("id", editItem.id);
      
      if (error) {
        console.error("Error updating:", error);
      } else {
        showToast("Testimonial berhasil diperbarui");
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from("testimonials")
        .insert([form]);

      if (error) {
        console.error("Error inserting:", error);
      } else {
        showToast("Testimonial berhasil ditambahkan");
        fetchData();
      }
    }

    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", deleteModal.id);

    if (error) {
      console.error("Error deleting:", error);
    } else {
      showToast("Testimonial berhasil dihapus");
      fetchData();
    }
    setDeleteModal(null);
  };

  const columns: Column<Testimonial>[] = [
    { key: "name", label: "Nama" },
    { key: "program", label: "Program" },
    { key: "workplace", label: "Tempat Kerja" },
    {
      key: "countryName",
      label: "Negara",
      render: (item) => (
        <label className="flex items-center gap-2">
          <img src={`https://flagcdn.com/w20/${item.country}.png`} alt={item.countryName} className="w-5" />
          {item.countryName}
        </label>
      )
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
      <AdminHeader title="Testimonial" subtitle="Kelola data testimoni alumni" />
      <div className="admin-content">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            searchKeys={["name", "program", "workplace"]}
            onAdd={openAdd}
            addLabel="Tambah Testimonial"
            onEdit={openEdit}
            onDelete={(item) => setDeleteModal(item)}
          />
        )}
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
          
          <FormField label="Negara (Searchable)" required>
            <div className="relative">
              <input
                className="admin-form-input"
                value={showCountryOptions ? countrySearch : form.countryName}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setShowCountryOptions(true);
                }}
                onFocus={() => {
                  setCountrySearch("");
                  setShowCountryOptions(true);
                }}
                placeholder="Ketik nama negara..."
              />
              {showCountryOptions && (
                <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl">
                  {Object.entries(countryCodes)
                    .filter(([name]) => name.toLowerCase().includes(countrySearch.toLowerCase()))
                    .slice(0, 50) // Optimization: limit visible options for performance
                    .map(([name, code]) => (
                      <div
                        key={name}
                        className="px-4 py-2 hover:bg-rose-50 cursor-pointer flex items-center gap-3 transition-colors"
                        onClick={() => {
                          setForm({ ...form, countryName: name.charAt(0).toUpperCase() + name.slice(1), country: code });
                          setShowCountryOptions(false);
                          setCountrySearch("");
                        }}
                      >
                        <img src={`https://flagcdn.com/w20/${code}.png`} alt={name} className="w-5" />
                        <span className="text-gray-900 text-sm capitalize">{name}</span>
                      </div>
                    ))}
                  {Object.entries(countryCodes).filter(([name]) => name.toLowerCase().includes(countrySearch.toLowerCase())).length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500 italic">Negara tidak ditemukan</div>
                  )}
                </div>
              )}
              {showCountryOptions && (
                <div className="fixed inset-0 z-40" onClick={() => setShowCountryOptions(false)} />
              )}
            </div>
          </FormField>
        </div>

        <FormField label="Foto Testimonial (Rekomendasi wajah orang/Alumni)" required>
          <ImageUpload 
            value={form.image} 
            onChange={(url: string) => setForm({ ...form, image: url })} 
            folder="testimonials" 
          />
        </FormField>

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
