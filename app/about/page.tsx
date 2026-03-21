import React from "react";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";
import CheckListIcon from "@/icons/ChecklistIcon2";
import Link from "next/link";

export default function About() {
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-22 md:pb-24 md:pt-40">
          <div className="text-center max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
                Tentang Kami
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Menghubungkan <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Talenta Terbaik</span> ke Seluruh Dunia
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Kastara Ocean adalah mitra tepercaya Anda dalam meraih karier internasional di industri perhotelan dan kapal pesiar. Kami berdedikasi untuk membuka jalan sukses bagi profesional muda Indonesia.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── VISI & MISI ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] w-full bg-gray-200">
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Visi & Misi Kami</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      Visi
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Menjadi jembatan utama dan agensi tenaga kerja terdepan di Indonesia yang mengantarkan talenta lokal menuju panggung perhotelan dan kapal pesiar global secara profesional dan berintegritas.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      Misi
                    </h3>
                    <ul className="text-gray-600 leading-relaxed space-y-2 list-disc pl-5 marker:text-primary">
                      <li>Memberikan pelatihan dan persiapan standar internasional.</li>
                      <li>Memastikan penempatan kerja yang aman, legal, dan sesuai kompetensi.</li>
                      <li>Menjalin kemitraan jangka panjang dengan perusahaan pelayaran dan hotel top dunia.</li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATISTIK ── */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
            {[
              { label: "Talenta Tersalurkan", val: "500+" },
              { label: "Partner Global", val: "50+" },
              { label: "Penghargaan", val: "15" },
              { label: "Tahun Pengalaman", val: "10+" },
            ].map((stat, i) => (
              <StaggerItem key={i}>
                <h3 className="text-4xl md:text-5xl font-extrabold mb-2">{stat.val}</h3>
                <p className="text-white/80 font-medium">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── NILAI KAMI (VALUES) ── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Nilai-Nilai Utama</h2>
            <p className="text-gray-600">Prinsip kerja yang kami junjung tinggi dalam memberikan pelayanan terbaik kepada mitra dan para kandidat kami.</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {[
              { title: "Integritas", desc: "Berkomitmen penuh pada kejujuran dan transparansi di setiap tahap proses rekrutmen." },
              { title: "Kualitas", desc: "Menjamin kompetensi setiap kandidat melalui seleksi ketat dan pelatihan berstandar global." },
              { title: "Keamanan", desc: "Mengedepankan legalitas, keamanan, dan kesejahteraan kandidat di tempat kerja internasional." },
            ].map((val, i) => (
              <StaggerItem key={i}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-6">
                    <CheckListIcon />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{val.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Siap Memulai Perjalanan Karier Anda?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">Jangan ragu untuk bertanya atau berkonsultasi mengenai peluang kerja di luar negeri. Tim agen kami siap membantu 24/7.</p>
            <Link href="/contact" className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-rose-700 hover:shadow-lg transition-all duration-300">
              Hubungi Kami Sekarang
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
