import { TestimonialSkeleton } from "@/components/PublicSkeletons";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-slate-50">
      {/* ── HERO SECTION SKELETON ── */}
      <section className="bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-22 md:pb-10 md:pt-40 text-center">
            <Skeleton width="100px" height="20px" className="mx-auto mb-4" />
            <Skeleton width="60%" height="48px" className="mx-auto mb-6" />
            <Skeleton width="80%" height="24px" className="mx-auto mb-8" />
            <Skeleton width="200px" height="56px" borderRadius="999px" className="mx-auto" />
        </div>
      </section>

      {/* ── TESTIMONIAL GRID SKELETON ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 flex flex-col h-[600px]">
                <Skeleton height="300px" className="w-full" />
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                    <Skeleton width="70%" height="32px" className="mb-2" />
                    <Skeleton width="50%" height="20px" className="mb-6" />
                    <Skeleton width="100%" height="24px" className="mb-2" />
                    <Skeleton width="100%" height="24px" className="mb-2" />
                    <Skeleton width="80%" height="24px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
