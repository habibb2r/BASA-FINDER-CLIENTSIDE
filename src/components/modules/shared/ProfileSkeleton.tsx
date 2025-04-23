import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="relative h-48 rounded-t-3xl bg-gradient-to-r from-blue-100 to-cyan-50 animate-pulse" />

      {/* Content Skeleton */}
      <div className="relative -mt-24 px-6 pb-8 pt-2">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-8">
          {/* Avatar Skeleton */}
          <Skeleton className="w-40 h-40 rounded-full border-4 border-white" />

          {/* User Info Skeleton */}
          <div className="mt-6 md:mt-0 text-center md:text-left flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border border-gray-100"
            >
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </div>

        {/* Action Buttons Skeleton */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
