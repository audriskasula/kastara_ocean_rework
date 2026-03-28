"use client";

import CommentsSwiper from "./CommentsSwiper";
import { FadeIn } from "./MotionComponents";

export default function Testimonial() {
  return (
    <div className="bg-gradient-to-br from-rose-50 to-red-50/50">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* LEFT CONTENT */}
          <div className="md:col-span-4 bg-white flex items-center py-10 md:py-16">
            <div className="w-full px-6 md:px-12">
              <FadeIn direction="left">
                <p className="mb-1 text-primary font-semibold text-sm uppercase tracking-widest">
                  Suara Mereka
                </p>

                <h2 className="text-4xl md:text-[54px] font-bold leading-tight m-0">
                  Apa Kata <br /> Mereka?
                </h2>
              </FadeIn>

              <FadeIn direction="left" delay={0.2}>
                <div className="mt-6">
                  <h3 className="text-2xl md:text-3xl text-primary font-bold mb-2">
                    Komentar Pengunjung
                  </h3>
                  <p className="m-0 font-medium text-gray-500 text-base">
                    Baca berbagai kesan positif dan pengalaman inspiratif dari alumni dan pengunjung setia kami.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-8 flex items-center py-10 md:py-16 px-5">
            <FadeIn direction="right" className="w-full">
              <CommentsSwiper />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
