import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";
import { BookOpen, Briefcase, Award, Anchor } from "lucide-react";

export const metadata: Metadata = {
  title: "Izin & Legalitas - Kastara Ocean",
  description: "Informasi legalitas dan perizinan Kastara Ocean sebagai lembaga pendidikan dan pelatihan perhotelan serta kapal pesiar resmi dan terdaftar.",
};

export default function LegalitasPage() {
  return (
    <div className="overflow-x-hidden pt-28">
      {/* ── HEADER ── */}
      <section className="bg-slate-50 border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
              Terpercaya & Resmi
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Izin & Legalitas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kastara Ocean berkomitmen menjaga kepercayaan dengan memastikan seluruh kegiatan operasional dan pelatihan memiliki landasan hukum yang sah dan tersertifikasi.
            </p>
          </FadeIn>
        </div>
      </section>
      {/* ── KONTEN LEGALITAS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 w-full max-w-5xl mx-auto">
            {/* Item 1 */}
            <StaggerItem>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-white border border-gray-100 text-primary flex items-center justify-center rounded-2xl mb-8 relative z-10 shadow-sm">
                  {/* <BookOpen strokeWidth={1.5} size={32} /> */}
                  <Image src="/tutwuri.svg" alt="tutwuri" width={60} height={60} className="mx-auto" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    Kementerian Pendidikan & Kebudayaan
                  </h3>
                  <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span><span className="font-semibold text-gray-800">NPSN:</span> K9981435</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span><span className="font-semibold text-gray-800">Kinerja (A):</span> 953/D3.02/SK/2024</span>

                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Item 2 */}
            <StaggerItem>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-white border border-gray-100 text-blue-600 flex items-center justify-center rounded-2xl mb-8 relative z-10 shadow-sm">
                  {/* <Briefcase strokeWidth={1.5} size={32} /> */}
                  <Image src="/kemnaker.svg" alt="kemnaker" width={50} height={50} className="mx-auto" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    Kementerian Ketenagakerjaan
                  </h3>
                  <div className="w-12 h-1 bg-blue-600 rounded-full mb-6"></div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="font-semibold text-gray-800">VIN:</span>
                      2105330601
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Item 3 */}
            <StaggerItem>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-white border border-gray-100 text-amber-500 flex items-center justify-center rounded-2xl mb-8 relative z-10 shadow-sm">
                  {/* <Award strokeWidth={1.5} size={32} /> */}
                  <Image src="/akreditasi.svg" alt="akreditasi" width={50} height={50} className="mx-auto" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    Lembaga Akreditasi LPK
                  </h3>
                  <div className="w-12 h-1 bg-amber-500 rounded-full mb-6"></div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span>
                        <span className="font-semibold text-gray-800">Terakreditasi:</span><span className="text-sm"> 582/LA-LPK/XII/2023</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Item 4 */}
            <StaggerItem>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-white border border-gray-100 text-emerald-600 flex items-center justify-center rounded-2xl mb-8 relative z-10 shadow-sm">
                  {/* <Anchor strokeWidth={1.5} size={32} /> */}
                  <Image src="/tuk.svg" alt="tuk" width={50} height={50} className="mx-auto" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    Tempat Uji Kompetensi <br />Perhotelan &  Kapal Pesiar
                  </h3>
                  <div className="w-12 h-1 bg-emerald-600 rounded-full mb-6"></div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0"></div>
                      <span>
                        <span className="font-semibold text-gray-800">No. Reg:</span><span className="text-sm"> 02.056/SK/LSK-PKPI/I/2025</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>

          <FadeIn delay={0.3} className="mt-16 text-center">
            <div className="bg-rose-50 w-full max-w-4xl mx-auto rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ingin Melihat Dokumen Lengkap?</h3>
              <p className="text-gray-700 mb-6">Untuk verifikasi lebih lanjut mengenai legalitas dan sertifikasi Kastara Ocean, Anda dapat langsung mengunjungi kantor kami atau menghubungi layanan dukungan kami.</p>
              <a href="/contact" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-rose-700 hover:shadow-lg transition-all duration-300">
                Hubungi Kami
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
