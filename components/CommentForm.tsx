"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CommentForm() {
  const [form, setForm] = useState({ author: "", email: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.author || !form.email || !form.comment) {
      setError("Semua bidang harus diisi.");
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase
      .from("comments")
      .insert([
        {
          author: form.author,
          email: form.email,
          comment: form.comment,
          page: "Home",
          status: "pending",
        },
      ]);

    setLoading(false);

    if (insertError) {
      console.error("Gagal mengirim komentar:", insertError);
      setError("Maaf, gagal mengirim komentar. Apakah admin sudah mengizinkan insert?");
    } else {
      setSubmitted(true);
      setForm({ author: "", email: "", comment: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Tinggalkan Komentar</h3>
        <p className="text-gray-500 text-base max-w-lg mx-auto">Masukan dan opini Anda sangat berarti bagi pengembangan situs Kastara.</p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-emerald-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="w-8 h-8">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-emerald-700 text-xl font-bold">Terima kasih atas tanggapan Anda!</p>
          <p className="text-emerald-600/80 text-base mt-2">Komentar Anda akan ditinjau segera oleh admin kami.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="masukan nama lengkap"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Alamat Email</label>
              <input
                type="email"
                placeholder="masukan email"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Kesan & Pesan</label>
            <textarea
              placeholder="Ceritakan pengalaman atau masukan Anda..."
              rows={5}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium resize-none"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm py-3 px-4 rounded-lg border border-red-100 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              {error}
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-rose-700 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-1 w-full md:w-auto disabled:opacity-50 disabled:translate-y-0 flex justify-center items-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  Kirim Komentar
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
