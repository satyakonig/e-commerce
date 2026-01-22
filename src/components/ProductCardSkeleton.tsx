import { Skeleton } from "../common/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-64" />

      <div className="p-4">
        {/* Category Badge Skeleton */}
        <Skeleton className="h-5 w-20 mb-3" />

        {/* Product Name Skeleton */}
        <Skeleton className="h-6 w-full mb-2" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Rating and Price Row Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Stock Skeleton */}
        <Skeleton className="h-4 w-24 mb-4" />

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
