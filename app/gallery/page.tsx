"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";

const galleryImages = [
  { src: "/heroHome.png", alt: "Siswa sekolah kapal pesiar sedang praktek", span: "md:col-span-2 md:row-span-2" },
  { src: "/ruangFnB.svg", alt: "Fasilitas Food & Beverage sekolah perhotelan", span: "md:col-span-1 md:row-span-1" },
  { src: "/ruangKelas.svg", alt: "Ruang kelas interaktif pendidikan kerja cepat", span: "md:col-span-1 md:row-span-1" },
  { src: "/ruangHousekeeping.svg", alt: "Praktek Housekeeping LPK perhotelan siap kerja", span: "md:col-span-2 md:row-span-1" },
  { src: "/heroHome1.png", alt: "Kegiatan belajar standar internasional kapal pesiar", span: "md:col-span-1 md:row-span-1" },
  { src: "/heroHome2.png", alt: "Lulusan unggulan kursus kerja hotel dan cruise", span: "md:col-span-1 md:row-span-1" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="overflow-x-hidden min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-22 md:pb-24 md:pt-40 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
              Galeri Kami
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Fasilitas & Dokumentasi <br className="hidden md:block" />
              <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Sekolah Kapal Pesiar</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Intip sekilas kegiatan dan kelengkapan fasilitas standar global di sekolah perhotelan Kastara Ocean yang akan mendukung perjalanan Anda menuju industri perhotelan mewah dan kapal pesiar.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── GALLERY GRID ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6" staggerDelay={0.1}>
            {galleryImages.map((img, idx) => (
              <StaggerItem key={idx}>
                <div
                  className={`relative group rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 h-full w-full ${img.span}`}
                  onClick={() => setSelectedImage(img.src)}
                >
                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <h2 className="text-white font-semibold text-lg">{img.alt}</h2>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={selectedImage}
              alt="Zoomed gallery image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}