"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { supabase } from "@/lib/supabase";

interface Comment {
  id: string;
  author: string;
  comment: string;
}

export default function CommentsSwiper() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    supabase
      .from("comments")
      .select("id, author, comment")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => setComments((data as Comment[]) || []));
  }, []);

  return (
    <div className="w-full h-full pb-8">
      {comments.length > 0 ? (
        <Swiper
          slidesPerView={1.1}
          spaceBetween={20}
          centeredSlides={false}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
          }}
          modules={[Pagination]}
          className="pb-4"
          grabCursor={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
        >
          {comments.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 h-full min-h-[220px] flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-gray-50">
                {/* Text */}
                <div>
                  <svg className="w-8 h-8 text-primary/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 text-base leading-relaxed line-clamp-4 italic">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                {/* User */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-rose-400 shrink-0 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-lg">
                    {item.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-base leading-tight">{item.author}</p>
                    <p className="text-xs text-gray-500 font-medium">Pengunjung Website</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center text-gray-400 py-10">Belum ada komentar terkini. Jadilah yang pertama!</div>
      )}
      {/* Custom pagination container to prevent overlap */}
      <div className="custom-swiper-pagination flex justify-center mt-8 gap-2"></div>
    </div>
  );
}
