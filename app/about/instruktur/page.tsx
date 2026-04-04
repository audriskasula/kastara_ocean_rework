import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";

export const metadata: Metadata = {
  title: "Instruktur - Kastara Ocean",
  description: "Profil para instruktur profesional Kastara Ocean dengan pengalaman bertahun-tahun di industri perhotelan dan kapal pesiar.",
};

// Data placeholder untuk instruktur
const instructors = [
  {
    id: 1,
    name: "Mr Hary",
    role: "Owner & Instruktur Housekeeping",
    exp: "20+ Tahun di Kapal Pesiar",
    image: "/maleAvatar.svg",
    desc: "Ex Kapal Pesiar Carnival Cruise Line dengan ID Crew Line : 231767, kini menjadi Owner & Instruktur Housekeeping di Kastara Ocean"
  },
  {
    id: 2,
    name: "Miss Reri",
    role: "Owner & Instruktur F&B Services",
    exp: "10 Tahun di Hotel",
    image: "/femaleAvatar.svg",
    desc: "Mantan Executive Chef dengan keahlian kuliner global dan standar pelayanan fine dining."
  },
  {
    id: 3,
    name: "Miss Alfi",
    role: "English Teacher",
    exp: "Jebolan Kampung Inggris Pare",
    image: "/femaleAvatar.svg",
    desc: "Fokus mengajar Bahasa Inggris beserta speaking yang di asah setiap harinya"
  }
];

export default function InstrukturPage() {
  return (
    <div className="overflow-x-hidden pt-28">
      {/* ── HEADER ── */}
      <section className="bg-slate-50 border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
              Tim Pengajar
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Instruktur Profesional Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dibimbing langsung oleh praktisi berpengalaman yang telah mengemban karier cemerlang di berbagai industri perhotelan dan kapal pesiar kelas dunia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── KONTEN INSTRUKTUR ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <StaggerItem key={instructor.id}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="relative h-72 w-full bg-slate-200">
                    {/* Menggunakan userIcon sebagai placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        width={120}
                        height={120}
                        className="opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-sm text-primary font-bold mb-2 uppercase tracking-wide">
                      {instructor.role}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                    <div className="inline-flex items-center text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full mb-4">
                      {instructor.exp}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {instructor.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4} className="mt-20">
            <div className="bg-primary rounded-3xl p-10 md:p-14 text-center text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left max-w-xl">
                <h3 className="text-3xl font-bold mb-3">Siap Belajar Bersama Mereka?</h3>
                <p className="text-white/80 text-lg">
                  Bergabunglah dengan Kastara Ocean hari ini dan dapatkan ilmu dari praktisi terhebat di industri hospitality.
                </p>
              </div>
              <div>
                <a href="/pendaftaran" className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                  Daftar Sekarang
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
