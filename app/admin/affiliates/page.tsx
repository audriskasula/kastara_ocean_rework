"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminHeader from "@/components/admin/AdminHeader";
import FormField from "@/components/admin/FormField";
import { Copy, ExternalLink, Info, Award, MousePointer2 } from "lucide-react";

export default function AffiliatePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState({
    phone: "",
    googleFormUrl: "",
    code: "",
  });

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/affiliates?userId=${user.id}`);
      const data = await res.json();
      if (data.data) {
        setAffiliate(data.data);
        setForm({
          phone: data.data.phone || "",
          googleFormUrl: data.data.google_form_url || "",
          code: data.data.code || "",
        });
      }
    } catch (error) {
      console.error("Error fetching affiliate:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!form.code || !form.googleFormUrl) {
      showToast("Kode dan Google Form URL wajib diisi", "error");
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch("/api/affiliates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...form,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan");

      setAffiliate(result.data);
      setIsEditing(false);
      showToast("Affiliate berhasil diperbarui!");
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/pendaftaran/${affiliate.code}`;
    navigator.clipboard.writeText(link);
    showToast("Link disalin ke clipboard!");
  };

  if (loading) return (
    <div className="admin-content flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <>
      <AdminHeader
        title="Affiliate Marketing"
        subtitle="Kelola link pendaftaran personal Anda dan pantau performa lead."
      />

      <div className="admin-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT: STATS & LINK ── */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-6">

            {/* Main Info Card */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Award size={120} />
              </div>

              <div className="relative z-10">
                {affiliate ? (
                  <span className="inline-flex items-center gap-2 bg-green-50 text-green-600 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    Tidak Aktif
                  </span>
                )}

                <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
                  Link Affiliate Anda
                </h3>
                <p className="text-slate-500 text-sm mb-6">Gunakan link ini untuk promosi di media sosial atau WhatsApp.</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className={`flex-1 border rounded-2xl px-5 py-4 font-mono text-sm flex items-center overflow-hidden ${affiliate ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-50/50 border-slate-100 text-slate-400'}`}>
                    <span className="truncate">
                      {typeof window !== 'undefined' ? window.location.origin : ''}/pendaftaran/{affiliate?.code || "..."}
                    </span>
                  </div>
                  <button
                    onClick={copyLink}
                    disabled={!affiliate}
                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Copy size={18} />
                    Salin Link
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <MousePointer2 size={24} />
                  </div>
                </div>
                <div className={`text-3xl font-black ${affiliate ? 'text-slate-900' : 'text-slate-300'}`}>{affiliate?.click_count || 0}</div>
                <div className="text-slate-500 font-medium text-sm">Total Klik / Lead</div>
              </div>

              <div className={`rounded-[32px] p-8 shadow-xl relative overflow-hidden transition-all ${affiliate ? 'bg-slate-900 text-white' : 'bg-slate-50 border border-slate-100 text-slate-400'}`}>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <ExternalLink size={100} />
                </div>
                <div className="relative z-10">
                  <div className="text-sm font-bold opacity-60 mb-1">Target Redirect</div>
                  <div className={`text-base font-semibold truncate mb-4 ${affiliate ? 'opacity-90' : 'opacity-40 italic'}`}>
                    {affiliate?.google_form_url || "Belum dikonfigurasi"}
                  </div>
                  {affiliate ? (
                    <a
                      href={affiliate.google_form_url}
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      Buka Form <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-slate-200/50 px-4 py-2 rounded-xl text-sm font-bold cursor-not-allowed">
                      Buka Form <ExternalLink size={14} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: CONFIG FORM ── */}
          <div className="lg:col-span-12 xl:col-span-5">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                Konfigurasi Affiliate
              </h4>

              <form onSubmit={handleSave} className="space-y-5">
                <FormField label="Kode Affiliate" required>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">/pendaftaran/</span>
                    <input
                      className="admin-form-input !pl-32 font-mono"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    // placeholder="contoh: admin"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Hanya huruf kecil, angka, dan strip.</p>
                </FormField>

                <FormField label="Link Google Form Personal" required>
                  <input
                    className="admin-form-input"
                    value={form.googleFormUrl}
                    onChange={(e) => setForm({ ...form, googleFormUrl: e.target.value })}
                    placeholder="https://docs.google.com/forms/d/..."
                  />
                </FormField>

                <FormField label="Nomor WhatsApp Admin">
                  <input
                    className="admin-form-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0812..."
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Nomor Anda yang akan dihubungi pendaftar jika butuh bantuan.</p>
                </FormField>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full bg-primary hover:bg-rose-700 text-white font-bold py-4 rounded-2xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {actionLoading ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>

              {/* HELP BOX */}
              <div className="mt-10 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
                  <Info size={16} className="text-blue-500" />
                  Cara Integrasi Google Form Anda
                </div>
                <ol className="text-xs text-slate-600 space-y-3 list-decimal pl-4 leading-relaxed">
                  <li>
                    <strong className="text-slate-900">PENTING:</strong> Gunakan opsi <strong>"Make a copy"</strong> pada Google Form Master Kastara Ocean. Jangan membuat form baru dari nol agar sistem bisa mengenali data Anda.
                  </li>
                  <li>Buka Google Form hasil copy tersebut.</li>
                  <li>Klik tombol <strong>"Kirim"</strong> di pojok kanan atas.</li>
                  <li>Pilih ikon <strong>Link</strong> (rantai) di tengah.</li>
                  <li>Salin link tersebut (misal: `https://docs.google.com/forms/d/e/XXX/viewform`).</li>
                  <li>
                    <strong className="text-slate-900">Ubah akhiran:</strong> Ganti bagian <strong>/viewform</strong> menjadi <strong>/formResponse</strong> saat menempelkan di kolom link di atas.
                  </li>
                  <li>Klik <strong>Simpan Perubahan</strong>.</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-[10px] text-blue-700 font-medium">
                    Jika link tidak diubah ke <strong>/formResponse</strong>, data pendaftar tidak akan masuk ke spreadsheet Anda secara otomatis melalui website.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

      <style jsx>{`
      .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}</style>
    </>
  );
}
