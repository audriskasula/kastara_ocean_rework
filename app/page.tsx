import Image from "next/image";
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

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="px-5 background md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div></div>
          <div className="my-auto">
            <div className="flex flex-col items-end text-right">
              <Image
                src="/3HeroLogo.png"
                alt="Kastara Ocean Logo"
                width={180}
                height={30}
                className="mb-3"
              />
              <p className="mb-3 text-lg md:text-xl">
                KASTARA OCEAN INDONESIA
              </p>
              <p className="text-3xl md:text-5xl font-semibold leading-tight">
                Kesempatan
                <span className="text-red-700"> Berkarier</span>
                <br />
                Di Luar Negeri
                <br />
                Menunggumu!
              </p>
              <h4 className="text-xl md:text-2xl mt-3 font-normal">
                Kastara Ocean hadir untuk anda
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP HOTELS ── */}
      <section className="px-6 md:px-10 py-16">
        <div className="text-center mb-2">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Our Hotels Partnership
          </h1>
        </div>
        <PartnerSwiper data={partnershipHotel} filePath="Hotels" />
      </section>

      <hr className="section-divider" />

      {/* ── KENAPA KASTARA ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <Image
                src="/hero2.svg"
                alt="Kenapa Kastara Ocean"
                width={400}
                height={400}
                className="h-auto max-w-full"
              />
            </div>
            {/* Text + Cards */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <p className="text-3xl md:text-5xl font-bold leading-tight">
                  Kenapa <br />
                  Harus{" "}
                  <span className="text-pink-600">Kastara Ocean</span>?
                </p>
                <h3 className="mt-2 text-gray-500">
                  Kelebihan Kastara Ocean
                </h3>
              </div>
              <CardWhyKastara />
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── PARTNERSHIP CRUISE ── */}
      <section className="px-6 md:px-10 py-16">
        <div className="text-center mb-2">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Our Cruise Ship Partnership
          </h1>
        </div>
        <PartnerSwiper
          data={partnershipCruise}
          filePath="Cruise"
          delay={3000}
        />
      </section>

      <hr className="section-divider" />

      {/* ── FASILITAS KASTARA ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Title + List */}
            <div>
              <p className="text-3xl md:text-5xl font-semibold leading-tight">
                <span className="text-blue-600 font-bold">Fasilitas</span>
                <br />
                Kastara Ocean
              </p>
              <ul className="space-y-4 mt-8">
                {fasilitasKastara.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-gray-600 text-base md:text-lg items-start"
                  >
                    <span className="flex-shrink-0 mt-1">
                      <CheckListIcon />
                    </span>
                    <span>{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Facility Cards */}
          <div className="mt-10">
            <CardFasilitas />
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── TESTIMONIAL ── */}
      <section>
        <Testimonial />
      </section>
    </div>
  );
}
