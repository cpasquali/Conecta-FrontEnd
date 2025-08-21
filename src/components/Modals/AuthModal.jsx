import { Input } from "../Input";
import { BaseModal } from "./BaseModal";
import { login, register } from "../../services/userServices";
import { useAuth } from "../../context/AuthUserContext";
import { useState } from "react";
import { notify } from "../../utils/notify";
import { useLocation } from "wouter";

export const AuthModal = ({
  isModalRegisterActive,
  setIsModalRegisterActive,
  isModalLoginActive,
  setIsModalLoginActive,
  authType = "login",
}) => {
  const { setUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [_, setLocation] = useLocation();
  const [loginForm, setLoginForm] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fetchLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginForm.emailOrUsername) newErrors.emailOrUsername = true;
    if (!loginForm.password) newErrors.password = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const timeout = setTimeout(() => {
        setErrors([]);
        clearTimeout(timeout);
      }, 1000);
      Object.keys(newErrors).forEach((e) => {
        const error =
          e === "emailOrUsername" ? "Email / Contraseña" : "Contraseña";
        notify(`Campo ${error} incompleto`, "error");
      });
      return;
    }

    const response = await login(e, loginForm);

    if (response.status === "error") {
      notify(response.message, response.status);
      return;
    }

    setLocation("/");
    setUser(response.user);
  };

  const fetchRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registerForm.first_name) newErrors.first_name = true;
    if (!registerForm.last_name) newErrors.last_name = true;
    if (!registerForm.username) newErrors.username = true;
    if (!registerForm.email) newErrors.email = true;
    if (!registerForm.password) newErrors.password = true;
    if (!registerForm.confirmPassword) newErrors.confirmPassword = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const timeout = setTimeout(() => {
        setErrors([]);
        clearTimeout(timeout);
      }, 1000);
      Object.keys(newErrors).forEach((e) => {
        let error = "";
        if (e === "first_name") error = "Nombre";
        if (e === "last_name") error = "Apellido";
        if (e === "username") error = "Nombre de usuario";
        if (e === "email") error = "Email";
        if (e === "password") error = "Contraseña";
        if (e === "confirmPassword") error = "Confirmar contraseña";

        notify(`Campo ${error} incompleto`, "error");
      });
      return;
    }

    const response = await register(e, registerForm);
    if (response.status === "error") {
      notify(response.message, response.status);
      return;
    }
    notify(response.message, response.status);
    setIsModalRegisterActive(!isModalRegisterActive);
  };

  if (authType === "register") {
    return (
      <BaseModal isOpen={isModalRegisterActive} width={400}>
        <h2 className="text-xl">Unete hoy gratis 🚀</h2>
        <form
          className="flex flex-col gap-4 w-full h-124"
          onSubmit={fetchRegister}
        >
          <Input
            type="text"
            onInputChange={(e) =>
              setRegisterForm({
                ...registerForm,
                ["first_name"]: e.target.value,
              })
            }
            placeholder="Nombre..."
            className={errors.first_name ? "border border-red-500" : ""}
          />
          <Input
            type="text"
            onInputChange={(e) =>
              setRegisterForm({
                ...registerForm,
                ["last_name"]: e.target.value,
              })
            }
            placeholder="Apellido..."
            className={errors.last_name ? "border border-red-500" : ""}
          />
          <Input
            type="text"
            onInputChange={(e) =>
              setRegisterForm({ ...registerForm, ["username"]: e.target.value })
            }
            placeholder="Nombre de usuario..."
            className={errors.username ? "border border-red-500" : ""}
          />
          <Input
            type="text"
            onInputChange={(e) =>
              setRegisterForm({ ...registerForm, ["email"]: e.target.value })
            }
            placeholder="Email..."
            className={errors.email ? "border border-red-500" : ""}
          />
          <Input
            type="password"
            onInputChange={(e) =>
              setRegisterForm({ ...registerForm, ["password"]: e.target.value })
            }
            placeholder="Contraseña..."
            className={errors.password ? "border border-red-500" : ""}
          />
          <Input
            type="password"
            onInputChange={(e) =>
              setRegisterForm({
                ...registerForm,
                ["confirmPassword"]: e.target.value,
              })
            }
            placeholder="Confirmar contraseña..."
            className={errors.confirmPassword ? "border border-red-500" : ""}
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 flex-1 cursor-pointer h-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
          >
            Iniciar sesion
          </button>
          <button
            onClick={() => setIsModalRegisterActive(!isModalRegisterActive)}
            className="flex items-center justify-center gap-2 flex-1 cursor-pointer h-10 bg-gray-400  hover:bg-gray-600 text-white font-semibold transition text-base"
            type="button"
          >
            Cerrar <ion-icon name="close-outline"></ion-icon>
          </button>
        </form>
      </BaseModal>
    );
  }

  return (
    <BaseModal isOpen={isModalLoginActive} width={400}>
      <h2 className="text-xl">Ingresar 🚀</h2>
      <form className="flex flex-col gap-4 w-full h-58" onSubmit={fetchLogin}>
        <Input
          type="text"
          onInputChange={(e) =>
            setLoginForm({ ...loginForm, ["emailOrUsername"]: e.target.value })
          }
          placeholder="Email o Nombre de usuario..."
          className={errors.emailOrUsername ? "border border-red-500" : ""}
        />
        <Input
          type="password"
          onInputChange={(e) =>
            setLoginForm({ ...loginForm, ["password"]: e.target.value })
          }
          placeholder="Contraseña..."
          className={errors.password ? "border border-red-500" : ""}
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 flex-1 cursor-pointer h-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
        >
          Iniciar sesion
        </button>
        <button
          onClick={() => setIsModalLoginActive(!isModalLoginActive)}
          className="flex items-center justify-center gap-2 flex-1 cursor-pointer h-10 bg-gray-400  hover:bg-gray-600 text-white font-semibold transition text-base"
          type="button"
        >
          Cerrar <ion-icon name="close-outline"></ion-icon>
        </button>
      </form>
    </BaseModal>
  );
};
