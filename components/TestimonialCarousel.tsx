"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface TestimonialItem {
  id: string;
  name: string;
  program: string;
  workplace: string;
  image?: string;
  rating?: number;
  text: string;
  country?: string;
  countryName?: string;
}

/** Seeded shuffle (Fisher-Yates) — seed berubah tiap hari */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDailySeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

const SLIDE_DURATION = 5000; // ms per slide

export default function TestimonialCarousel() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  // Fetch & shuffle once on mount
  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .then(({ data }) => {
        if (data && data.length > 0) {
          const seed = getDailySeed();
          setItems(seededShuffle(data as TestimonialItem[], seed));
        }
        setLoading(false);
      });
  }, []);

  const paginate = useCallback((newDirection: number) => {
    setCurrent((prevCurrent) => {
      let nextCurrent = prevCurrent + newDirection;
      if (nextCurrent < 0) {
         nextCurrent = items.length - 1;
      } else if (nextCurrent >= items.length) {
         nextCurrent = 0;
      }
      return nextCurrent;
    });
  }, [items.length]);

  const next = useCallback(() => paginate(1), [paginate]);
  const prev = useCallback(() => paginate(-1), [paginate]);

  // Handle dot click
  const goToSlide = (index: number) => {
    setCurrent(index);
  }

  // Auto-play
  useEffect(() => {
    if (items.length === 0 || paused) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [items.length, paused, next]);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden py-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full md:min-w-[300px] h-64 rounded-2xl bg-gray-100 animate-pulse flex-shrink-0"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10">
        Belum ada testimonial tersedia.
      </p>
    );
  }

  const displayItems = items.length > 0 ? [...items, items[0], items[1]].filter(Boolean) : [];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        .testimonial-track {
          --slide-shift: -100%;
        }
        @media (min-width: 768px) {
          .testimonial-track {
            --slide-shift: -33.333333%;
          }
        }
      `}</style>
      {/* Slide area */}
      <div className="overflow-hidden rounded-2xl py-2">
        <div 
          className="flex testimonial-track transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(${current} * var(--slide-shift)))` }}
        >
          {displayItems.map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`} 
              className="w-full md:w-1/3 shrink-0 px-2.5 pb-4 flex"
            >
              <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col w-full overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  {/* Photo */}
                  {item.image && (
                    <div className="relative w-full h-48 md:h-52 shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={`Foto ${item.name}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 relative">
                    {/* Country flag */}
                    {item.country && (
                      <div className="absolute top-0 right-6 -translate-y-1/2 rounded overflow-hidden shadow-md border-2 border-white w-10 h-7 bg-white">
                        <Image
                          src={`https://flagcdn.com/w80/${item.country.toLowerCase()}.png`}
                          alt={item.countryName || item.country}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="40px"
                        />
                      </div>
                    )}

                    {/* Quote icon */}
                    <svg
                      className="w-7 h-7 text-primary/20 mb-3 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    <p className="text-gray-600 text-sm leading-relaxed italic line-clamp-4 flex-1 mb-4">
                      &ldquo;{item.text}&rdquo;
                    </p>

                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <p className="font-bold text-gray-900 text-base leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-0.5">
                        {item.program}
                      </p>
                      <p className="text-xs text-blue-900 font-bold mt-0.5 line-clamp-1">
                        {item.workplace}
                      </p>
                      {item.rating != null && (
                        <div className="mt-2">
                          <StarRating rating={item.rating} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Dot indicators */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 flex-shrink-0 ${
                i === current
                  ? "w-6 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="flex gap-2 shrink-0 ml-4">
          <button
            onClick={prev}
            aria-label="Sebelumnya"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Berikutnya"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="mt-4 h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            key={`bar-${current}`}
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}
