import { useState } from "react";
import { BaseModal } from "./BaseModal";
import { StepCard } from "../StepCard/StepCard";
import { register } from "../../services/userServices";
import { notify } from "../../utils/notify";
import { useAuth } from "../../context/AuthUserContext";

export const RegisterModal = ({ isModalActive, setIsModalActive }) => {
  const [step, setStep] = useState(1);
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const { setUser } = useAuth();

  const fetchRegister = async () => {
    const response = await register(registerForm);
    notify(response.message, response.status);
    setUser(response.newUser);
  };

  const progressBar = step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-3/3";

  return (
    <BaseModal isOpen={isModalActive} width={600}>
      <h2 className="text-2xl">Crea tu cuenta</h2>

      <section className="w-[80%] mb-6">
        <section>
          <p className="text-xs font-medium text-gray-500">{step}/3</p>
          <section className="mt-4 overflow-hidden rounded-full bg-gray-200">
            <section
              className={`h-2 ${progressBar} rounded-full bg-blue-500 transition-all duration-600 ease-in-out`}
            ></section>
          </section>
        </section>
      </section>

      <StepCard
        step={step}
        setStep={setStep}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        fetchRegister={fetchRegister}
      />

      <button
        onClick={() => {
          setIsModalActive(!isModalActive);
          setStep(1);
          setRegisterForm({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: null,
          });
        }}
        className="text-2xl cursor-pointer border border-gray-400 flex items-center justify-center rounded-full w-10 h-10 absolute top-6 right-6"
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </BaseModal>
  );
};
