"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";
import { GallerySkeleton } from "@/components/PublicSkeletons";
import { supabase } from "@/lib/supabase";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setImages(data || []);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

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
              <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Kastara Ocean</span>
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
          {loading ? (
            <GallerySkeleton />
          ) : images.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.1}>
              {images.map((img, idx) => (
                <StaggerItem key={img.id || idx}>
                  <div
                    className="relative group rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 h-64 w-full bg-gray-100"
                    onClick={() => setSelectedImage(img.src)}
                  >
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <Image
                      src={img.src}
                      alt={img.alt || "Gallery image"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                    />

                    {/* Overlay Text */}
                    {img.alt && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                        <h2 className="text-white font-semibold text-sm line-clamp-2">{img.alt}</h2>
                      </div>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-20 text-gray-500 font-medium h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl">
              Belum ada foto dalam galeri.
            </div>
          )}
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
              sizes="100vw"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}