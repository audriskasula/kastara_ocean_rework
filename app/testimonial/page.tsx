import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";
import { supabase } from "@/lib/supabase";

export default async function TestimonialPage() {
  const { data: testimonialsItems, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
  }

  const testimonials = testimonialsItems || [];

  return (
    <div className="overflow-x-hidden min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-22 md:pb-10 md:pt-40 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
              Kisah Sukses
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Kisah Sukses <br className="hidden md:block" />
              <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Alumni Kami</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Simak pencapaian luar biasa dari murid-murid Kastara Ocean yang kini telah sukses berkarier di berbagai kapal pesiar dan perhotelan mewah taraf internasional.
            </p>
            <Link href="/pendaftaran" className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-rose-700 hover:shadow-lg transition-all duration-300">
              Wujudkan Impian Anda
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── NEW TESTIMONIAL GRID (2 Columns with Photo on Top) ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" staggerDelay={0.1}>
            {testimonials.map((testi, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300">

                  {/* Bagian Atas: Foto Murid */}
                  <div className="relative w-full h-64 md:h-72 bg-gray-200 shrink-0">
                    <Image
                      src={testi.image || "/heroHome.png"}
                      alt={`Foto ${testi.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Bagian Bawah: Teks Ulasan */}
                  <div className="p-8 md:p-10 flex-1 flex flex-col relative bg-white z-10">
                    {/* Bendera Negara (menggantikan kutip) */}
                    {testi.country && (
                      <div className="absolute top-0 right-10 -translate-y-1/2 rounded overflow-hidden shadow-md border-2 border-white bg-white w-12 h-9 flex items-center justify-center">
                        <Image
                          src={`https://flagcdn.com/w80/${testi.country.toLowerCase()}.png`}
                          alt={`Flag of ${testi.countryName || testi.country}`}
                          width={48}
                          height={36}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}

                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">{testi.name}</h2>
                    <p className="text-primary font-semibold text-sm mb-6 uppercase tracking-wider">
                      {testi.program} <span className="text-gray-400 mx-2">•</span> <span className="text-blue-900 font-bold">{testi.workplace}</span>
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed italic flex-1 flex flex-col mb-4">
                      &ldquo;{testi.text}&rdquo;
                    </p>
                  </div>

                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
