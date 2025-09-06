import { Input } from "../Input";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/userServices";

export const StepOne = ({ registerForm, handleChange, setStep, debounce }) => {
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);

  const fetchAllUsers = async () => {
    const response = await getAllUsers(null, null, registerForm.email);
    const isEmailRegistered = response.users?.some(
      (u) => u.email === debouncedEmail
    );
    setIsEmailRegistered(isEmailRegistered);
  };

  useEffect(() => {
    if (!debouncedEmail) return;

    fetchAllUsers();
  }, [debouncedEmail]);

  const isDisabledButton =
    !registerForm.first_name ||
    !registerForm.last_name ||
    !registerForm.email ||
    isEmailRegistered;

  const classBtn = isDisabledButton
    ? "bg-gray-600 hover:bg-gray-700"
    : "bg-blue-600 hover:bg-blue-700";

  return (
    <section className="flex flex-col w-full sm:w-[90%] gap-4">
      <Input
        placeholder="Nombre"
        type="text"
        className="h-15"
        onInputChange={(e) => handleChange("first_name", e.target.value)}
        value={registerForm.first_name}
      />
      <Input
        placeholder="Apellido"
        type="text"
        className="h-15"
        onInputChange={(e) => handleChange("last_name", e.target.value)}
        value={registerForm.last_name}
      />
      <Input
        placeholder="Correo electronico"
        type="text"
        className={`${
          isEmailRegistered &&
          "border-red-600 focus:ring-red-600 focus:border-red-600"
        } h-15`}
        onInputChange={(e) => {
          handleChange("email", e.target.value);
          debounce(e.target.value, setDebouncedEmail);
        }}
        value={registerForm.email}
      />
      {isEmailRegistered && registerForm.email && (
        <p className="text-center text-red-600">Email ya registrado...</p>
      )}
      <section className="flex gap-2 w-full">
        <button
          onClick={() => setStep((prevStep) => prevStep + 1)}
          disabled={isDisabledButton}
          className={`rounded-sm gap-2 h-12 cursor-pointer flex-1 ${classBtn} text-white font-semibold transition text-base`}
        >
          Siguiente
        </button>
      </section>
    </section>
  );
};
