import { useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { getAllUsers } from "../../services/userServices";

export const StepCard = ({ step, setStep, registerForm, setRegisterForm }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const timeoutRef = useRef(null);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [isUsernameRegistered, setIsUsernameRegistered] = useState(false);

  const handleRegisterForm = (e, property) => {
    if (property === "image") {
      setRegisterForm({ ...registerForm, image: e.target.files[0] });
      const image = URL.createObjectURL(e.target.files[0]);
      setImagePreview(image);
    } else {
      setRegisterForm({ ...registerForm, [property]: e.target.value });
    }
  };

  const debounce = (e, setter) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setter(e.target.value);
    }, 200);
  };

  const fetchAllUsers = async (type) => {
    if (type === "email") {
      const response = await getAllUsers(null, null, registerForm.email);
      setIsEmailRegistered(
        response.users?.some((u) => u.email === registerForm.email)
      );
    } else {
      const response = await getAllUsers(null, registerForm.username, null);
      setIsUsernameRegistered(
        response.users?.some((u) => u.username === registerForm.username)
      );
    }
  };

  useEffect(() => {
    if (!debouncedEmail) return;

    fetchAllUsers("email");
  }, [debouncedEmail]);

  useEffect(() => {
    if (!debouncedUsername) return;

    fetchAllUsers("username");
  }, [debouncedUsername]);

  if (step === 1) {
    return (
      <section className="flex flex-col gap-4 w-[80%]">
        <Input
          placeholder="Nombre"
          type="text"
          className="h-15"
          onInputChange={(e) => handleRegisterForm(e, "first_name")}
          value={registerForm.first_name}
        />
        <Input
          placeholder="Apellido"
          type="text"
          className="h-15"
          onInputChange={(e) => handleRegisterForm(e, "last_name")}
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
            handleRegisterForm(e, "email");
            debounce(e, setDebouncedEmail);
          }}
          value={registerForm.email}
        />
        {isEmailRegistered && registerForm.email && (
          <p className="text-center text-red-600">Email ya registrado...</p>
        )}
        <section className="flex gap-2 w-full">
          <button
            onClick={() => setStep((prevStep) => prevStep + 1)}
            className="rounded-sm gap-2 h-12 cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
          >
            Siguiente
          </button>
        </section>
      </section>
    );

    //fetchRegister()
  } else if (step === 2) {
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
            handleRegisterForm(e, "username");
            debounce(e, setDebouncedUsername);
          }}
          value={registerForm.username}
        />
        <Input
          placeholder="Contraseña"
          type="password"
          className="h-15"
          onInputChange={(e) => handleRegisterForm(e, "password")}
          value={registerForm.password}
        />
        <Input
          placeholder="Confirmar Contraseña"
          type="password"
          className="h-15"
          onInputChange={(e) => handleRegisterForm(e, "confirmPassword")}
          value={registerForm.confirmPassword}
        />
        {isUsernameRegistered && registerForm.username && (
          <p className="text-center text-red-600">
            Nombre de usuario ya registrado...
          </p>
        )}
        <section>
          <button
            onClick={() => setStep((prevStep) => prevStep + 1)}
            className="rounded-sm gap-2 h-12 cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
          >
            Siguiente
          </button>
          <button
            onClick={() => setStep((prevStep) => prevStep + 1)}
            className="rounded-sm gap-2 h-12 cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
          >
            Volver
          </button>
        </section>
      </section>
    );
  } else {
    return (
      <section className="flex flex-col gap-4 w-[80%]">
        <section className="flex justify-center items-center">
          {!imagePreview ? (
            <section>
              <input
                type="file"
                className="hidden"
                id="file"
                onChange={(e) => handleRegisterForm(e, "image")}
              />
              <label htmlFor="file" className="cursor-pointer relative">
                <img
                  className="w-10 h-10 sm:w-50 sm:h-50 rounded-full border-2 object-cover"
                  src="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png"
                  alt="Avatar"
                />
                <p className="flex items-center justify-center w-10 h-10 bottom-0 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-2xl rounded-full absolute">
                  +
                </p>
              </label>
            </section>
          ) : (
            <img
              className="w-10 h-10 sm:w-50 sm:h-50 rounded-full border-2 object-contain"
              src={imagePreview}
              alt="foto de perfil"
            />
          )}
        </section>

        <article className="flex items-center rounded-sm h-12 pl-4 pr-4 border border-gray-300 bg-white shadow-sm">
          <p className="text-gray-600">
            {registerForm.first_name + " " + registerForm.last_name}
          </p>
        </article>

        <article className="flex items-center rounded-sm h-12 pl-4 pr-4 border border-gray-300 bg-white shadow-sm">
          <p className="text-gray-600">@{registerForm.username}</p>
        </article>
      </section>
    );
  }
};
