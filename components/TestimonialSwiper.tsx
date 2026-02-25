"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StarIcon from "@/icons/StarIcon";

const testimonials = [
  {
    name: "Ranti Sotejo",
    rating: 5.0,
    text: "Semoga dapat membantu dalam mencari pekerjaan dan meningkatkan skill",
  },
  {
    name: "Ahmad Raka",
    rating: 4.0,
    text: "MJC menyajikan informasi mulai dari program, basis data klien, talenta, mentor hingga tips.",
  },
  {
    name: "Dina Putri",
    rating: 5.0,
    text: "Pelayanan sangat baik dan membantu karier saya.",
  },
  {
    name: "Dina Putri",
    rating: 5.0,
    text: "Pelayanan sangat baik dan membantu karier saya.",
  },
  {
    name: "Dina Putri",
    rating: 5.0,
    text: "Pelayanan sangat baik dan membantu karier saya.",
  },
];

export default function SwiperTestimonial() {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1.3} // ⭐ biar card sebelah terlihat
        spaceBetween={24}
        centeredSlides={false}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="pb-10"
        grabCursor={true}
        breakpoints={{
          768: {
            slidesPerView: 2, // desktop tampil 2 card
          },
        }}
      >
        {testimonials.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-2xl shadow-sm p-8 h-56">
              {/* rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                </div>
                <span className="text-lg font-semibold">{item.rating}</span>
              </div>

              {/* text */}
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                “
                {item.text.length > 25
                  ? item.text.substring(0, 50) + "..."
                  : item.text}
                ”
              </p>

              {/* user */}
              <div className="flex items-center gap-3">
                {/* <LazyImage
                  src=""
                  defaultImage="/static/img/avatar.svg"
                  className="rounded-full"
                  width={40}
                /> */}
                <p className="font-semibold text-base">{item.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* pagination style */}
        <style jsx global>{`
          .swiper-pagination-bullet {
            background: #d1d5db;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background: #4f46e5; /* primary */
          }
          .swiper-pagination {
            position: unset;
            margin-top: ;
          }
        `}</style>
      </Swiper>
    </div>
  );
}
