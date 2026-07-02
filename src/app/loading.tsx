import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero skeleton */}
        <div className="mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4 rounded-xl" />
          <Skeleton className="h-5 w-96 mx-auto rounded-lg" />
        </div>

        {/* Featured section skeleton */}
        <div className="space-y-4 mb-10">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>

        {/* Second section skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-36" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
