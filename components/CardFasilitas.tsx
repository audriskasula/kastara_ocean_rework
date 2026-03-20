"use client";

import { gambarRuangan } from "@/app/dataText";
import CheckListIcon from "@/icons/ChecklistIcon2";
import Image from "next/image";

export default function CardFasilitas() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      {gambarRuangan.map((item, index) => (
        <div key={index}>
          <div className="bg-white rounded-xl shadow-[0px_4px_30px_rgba(0,0,0,0.06)] w-full h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center items-center flex-col">
              {/* Image */}
              <div className="w-full">
                <Image
                  src={item?.image}
                  width={400}
                  height={400}
                  alt={item?.title}
                  className="w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 w-full">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 flex-shrink-0">
                    <CheckListIcon />
                  </span>
                  <p className="font-semibold text-lg">{item.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
