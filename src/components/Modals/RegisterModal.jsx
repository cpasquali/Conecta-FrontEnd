import { useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { BaseModal } from "./BaseModal";
import { getAllUsers } from "../../services/userServices";

export const RegisterModal = () => {
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const timeoutRef = useRef(null);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const emailInputRef = useRef(null);
  const [step, setStep] = useState(1);

  const handleRegisterForm = (e, property) => {
    if (property === "image") {
      setRegisterForm({ ...registerForm, image: e.target.files[0] });
    } else if (property === "email") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setRegisterForm({ ...registerForm, email: e.target.value });
      }, 200);
    } else {
      setRegisterForm({ ...registerForm, [property]: e.target.value });
    }
  };

  const fetchAllUsers = async () => {
    const response = await getAllUsers(null, null, registerForm.email);
    setIsEmailRegistered(
      response.users?.some((u) => u.email === registerForm.email)
    );
  };

  useEffect(() => {
    if (!registerForm.email) return;

    fetchAllUsers();
  }, [registerForm.email]);

  return (
    <BaseModal isOpen={true} width={600}>
      <h2 className="text-2xl">Crea tu cuenta</h2>
      <div className="w-[80%]">
        <div>
          <p className="text-xs font-medium text-gray-500">{step}/3</p>

          <div className="mt-4 overflow-hidden rounded-full bg-gray-200">
            <div className={`h-2 w-${step}/3 rounded-full bg-blue-500`}></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-4 w-[80%] h-70">
        <Input
          placeholder="Nombre"
          type="text"
          className="h-15"
          onInputChange={(e) => handleRegisterForm(e, "first_name")}
        />
        <Input
          placeholder="Apellido"
          type="text"
          className="h-15"
          onInputChange={(e) => handleRegisterForm(e, "last_name")}
        />
        <Input
          placeholder="Correo electronico"
          type="text"
          className={`${
            isEmailRegistered &&
            "border-red-600 focus:ring-red-600 focus:border-red-600"
          } h-15`}
          onInputChange={(e) => handleRegisterForm(e, "email")}
          ref={emailInputRef}
        />
        {isEmailRegistered && (
          <p className="text-center text-red-600">Email ya registrado...</p>
        )}
        <button className="rounded-sm flex items-center justify-center gap-2 flex-1 cursor-pointer h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base">
          Siguiente
        </button>
      </section>
    </BaseModal>
  );
};
