import { BaseModal } from "./BaseModal";
import { useState } from "react";
import { login } from "../../services/userServices";
import { notify } from "../../utils/notify";
import { useAuth } from "../../context/AuthUserContext";
import { Input } from "../Input";

export const LogInModal = ({ isModalActive, setIsModalActive }) => {
  const [loginForm, setLoginForm] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { setUser } = useAuth();

  const [emptyInputs, setEmptyInputs] = useState([]);

  const fetchLogin = async () => {
    const emptyInputs = Object.entries(loginForm)
      ?.filter(([__, value]) => value === "")
      ?.map(([Key]) => Key);

    if (emptyInputs.length > 0) {
      setEmptyInputs(emptyInputs);
      const timeout = setTimeout(() => {
        setEmptyInputs([]);
        clearTimeout(timeout);
      }, 1000);
      notify("Todos los campos deben estar completos", "error");
      return;
    }

    const response = await login(loginForm);
    notify(response.message, response.status);
    setUser(response.user);
  };

  return (
    <BaseModal isOpen={isModalActive} width={600}>
      <h2 className="text-xl">Ingresar 🚀</h2>
      <section className="flex flex-col gap-4 w-[80%] h-52">
        <Input
          type="text"
          onInputChange={(e) =>
            setLoginForm({ ...loginForm, ["emailOrUsername"]: e.target.value })
          }
          placeholder="Email o Nombre de usuario..."
          className={`${
            emptyInputs?.some((value) => value === "emailOrUsername")
              ? "border border-red-600"
              : ""
          } h-15`}
        />
        <Input
          type="password"
          onInputChange={(e) =>
            setLoginForm({ ...loginForm, ["password"]: e.target.value })
          }
          placeholder="Contraseña..."
          className={`${
            emptyInputs?.some((value) => value === "password")
              ? "border border-red-600"
              : ""
          } h-15`}
        />
        <button
          onClick={fetchLogin}
          className="rounded-sm gap-2 h-12 cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
        >
          Iniciar sesion
        </button>
      </section>
      <button
        onClick={() => {
          setIsModalActive(!isModalActive);
        }}
        className="text-2xl cursor-pointer border border-gray-400 flex items-center justify-center rounded-full w-10 h-10 absolute top-6 right-6"
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </BaseModal>
  );
};
