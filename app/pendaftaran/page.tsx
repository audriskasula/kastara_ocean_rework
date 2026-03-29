"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/MotionComponents";
import CheckListIcon from "@/icons/ChecklistIcon2";

export default function Pendaftaran() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    usia: "",
    nomorWhatsApp: "",
    asalSekolah: "",
    referensi: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Validasi Usia (Hanya angka)
    if (name === "usia") {
      if (value !== "" && !/^\d+$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });

    // Clear error
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = "Nama lengkap wajib diisi";
    }

    if (!formData.usia.trim()) {
      newErrors.usia = "Usia wajib diisi";
    } else if (parseInt(formData.usia) < 17 || parseInt(formData.usia) > 35) {
      newErrors.usia = "Usia harus antara 17 - 35 tahun";
    }

    if (!formData.nomorWhatsApp.trim()) {
      newErrors.nomorWhatsApp = "Nomor WhatsApp wajib diisi";
    } else if (!/^[0-9+-\s]{9,15}$/.test(formData.nomorWhatsApp)) {
      newErrors.nomorWhatsApp = "Format nomor WhatsApp tidak valid";
    }

    if (!formData.asalSekolah.trim()) {
      newErrors.asalSekolah = "Asal sekolah wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScj032d8dGuQZaf3EDaWfsgABdYbbJLkH6UPTBofHmWWll88A/formResponse";

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("entry.632031160", formData.namaLengkap);
      formDataToSubmit.append("entry.1446579973", formData.usia);
      formDataToSubmit.append("entry.2010014985", formData.nomorWhatsApp);
      formDataToSubmit.append("entry.629825756", formData.asalSekolah);
      formDataToSubmit.append("entry.2010134851", formData.referensi || "-");

      try {
        await fetch(GOOGLE_FORM_URL, {
          method: "POST",
          mode: "no-cors",
          body: formDataToSubmit,
        });

        setIsSubmitting(false);
        setIsSuccess(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
        alert("Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="overflow-x-hidden bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pb-16 pt-22 md:pb-24 md:pt-40">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── LEFT SIDE: INFO & HERO ── */}
          <div className="lg:col-span-5 flex flex-col gap-8 md:mt-4">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 bg-rose-50 text-primary font-bold text-sm px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Pendaftaran Selalu Dibuka
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Mulai Perjalanan <br className="hidden lg:block" />
                <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Karier Globalmu</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Bergabunglah dengan Kastara Ocean, institusi pelatihan dan penyalur tenaga kerja resmi untuk perhotelan mewah dan kapal pesiar internasional.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Mengapa memilih kami?</h3>
                <ul className="space-y-4">
                  {[
                    "Pendampingan dari nol hingga berangkat",
                    "Jejaring partner kapal pesiar terbesar",
                    "Fasilitas pelatihan berstandar internasional",
                    "Jaminan legalitas dan keamanan kerja"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-600 items-start">
                      <span className="text-primary flex-shrink-0 mt-0.5"><CheckListIcon /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="bg-blue-950 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-10">
                  <Image src="/logo.svg" width={150} height={150} alt="Background Logo" />
                </div>
                <h4 className="font-bold text-xl mb-2 relative z-10">Butuh Bantuan?</h4>
                <p className="text-gray-300 text-sm mb-4 relative z-10">Tim admin kami siap memandu Anda melalui WhatsApp 24/7.</p>
                <Link href={"/contact"} className="inline-block bg-white text-blue-950 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-gray-100 transition-colors relative z-10">
                  Hubungi Tim Kami
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* ── RIGHT SIDE: FORM ── */}
          <div className="lg:col-span-7 relative z-10">
            <FadeIn direction="left" delay={0.4} className="h-full">
              <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100">

                {isSuccess ? (
                  // SUCCESS STATE
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Pendaftaran Berhasil!</h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-sm mx-auto">
                      Terima kasih, <strong className="text-gray-900">{formData.namaLengkap}</strong>. Tim kami akan segera menghubungi Anda melalui WhatsApp untuk proses selanjutnya.
                    </p>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ namaLengkap: "", usia: "", nomorWhatsApp: "", asalSekolah: "", referensi: "" });
                      }}
                      className="bg-primary hover:bg-rose-700 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-md hover:shadow-lg"
                    >
                      Daftar Kembali
                    </button>
                  </div>
                ) : (
                  // FORM STATE
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Formulir Pendaftaran</h2>
                    <p className="text-gray-500 mb-8">Silakan isi data diri Anda dengan benar sesuai identitas resmi.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">

                      {/* Nama Lengkap */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="namaLengkap"
                          value={formData.namaLengkap}
                          onChange={handleChange}
                          placeholder="Sesuai KTP / Paspor"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.namaLengkap ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400`}
                        />
                        {errors.namaLengkap && <p className="text-sm text-red-500 mt-2 font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {errors.namaLengkap}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Usia */}
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Usia (Tahun) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="usia"
                            value={formData.usia}
                            onChange={handleChange}
                            inputMode="numeric"
                            placeholder="Contoh: 21"
                            className={`w-full px-5 py-3.5 rounded-xl border ${errors.usia ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400`}
                          />
                          {errors.usia && <p className="text-sm text-red-500 mt-2 font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {errors.usia}</p>}
                        </div>

                        {/* Nomor WhatsApp */}
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Nomor WhatsApp <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="nomorWhatsApp"
                            value={formData.nomorWhatsApp}
                            onChange={handleChange}
                            placeholder="Contoh: 081234567890"
                            className={`w-full px-5 py-3.5 rounded-xl border ${errors.nomorWhatsApp ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400`}
                          />
                          {errors.nomorWhatsApp && <p className="text-sm text-red-500 mt-2 font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {errors.nomorWhatsApp}</p>}
                        </div>
                      </div>

                      {/* Asal Sekolah */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Asal Sekolah / Universitas <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="asalSekolah"
                          value={formData.asalSekolah}
                          onChange={handleChange}
                          placeholder="Nama SMK, SMA, atau Universitas Terakhir"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.asalSekolah ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400`}
                        />
                        {errors.asalSekolah && <p className="text-sm text-red-500 mt-2 font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {errors.asalSekolah}</p>}
                      </div>

                      {/* Referensi (Opsional) */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Referensi (Opsional)
                        </label>
                        <input
                          type="text"
                          name="referensi"
                          value={formData.referensi}
                          onChange={handleChange}
                          placeholder="Dari mana Anda mengetahui Kastara Ocean?"
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary hover:bg-rose-700 text-white font-extrabold py-4 rounded-xl shadow-[0_8px_20px_rgba(225,29,72,0.25)] hover:shadow-[0_8px_30px_rgba(225,29,72,0.4)] hover:-translate-y-0.5 active:scale-95 active:shadow-md transition-all duration-300 disabled:opacity-70 flex justify-center items-center gap-2 text-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Memproses...
                            </>
                          ) : (
                            "Kirim Pendaftaran"
                          )}
                        </button>
                      </div>

                    </form>
                  </>
                )}

              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </div>
  );
}
