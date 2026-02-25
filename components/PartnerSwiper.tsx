"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import Image from "next/image";

interface PartnerProps {
  filePath: string;
  delay? : number
  data: {
    src: string;
    name: string;
  }[];
}

export default function PartnerSwiper({ data, filePath, delay=2000 }: PartnerProps) {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.src}>
            <div className="flex items-center justify-center h-72">
              <Image
                src={`/${filePath}/${item.src}`}
                width={130}
                height={100}
                alt={item.name}
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
