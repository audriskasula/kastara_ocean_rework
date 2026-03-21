"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import Image from "next/image";

interface PartnerProps {
  filePath: string;
  delay?: number;
  data: {
    src: string;
    name: string;
  }[];
}

export default function PartnerSwiper({
  data,
  filePath,
  delay = 2000,
}: PartnerProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        modules={[Autoplay]}
        className="mySwiper py-6"
        breakpoints={{
          480: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 32,
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.src}>
            <div className="flex items-center justify-center h-32 md:h-40 p-4 border border-transparent rounded-xl hover:bg-gray-50 hover:border-gray-100 hover:shadow-sm transition-all duration-300 group">
              <Image
                src={`/${filePath}/${item.src}`}
                width={130}
                height={100}
                alt={item.name}
                className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
