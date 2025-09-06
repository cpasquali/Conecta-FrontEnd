import { useState } from "react";
import { BaseModal } from "./BaseModal";
import { StepCard } from "../StepCard/StepCard";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export const RegisterModal = ({
  isModalActive,
  setIsModalActive,
  setTypeModal,
}) => {
  const [step, setStep] = useState(1);

  return (
    <BaseModal isOpen={isModalActive} width="500px" height={500}>
      <section className="flex items-center flex-col gap-4 justify-center w-full">
        <h2 className="text-2xl">Crea tu cuenta 🚀</h2>
        <ProgressBar step={step} />
        <StepCard step={step} setStep={setStep} />
        <p>
          ¿Ya tienes una cuenta?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setTypeModal("login")}
          >
            Iniciar sesión
          </span>
        </p>
        <button
          onClick={() => {
            setIsModalActive(!isModalActive);
          }}
          className="text-2xl cursor-pointer border border-gray-400 flex items-center justify-center rounded-full w-10 h-10 absolute top-6 right-6"
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </section>
    </BaseModal>
  );
};
