import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/MotionComponents";

export const metadata: Metadata = {
  title: "Program Pelatihan Perhotelan & Kapal Pesiar - Kastara Ocean",
  description: "Program pelatihan singkat persiapan kerja di hotel berbintang dan kapal pesiar. Kurikulum berstandar internasional dengan instruktur berpengalaman. Training hospitality LKP Kastara.",
};

export default function Program() {
  return (
    <div className="overflow-x-hidden min-h-screen">
      <section className="bg-slate-50 border-b border-gray-100 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
              Program Kami
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Program <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Pelatihan Siap Kerja</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Pendidikan kerja cepat selama beberapa bulan yang akan membekali Anda dengan kompetensi standar global untuk berkarier di hotel mewah dan kapal pesiar internasional.
            </p>
            <Link href="/pendaftaran" className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-rose-700 hover:shadow-lg transition-all duration-300">
              Daftar Program Sekarang
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
