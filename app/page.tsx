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
      {/* HERO */}
      <div className="-mt-8.75 block md:hidden">
        {/* <Image alt="" src={"/hero3mobile.png"} width={800} height={100} /> */}
      </div>
      <div className="px-5 background md:px-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div></div>
          <div className="md:pt-20 pt-10 pb-16">
            <div className="text-right">
              <p className="mb-3">KASTARA OCEAN INDONESA</p>
              <p className="text-5xl font-semibold">
                Kesempatan
                <span className="text-red-700"> Berkarier</span>
                <br />
                Di Luar Negeri
                <br />
                Menunggumu !
              </p>
              <h4 className="text-2xl mt-3">Kastara Ocean hadir untuk anda</h4>
            </div>
          </div>
        </div>
      </div>

      {/* PARTNERSHIP HOTELS */}
      <div className="px-10 mt-8">
        <div className="text-center text-3xl font-medium">
          <h1 className="font-semibold">Our Hotels Partnership</h1>
        </div>
        <PartnerSwiper data={partnershipHotel} filePath="Hotels" />
      </div>

      {/* Kenapa Kastara */}
      <section className="bg-[#FFF3F8]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* IMAGE */}
            <div className="flex justify-center">
              <Image
                src="/hero2.svg"
                alt="illustration"
                width={400}
                height={400}
                className="h-auto"
              />
            </div>
            {/* TEXT + CARD */}
            <div className="flex flex-col justify-center">
              <div className="mb-10">
                <p className="text-4xl md:text-5xl font-bold">
                  Kenapa <br />
                  Harus <span className="text-pink-600">Kastara Ocean</span>?
                </p>
                <h3>Kelebihan Kastara Ocean</h3>
              </div>
              <CardWhyKastara />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP CRUISE */}
      <div className="px-10 mt-8">
        <div className="text-center text-3xl font-medium">
          <h1 className="font-semibold">Our Cruise Ship Partneship</h1>
        </div>
        <PartnerSwiper
          data={partnershipCruise}
          filePath="Cruise"
          delay={3000}
        />
      </div>

      {/* Fasilitas Kastara */}
      <div className="mt-10">
        {/* <div>
          <BasicSwiper />
        </div> */}
        <div>
          <div>
            <div className="flex items-center flex-wrap">
              <div className="flex items-center flex-wrap bg-[#f5f3ff] me-10 py-12 px-20 rounded-tr-4xl">
                <p className="text-5xl font-semibold">
                  <span className="text-blue-600 font-bold">Fasilitas</span>{" "}
                  <br />
                  Kastara Ocean
                </p>
              </div>
              <div>
                <ul className="space-y-3">
                  {fasilitasKastara.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-5 text-gray-600 text-xl"
                    >
                      <CheckListIcon /> {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#f5f3ff] px-20">
              <CardFasilitas />
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 mt-8">
        <div className="text-center text-3xl font-medium">
          <h1 className="font-semibold">Our Cruise Ship Partneship</h1>
        </div>
        <PartnerSwiper
          data={partnershipCruise}
          filePath="Cruise"
          delay={3000}
        />
      </div>

      {/* Testimonial */}
      <div>
        <Testimonial />
      </div>
    </div>
  );
}
