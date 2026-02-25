"use client";

import { gambarRuangan } from "@/app/dataText";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BasicSwiper() {
  const [slides, setSlides] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setSlides(window.innerWidth < 640 ? 1 : 3);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Swiper
        effect={"creative"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slides}
        creativeEffect={{
          prev: {
            translate: [-400, 0, -400],
          },
          next: {
            translate: ["100%", 0, -400],
          },
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCreative, Pagination, Autoplay]}
        className="mySwiper"
      >
        {gambarRuangan.map((item, index) => (
          <SwiperSlide key={index} className="mb-20">
            <div className="rounded-3xl bg-[#F5FFFD] shadow-2xl">
              <div className="flex items-center flex-col gap-7 h-72">
                <Image alt="" src={item?.image} width={400} height={100} />
                <div className="text-center">
                  <div className="flex items-center gap-3">
                    {/* <img src={item?.profile} className='w-14' alt="" /> */}
                    <div>
                      <p className="font-semibold text-xl">{item?.title}</p>
                      {/* <p className='text-md'>{item?.country}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
