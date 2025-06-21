export default function WritingLoading() {
  return (
    <div className="space-y-24">
      {/* Info Block Skeleton */}
      <div className="mb-0">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-20 mb-2 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6 animate-pulse"></div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"
            ></div>
          ))}
        </div>

        {/* Posts List Skeleton */}
        <div className="flex flex-col space-y-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="py-4 px-3 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded flex-1 max-w-md"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 ml-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
