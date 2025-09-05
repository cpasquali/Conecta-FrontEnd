import { AuthModal } from "../Modals/AuthModal";
import { useState } from "react";

export const WelcomePage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [typeModal, setTypeModal] = useState("login");

  return (
    <section className="w-full flex flex-col justify-center items-center px-6 text-black sm:h-full">
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="hidden sm:flex text-3xl font-extrabold tracking-wide">
          Conecta Blog
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-16 mt-12">
        <div className="flex-1 flex flex-col gap-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Historias, ideas y <span className="text-blue-600">conexiones</span>{" "}
            en un solo lugar ✨
          </h2>
          <p className="text-lg text-black-200">
            Bienvenido a{" "}
            <span className="font-semibold text-blue-600">Conecta Blog</span>,
            donde exploramos tendencias, compartimos experiencias y abrimos la
            conversación.
          </p>

          <div className="flex gap-5">
            <button
              onClick={() => {
                setIsModalActive(!isModalActive);
                setTypeModal("login");
              }}
              href="/login"
              className="rounded-sm flex items-center text-white justify-center w-32 h-10 bg-blue-500 hover:bg-blue-600 font-semibold transition cursor-pointer"
            >
              Iniciar sesion
            </button>
            <button
              onClick={() => {
                setIsModalActive(!isModalActive);
                setTypeModal("register");
              }}
              href="/register"
              className="rounded-sm flex items-center justify-center w-32 h-10 border-2 border-blue-500 text-black hover:bg-blue-500 hover:text-white font-semibold transition cursor-pointer"
            >
              Crear cuenta
            </button>
          </div>
        </div>

        <div className="absolute top-2 left-4 sm:flex-1 sm:flex sm:items-center sm:justify-center sm:static">
          <div>
            <img
              src="./logo.png"
              alt="logo conecta"
              className="h-22 w-22 sm:h-92 sm:w-92 object-contain"
            />
          </div>
        </div>
      </div>

      <footer className="w-full max-w-6xl mt-20 py-6 text-center text-black-300 text-sm border-t border-blue-400/30">
        © {new Date().getFullYear()} Conecta Blog — Todos los derechos
        reservados.
      </footer>
      <AuthModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        authType={typeModal}
        setTypeModal={setTypeModal}
      />
    </section>
  );
};
