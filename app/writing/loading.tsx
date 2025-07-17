export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="h-6 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-7 w-16 bg-gray-200 rounded-md animate-pulse" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-5 bg-gray-200 rounded flex-1 max-w-md"></div>
              <div className="h-4 bg-gray-200 rounded w-24 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
