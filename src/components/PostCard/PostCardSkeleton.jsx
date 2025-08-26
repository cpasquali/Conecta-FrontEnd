export const PostCardSkeleton = () => {
  return (
    <article className="w-full bg-white rounded-md p-6 animate-pulse">
      <div className="flex justify-between mb-5 border-b border-gray-100 pb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="flex flex-col justify-center gap-2">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
        <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </article>
  );
};
