import { useAuth } from "../context/AuthUserContext";
import { notify } from "../utils/notify";
import { useState } from "react";
import { login } from "../services/userServices";

export const useLoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { setUser } = useAuth();

  const [emptyInputs, setEmptyInputs] = useState([]);

  const handleChange = (field, value) => {
    setLoginForm({ ...loginForm, [field]: value });
  };

  const handleSubmit = async () => {
    const emptyInputs = Object.entries(loginForm)
      ?.filter(([_, value]) => value === "")
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

  return { loginForm, handleChange, emptyInputs, handleSubmit };
};
