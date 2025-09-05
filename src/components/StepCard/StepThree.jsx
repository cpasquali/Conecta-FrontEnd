export const StepThree = ({
  handleSubmit,
  handleChange,
  registerForm,
  previewImage,
  setPreviewImage,
  setStep,
}) => {
  return (
    <section className="flex flex-col gap-4 w-[80%]">
      <section className="flex justify-center items-center">
        {!previewImage ? (
          <section>
            <input
              type="file"
              className="hidden"
              id="file"
              onChange={(e) => handleChange("image", e.target.files[0])}
            />
            <label htmlFor="file" className="cursor-pointer relative">
              <img
                className="w-10 h-10 sm:w-32 sm:h-32 rounded-full border-2 object-cover"
                src="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png"
                alt="Avatar"
              />
              <p className="flex items-center justify-center w-10 h-10 bottom-0 right-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-2xl rounded-full absolute">
                +
              </p>
            </label>
          </section>
        ) : (
          <section>
            <label className="relative">
              <img
                className="w-10 h-10 sm:w-32 sm:h-32 rounded-full border-2 object-contain relative"
                src={previewImage}
                alt="foto de perfil"
              />
              <p
                onClick={() => {
                  handleChange("image", null);
                  setPreviewImage(null);
                }}
                className="flex cursor-pointer items-center justify-center w-10 h-10 bottom-0 right-3 bg-red-600 hover:bg-red-700 text-white font-semibold transition text-2xl rounded-full absolute"
              >
                <ion-icon name="close-outline"></ion-icon>
              </p>
            </label>
          </section>
        )}
      </section>

      <article className="flex items-center rounded-sm h-15 pl-4 pr-4 border border-gray-300 bg-white shadow-sm">
        <p className="text-gray-600">
          {registerForm.first_name + " " + registerForm.last_name}
        </p>
      </article>

      <article className="flex items-center rounded-sm h-15 pl-4 pr-4 border border-gray-300 bg-white shadow-sm">
        <p className="text-gray-600">@{registerForm.username}</p>
      </article>
      <section className="flex items-center justify-center gap-2">
        <button
          onClick={handleSubmit}
          className="rounded-sm gap-2 h-12 cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
        >
          Crear
        </button>
        <button
          onClick={() => setStep((prevStep) => prevStep - 1)}
          className="rounded-sm gap-2 h-12 cursor-pointer flex-1 bg-gray-400  hover:bg-gray-600 text-white font-semibold transition text-base"
        >
          Volver
        </button>
      </section>
    </section>
  );
};
