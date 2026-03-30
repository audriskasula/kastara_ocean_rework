import Skeleton from "./Skeleton";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionComponents";

export const GallerySkeleton = () => (
  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {[...Array(8)].map((_, i) => (
      <StaggerItem key={i}>
        <Skeleton height="256px" borderRadius="1.5rem" className="w-full" />
      </StaggerItem>
    ))}
  </StaggerContainer>
);

export const NewsCardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <Skeleton height="200px" />
        <div className="p-6">
          <Skeleton width="40%" height="20px" className="mb-4" />
          <Skeleton width="90%" height="28px" className="mb-2" />
          <Skeleton width="70%" height="28px" className="mb-4" />
          <Skeleton width="100%" height="16px" className="mb-2" />
          <Skeleton width="100%" height="16px" className="mb-6" />
          <Skeleton width="120px" height="40px" borderRadius="10px" />
        </div>
      </div>
    ))}
  </div>
);

export const TestimonialSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton width="64px" height="64px" borderRadius="999px" />
            <div>
              <Skeleton width="120px" height="20px" className="mb-2" />
              <Skeleton width="80px" height="16px" />
            </div>
          </div>
          <Skeleton width="100%" height="16px" className="mb-2" />
          <Skeleton width="100%" height="16px" className="mb-2" />
          <Skeleton width="80%" height="16px" />
        </div>
      ))}
    </div>
  );

export const ArticleSkeleton = () => (
  <div className="max-w-4xl mx-auto px-6 py-20">
    <Skeleton width="150px" height="24px" className="mb-6 mx-auto" />
    <Skeleton width="80%" height="48px" className="mb-8 mx-auto" />
    <div className="flex justify-center gap-4 mb-12">
        <Skeleton width="120px" height="20px" />
        <Skeleton width="120px" height="20px" />
    </div>
    <Skeleton height="400px" borderRadius="2rem" className="mb-12" />
    <div className="space-y-4">
        <Skeleton width="100%" height="20px" />
        <Skeleton width="100%" height="20px" />
        <Skeleton width="90%" height="20px" />
        <Skeleton width="100%" height="20px" />
        <Skeleton width="95%" height="20px" />
    </div>
  </div>
);
