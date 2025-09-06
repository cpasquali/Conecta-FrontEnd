export const ProgressBar = ({ step }) => {
  const progressBar = step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-3/3";

  return (
    <section className="w-full sm:w-[90%] mt-6 gap-4">
      <section>
        <p className="text-xs font-medium text-gray-500">{step}/3</p>
        <section className="mt-4 overflow-hidden rounded-full bg-gray-200">
          <section
            className={`h-2 ${progressBar} rounded-full bg-blue-500 transition-all duration-600 ease-in-out`}
          ></section>
        </section>
      </section>
    </section>
  );
};
