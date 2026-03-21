"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StarIcon from "@/icons/StarIcon";
import Image from "next/image";

const testimonials = [
  {
    name: "Ranti Sotejo",
    rating: 5.0,
    text: "Semoga dapat membantu dalam mencari pekerjaan dan meningkatkan skill untuk masa depan yang lebih baik.",
    gender: "female",
  },
  {
    name: "Ahmad Raka",
    rating: 4.8,
    text: "MJC menyajikan informasi mulai dari program, basis data klien, talenta, mentor hingga tips karier yang sangat berguna.",
    gender: "male",
  },
  {
    name: "Dina Putri",
    rating: 5.0,
    text: "Pelayanan sangat baik dan sangat membantu karier saya. Prosesnya cepat dan transparan.",
    gender: "female",
  },
];

export default function SwiperTestimonial() {
  return (
    <div className="w-full h-full pb-8">
      <Swiper
        slidesPerView={1.1}
        spaceBetween={20}
        centeredSlides={false}
        pagination={{ 
          clickable: true,
          el: '.custom-swiper-pagination', 
        }}
        modules={[Pagination]}
        className="pb-4"
        grabCursor={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        }}
      >
        {testimonials.map((item, i) => (
          <SwiperSlide key={i} className="h-auto">
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 h-full min-h-[260px] flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-gray-50">
              {/* Rating */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <StarIcon key={j} />
                      ))}
                  </div>
                  <span className="text-lg font-bold text-gray-800 ml-1">{item.rating}</span>
                </div>

                {/* Text */}
                <p className="text-gray-600 text-base leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* User */}
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border-2 border-white shadow-sm">
                  <Image
                    src={
                      item.gender === "female"
                        ? "/femaleAvatar.svg"
                        : "/maleAvatar.svg"
                    }
                    alt={item.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-base leading-tight">{item.name}</p>
                  <p className="text-sm text-gray-500 font-medium">Alumni Program</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom pagination container to prevent overlap */}
      <div className="custom-swiper-pagination flex justify-center mt-8 gap-2"></div>
    </div>
  );
}
