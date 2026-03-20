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
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
      }}
    >
      {data.map((item) => (
        <SwiperSlide key={item.src}>
          <div className="flex items-center justify-center h-40 md:h-52">
            <Image
              src={`/${filePath}/${item.src}`}
              width={130}
              height={100}
              alt={item.name}
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
