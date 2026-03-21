"use client";

import { gambarRuangan } from "@/app/dataText";
import CheckListIcon from "@/icons/ChecklistIcon2";
import Image from "next/image";
import { StaggerContainer, StaggerItem } from "./MotionComponents";

export default function CardFasilitas() {
  return (
    <StaggerContainer
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5"
      staggerDelay={0.12}
    >
      {gambarRuangan.map((item, index) => (
        <StaggerItem key={index}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_30px_rgba(0,0,0,0.05)] w-full h-full overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
            {/* Image */}
            <div className="w-full overflow-hidden">
              <Image
                src={item?.image}
                width={400}
                height={300}
                alt={item?.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
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
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
