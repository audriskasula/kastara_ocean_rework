import { NewsCardSkeleton } from "@/components/PublicSkeletons";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="overflow-x-hidden pb-28">
      {/* ── HEADER SKELETON ── */}
      <section className="bg-slate-50 border-b border-gray-100 mb-16">
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-22 md:pb-24 md:pt-40 text-center">
            <Skeleton width="100px" height="20px" className="mx-auto mb-4" />
            <Skeleton width="60%" height="48px" className="mx-auto mb-4" />
            <Skeleton width="80%" height="24px" className="mx-auto" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <Skeleton width="150px" height="32px" className="mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <Skeleton height="400px" className="w-full" />
            <div className="p-8 lg:p-12">
              <Skeleton width="150px" height="24px" className="mb-4" />
              <Skeleton width="90%" height="40px" className="mb-4" />
              <Skeleton width="100%" height="20px" className="mb-2" />
              <Skeleton width="100%" height="20px" className="mb-2" />
              <Skeleton width="70%" height="20px" className="mb-6" />
              <Skeleton width="120px" height="40px" borderRadius="10px" />
            </div>
          </div>
        </div>

        <Skeleton width="150px" height="32px" className="mb-6" />
        <NewsCardSkeleton />
      </div>
    </div>
  );
}
