"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  fasilitasKastara,
  partnershipCruise,
  partnershipHotel,
} from "./dataText";
import PartnerSwiper from "@/components/PartnerSwiper";
import CardWhyKastara from "@/components/CardWhyKastara";
import CardFasilitas from "@/components/CardFasilitas";
import CheckListIcon from "@/icons/ChecklistIcon2";
import Testimonial from "@/components/Testimonial";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/MotionComponents";

export default function HomeClient() {
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="px-5 background md:px-20 relative">
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 h-full relative z-10">
          <div></div>
          <div className="my-auto">
            <div className="flex flex-col items-end text-right">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src="/3HeroLogo.png"
                  alt="Kastara Ocean Logo"
                  width={180}
                  height={30}
                  className="mb-3"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-3 text-lg md:text-xl tracking-wider text-gray-700"
              >
                KASTARA OCEAN INDONESIA
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-3xl md:text-5xl font-semibold leading-tight"
              >
                Kesempatan
                <span className="text-red-700"> Berkarier</span>
                <br />
                Di Luar Negeri
                <br />
                Menunggumu!
              </motion.p>

              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="text-xl md:text-2xl mt-4 font-normal text-gray-600"
              >
                Kastara Ocean hadir untuk anda
              </motion.h4>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP HOTELS ── */}
      <section className="px-6 md:px-10 py-16 md:py-20">
        <FadeIn>
          <div className="text-center mb-4">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
              Partner Kami
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Our Hotels Partnership
            </h1>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <PartnerSwiper data={partnershipHotel} filePath="Hotels" />
        </FadeIn>
      </section>

      <hr className="section-divider" />

      {/* ── KENAPA KASTARA ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <FadeIn direction="left">
              <div className="flex justify-center">
                <Image
                  src="/hero2.svg"
                  alt="Kenapa Kastara Ocean"
                  width={420}
                  height={420}
                  className="h-auto max-w-full drop-shadow-lg"
                />
              </div>
            </FadeIn>
            {/* Text + Cards */}
            <div className="flex flex-col justify-center">
              <FadeIn direction="right">
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
                    Mengapa Kami
                  </p>
                  <p className="text-3xl md:text-5xl font-bold leading-tight">
                    Kenapa <br />
                    Harus{" "}
                    <span className="text-pink-600">Kastara Ocean</span>?
                  </p>
                  <h3 className="mt-3 text-gray-500">
                    Kelebihan Kastara Ocean
                  </h3>
                </div>
              </FadeIn>
              <CardWhyKastara />
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── PARTNERSHIP CRUISE ── */}
      <section className="px-6 md:px-10 py-16 md:py-20">
        <FadeIn>
          <div className="text-center mb-4">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
              Partner Kami
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Our Cruise Ship Partnership
            </h1>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <PartnerSwiper
            data={partnershipCruise}
            filePath="Cruise"
            delay={3000}
          />
        </FadeIn>
      </section>

      <hr className="section-divider" />

      {/* ── FASILITAS KASTARA ── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Title + List */}
            <FadeIn>
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
                  Fasilitas
                </p>
                <p className="text-3xl md:text-5xl font-semibold leading-tight">
                  <span className="text-blue-600 font-bold">Fasilitas</span>
                  <br />
                  Kastara Ocean
                </p>
              </div>
            </FadeIn>
          </div>

          <StaggerContainer className="mt-8" staggerDelay={0.08}>
            <ul className="space-y-4 max-w-2xl">
              {fasilitasKastara.map((item, index) => (
                <StaggerItem key={index}>
                  <li className="flex gap-4 text-gray-600 text-base md:text-lg items-start">
                    <span className="flex-shrink-0 mt-1">
                      <CheckListIcon />
                    </span>
                    <span>{item.desc}</span>
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </StaggerContainer>

          {/* Facility Cards */}
          <div className="mt-12">
            <CardFasilitas />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section>
        <Testimonial />
      </section>
    </div>
  );
}
