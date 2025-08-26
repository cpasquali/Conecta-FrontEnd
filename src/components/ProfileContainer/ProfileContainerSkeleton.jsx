export const ProfileContainerSkeleton = () => {
  return (
    <section className="mt-6 flex flex-col items-center justify-center gap-4 px-4 animate-pulse">
      <section className="flex items-center justify-evenly sm:justify-center sm:gap-6 w-full">
        <div className="w-14 h-14 sm:w-34 sm:h-34 rounded-full bg-gray-300 border border-gray-400"></div>
        <section className="flex flex-col items-start sm:items-start gap-2">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <section className="flex gap-6 text-sm">
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </section>
        </section>
      </section>

      <section className="flex gap-2">
        <div className="w-36 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-36 h-10 bg-gray-300 rounded-md"></div>
      </section>

      <div className="flex items-center w-full mt-6">
        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
        <span className="shrink-0 px-4 text-gray-900 dark:text-white">
          Actividad
        </span>
        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
      </div>

      <section className="flex flex-col items-center w-full max-w-xl gap-4 mt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full p-4 border-b border-gray-200 animate-pulse"
          >
            <div className="w-full h-6 bg-gray-300 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded mt-2"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded mt-2"></div>
          </div>
        ))}
      </section>
    </section>
  );
};
