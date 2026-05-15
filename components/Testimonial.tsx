"use client";

import { FadeIn } from "./MotionComponents";
import TestimonialCarousel from "./TestimonialCarousel";
import Link from "next/link";

export default function Testimonial() {
  return (
    <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50/40 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary font-bold mb-3">
            Kisah Sukses Alumni
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Apa Kata{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500">
              Mereka?
            </span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Keberhasilan alumni kami adalah bukti nyata kualitas pelatihan Kastara Ocean. Berganti setiap hari, selalu ada kisah baru untuk menginspirasimu.
          </p>
        </FadeIn>

        {/* Carousel */}
        <FadeIn delay={0.15}>
          <TestimonialCarousel />
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.3} className="text-center mt-10">
          <Link
            href="/testimonial"
            className="inline-block border-2 border-primary text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Lihat Semua Kisah Sukses →
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
