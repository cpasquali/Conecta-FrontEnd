export const PostInfoSkeleton = () => {
  return (
    <section className="flex flex-col gap-8 px-6 sm:px-20 py-10 w-full max-w-5xl mx-auto animate-pulse">
      <div className="w-40 h-10 bg-gray-300 rounded"></div>

      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-gray-300"></div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="flex gap-6 my-[-16px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
        <div className="w-2/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-32 h-4 bg-gray-300 mt-2 rounded"></div>
      </div>

      <div className="flex gap-2">
        <div className="flex-grow h-10 bg-gray-200 rounded"></div>
        <div className="w-24 h-10 bg-gray-300 rounded"></div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="flex flex-col gap-2 w-full">
              <div className="w-1/3 h-3 bg-gray-300 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
