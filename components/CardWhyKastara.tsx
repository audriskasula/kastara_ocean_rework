"use client";

import { kelebihanKastara } from "@/app/dataText";
import CheckListIcon from "@/icons/ChecklistIcon2";
import Image from "next/image";

export default function CardWhyKastara() {
  return (
    <div className="flex flex-col gap-4">
      {kelebihanKastara.map((item, index) => (
        <div
          key={index}
          className={index === 1 || index === 3 ? "pl-5 pr-5" : ""}
        >
          <div className="bg-white rounded-xl shadow-[0px_4px_30px_rgba(0,0,0,0.06)] p-5 w-full">
            <div className="flex items-center gap-5 mb-2">
              <div className="text-pink-600">
                <Image src={item?.icon} width={50} height={50} alt="" />
              </div>
              <div className="text-gray-300">|</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">
                    <CheckListIcon />
                  </span>
                  <p className="font-semibold text-lg m-0"> {item.title}</p>
                </div>
                <p className="text-sm text-gray-600 m-0">{item.desc}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
