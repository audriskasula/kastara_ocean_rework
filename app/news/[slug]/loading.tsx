import { ArticleSkeleton } from "@/components/PublicSkeletons";

export default function Loading() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-white">
      <ArticleSkeleton />
    </div>
  );
}
