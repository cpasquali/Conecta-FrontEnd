import { BaseModal } from "./BaseModal";
import { Input } from "../Input";
import { useLoginForm } from "../../hooks/useLoginForm";

export const LogInModal = ({
  isModalActive,
  setIsModalActive,
  setTypeModal,
}) => {
  const { handleChange, emptyInputs, handleSubmit } = useLoginForm();

  return (
    <BaseModal isOpen={isModalActive} width="500px" height={500}>
      <section className="flex flex-col gap-4 w-full mb-16 sm:mb-0 sm:w-[90%] justify-center">
        <h2 className="text-2xl text-center absolute top-34 sm:top-8 left-1/2 -translate-x-1/2">
          Ingresar 🚀
        </h2>

        <Input
          type="text"
          onInputChange={(e) => handleChange("emailOrUsername", e.target.value)}
          placeholder="Email o Nombre de usuario..."
          className={`${
            emptyInputs?.some((value) => value === "emailOrUsername")
              ? "border border-red-600"
              : ""
          } h-15`}
        />
        <Input
          type="password"
          onInputChange={(e) => handleChange("password", e.target.value)}
          placeholder="Contraseña..."
          className={`${
            emptyInputs?.some((value) => value === "password")
              ? "border border-red-600"
              : ""
          } h-15`}
        />
        <button
          onClick={handleSubmit}
          className="rounded-sm gap-2 h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
        >
          Iniciar sesion
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-sm gap-2 h-12 cursor-pointer border border-blue-600 hover:bg-gray-200 text-blue-600 font-semibold transition text-base"
        >
          ¿Olvidaste tu contraseña?
        </button>

        <button
          onClick={() => {
            setIsModalActive(!isModalActive);
          }}
          className="text-2xl cursor-pointer border border-gray-400 flex items-center justify-center rounded-full w-10 h-10 absolute top-6 right-6"
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="text-center mt-2">
          ¿No tienes una cuenta?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setTypeModal("register")}
          >
            Regístrate
          </span>
        </p>
      </section>
    </BaseModal>
  );
};
