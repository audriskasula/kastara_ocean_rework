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
    text: "Semoga dapat membantu dalam mencari pekerjaan dan meningkatkan skill",
    gender: "female",
  },
  {
    name: "Ahmad Raka",
    rating: 4.0,
    text: "MJC menyajikan informasi mulai dari program, basis data klien, talenta, mentor hingga tips.",
    gender: "male",
  },
  {
    name: "Dina Putri",
    rating: 5.0,
    text: "Pelayanan sangat baik dan membantu karier saya.",
    gender: "female",
  },
];

export default function SwiperTestimonial() {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1.2}
        spaceBetween={20}
        centeredSlides={false}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="pb-12"
        grabCursor={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        }}
      >
        {testimonials.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-2xl shadow-sm p-8 h-60 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              {/* Rating */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-0.5">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <StarIcon key={j} />
                      ))}
                  </div>
                  <span className="text-lg font-semibold">{item.rating}</span>
                </div>

                {/* Text */}
                <p className="text-gray-600 text-base leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* User */}
              <div className="flex items-center gap-3 mt-4">
                <Image
                  src={
                    item.gender === "female"
                      ? "/femaleAvatar.svg"
                      : "/maleAvatar.svg"
                  }
                  alt={item.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <p className="font-semibold text-base">{item.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
