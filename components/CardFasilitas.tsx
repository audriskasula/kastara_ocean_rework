"use client";

import {  gambarRuangan } from "@/app/dataText";
import CheckListIcon from "@/icons/ChecklistIcon2";
import Image from "next/image";

export default function CardFasilitas() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      {gambarRuangan.map((item, index) => (
        <div key={index}>
          <div className="bg-white rounded-xl shadow-[0px_4px_30px_rgba(0,0,0,0.06)] w-full h-full hover:shadow-xl transition">
            <div className="flex justify-center items-center flex-col mb-4">
              {/* ICON / IMAGE */}
              <div>
                <Image
                  src={item?.image}
                  width={400}
                  height={400}
                  alt={item?.title}
                  className="w-full mb-5"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">
                    <CheckListIcon />
                  </span>
                  <p className="font-semibold text-lg">{item.title}</p>
                </div>
                {/* <p className="text-sm text-gray-600 mt-1">{item.desc}</p> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
