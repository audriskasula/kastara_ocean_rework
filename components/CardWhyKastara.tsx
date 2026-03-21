"use client";

import { kelebihanKastara } from "@/app/dataText";
import CheckListIcon from "@/icons/ChecklistIcon2";
import Image from "next/image";
import { StaggerContainer, StaggerItem } from "./MotionComponents";

export default function CardWhyKastara() {
  return (
    <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
      {kelebihanKastara.map((item, index) => (
        <StaggerItem key={index}>
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0px_4px_30px_rgba(0,0,0,0.05)] p-5 w-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-center gap-5 mb-2">
              <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Image src={item?.icon} width={50} height={50} alt="" />
              </div>
              <div className="text-gray-200">|</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 flex-shrink-0">
                    <CheckListIcon />
                  </span>
                  <p className="font-semibold text-lg m-0">{item.title}</p>
                </div>
                <p className="text-sm text-gray-500 m-0 mt-0.5">{item.desc}</p>
              </div>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
