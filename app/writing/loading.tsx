export default function Loading() {
  return (
    <div className="min-h-dvh">
      {/* Category Header */}
      <div className="skeleton_wrapper w-20 h-6 mb-2"></div>

      {/* Page Title Section */}
      <div className="space-y-2 mb-8">
        <div className="skeleton_wrapper w-full h-4"></div>
        <div className="skeleton_wrapper w-5/6 h-4"></div>
        <div className="skeleton_wrapper w-4/6 h-4"></div>
      </div>

      <div className="space-y-4">
        {/* Filter Tags */}
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton_wrapper w-16 h-7 rounded-md" />
            ))}
          </div>
        </div>

        {/* Blog Post List */}
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg p-4">
              <div className="skeleton_wrapper w-32 h-4"></div>
              <div className="skeleton_wrapper flex-1 max-w-md h-5"></div>
              <div className="skeleton_wrapper w-24 h-4 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
