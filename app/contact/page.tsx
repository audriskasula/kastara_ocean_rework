"use client";

import React from "react";
import AgentContact from "./AgentContact";
import { FadeIn } from "@/components/MotionComponents";

export default function Contact() {
  return (
    <div className="overflow-x-hidden pt-20">
      {/* ── HERO SECTION ── */}
      <section className="bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
                Hubungi Kami
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Kami Siap <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Membantu Anda</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Punya pertanyaan tentang program kami? Konsultasikan impian karier internasional Anda bersama tim agensi kami.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CONTENT SECTION (2 Cols Desktop) ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* LEFT: INFO & AGENTS */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              <FadeIn direction="up">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-rose-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Alamat Kantor</h4>
                        <p className="text-gray-600 leading-relaxed mt-1">Gedung Kastara Tower Lt. 4<br/>Jl. Sudirman No. 45, Jakarta Selatan<br/>DKI Jakarta 12190</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-rose-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600 leading-relaxed mt-1">info@kastaraocean.com<br/>support@kastaraocean.com</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-rose-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Jam Operasional</h4>
                        <p className="text-gray-600 leading-relaxed mt-1">Senin - Jumat: 09:00 - 17:00 WIB<br/>Sabtu: 09:00 - 14:00 WIB<br/>Minggu & Libur Nasional: Tutup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <hr className="border-gray-100" />

              <FadeIn direction="up" delay={0.2}>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Agen Kami</h3>
                  <p className="text-gray-600 mb-6">Hubungi langsung representatif kami untuk respon cepat 24 jam via WhatsApp.</p>
                  <AgentContact />
                </div>
              </FadeIn>
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-7">
              <FadeIn direction="left" delay={0.3} className="h-full">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                  
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" placeholder="Masukkan nama Anda" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                        <input type="email" placeholder="nama@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50 focus:bg-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon / WA</label>
                        <input type="tel" placeholder={"08xx-xxxx-xxxx"} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tujuan Pengiriman</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50 focus:bg-white text-gray-600">
                          <option>Pertanyaan Umum</option>
                          <option>Pendaftaran Program Cruise</option>
                          <option>Pendaftaran Program Hotel</option>
                          <option>Kemitraan (Partnership)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Isi Pesan</label>
                      <textarea rows={5} placeholder="Tulis pesan atau pertanyaan Anda di sini..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50 focus:bg-white resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white font-semibold py-4 rounded-xl hover:bg-rose-700 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-4 focus:ring-primary/20">
                      Kirim Pesan Sekarang
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Dengan mengirim pesan ini, Anda menyetujui kebijakan privasi kami.
                    </p>
                  </form>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}