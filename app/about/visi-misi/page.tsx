import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/MotionComponents";

export const metadata: Metadata = {
  title: "Visi & Misi - Kastara Ocean",
  description: "Visi dan Misi Kastara Ocean dalam mencetak talenta perhotelan dan kapal pesiar yang siap bersaing secara global.",
};

export default function VisiMisiPage() {
  return (
    <div className="overflow-x-hidden pt-28">
      {/* ── HEADER ── */}
      <section className="bg-slate-50 border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
              Nilai Pondasi Kami
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Visi & Misi Kastara Ocean
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Komitmen kami dalam menciptakan tenaga kerja profesional dan berkualitas di bidang perhotelan serta kapal pesiar internasional.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── KONTEN VISI MISI ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] w-full bg-gray-200 sticky top-32">
                <Image
                  src="/heroHome.png"
                  alt="Kastara Ocean Team"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <div>
              <FadeIn direction="right">
                <div className="space-y-8">
                  {/* Visi */}
                  <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-rose-50 text-primary flex items-center justify-center rounded-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Visi</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Menjadi lembaga pelatihan terkemuka di bidang perhotelan dan kapal pesiar yang menghasilkan lulusan berkualitas dengan kompetensi Internasional.
                    </p>
                  </div>
                  
                  {/* Misi */}
                  <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50">
                     <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-rose-50 text-primary flex items-center justify-center rounded-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Misi</h2>
                    </div>
                    <ul className="text-gray-600 leading-relaxed space-y-4 list-none">
                      {[
                        "Menyediakan program pelatihan yang komprehensif dan berstandar internasional dalam bidang perhotelan dan kapal pesiar.",
                        "Mengembangkan kurikulum yang inovatif dan relevan dengan kebutuhan industri perhotelan dan kapal pesiar, serta terus mengikuti perkembangan terbaru.",
                        "Menyediakan lingkungan belajar yang memungkinkan mahasiswa untuk mengembangkan keterampilan praktis melalui simulasi dan pengalaman langsung di industri perhotelan.",
                        "Membangun kemitraan strategis dengan perusahaan perhotelan dan kapal pesiar untuk memberikan kesempatan magang dan penempatan kerja bagi mahasiswa.",
                        "Melakukan pemantauan dan evaluasi berkala terhadap lulusan kami, serta berkomitmen untuk memberikan dukungan karir yang berkelanjutan setelah mereka lulus."
                      ].map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-primary mt-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
