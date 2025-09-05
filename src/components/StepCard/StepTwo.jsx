import { Input } from "../Input";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/userServices";

export const StepTwo = ({ debounce, handleChange, registerForm, setStep }) => {
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const [isUsernameRegistered, setIsUsernameRegistered] = useState("");

  const fetchAllUsers = async () => {
    const response = await getAllUsers(null, registerForm.username, null);
    const isUsernameRegistered = response.users?.some(
      (u) => u.username === debouncedUsername
    );
    setIsUsernameRegistered(isUsernameRegistered);
  };

  useEffect(() => {
    if (!debouncedUsername) return;

    fetchAllUsers();
  }, [debouncedUsername]);

  const isDisabledButton =
    !registerForm.username ||
    !registerForm.password ||
    !registerForm.confirmPassword ||
    isUsernameRegistered;

  const classBtn = isDisabledButton
    ? "bg-gray-600 hover:bg-gray-700"
    : "bg-blue-600 hover:bg-blue-700";

  return (
    <section className="flex flex-col gap-4 w-[80%]">
      <Input
        placeholder="Nombre de usuario"
        type="text"
        className={`${
          isUsernameRegistered &&
          "border-red-600 focus:ring-red-600 focus:border-red-600"
        } h-15`}
        onInputChange={(e) => {
          handleChange("username", e.target.value);
          debounce(e.target.value, setDebouncedUsername);
        }}
        value={registerForm.username}
      />
      <Input
        placeholder="Contraseña"
        type="password"
        className="h-15"
        onInputChange={(e) => handleChange("password", e.target.value)}
        value={registerForm.password}
      />
      <Input
        placeholder="Confirmar Contraseña"
        type="password"
        className="h-15"
        onInputChange={(e) => handleChange("confirmPassword", e.target.value)}
        value={registerForm.confirmPassword}
      />
      {isUsernameRegistered && registerForm.username && (
        <p className="text-center text-red-600">
          Nombre de usuario ya registrado...
        </p>
      )}
      <section className="flex items-center justify-center gap-2">
        <button
          onClick={() => setStep((prevStep) => prevStep + 1)}
          disabled={isDisabledButton}
          className={`rounded-sm gap-2 h-12 cursor-pointer flex-1 ${classBtn} text-white font-semibold transition text-base`}
        >
          Siguiente
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
