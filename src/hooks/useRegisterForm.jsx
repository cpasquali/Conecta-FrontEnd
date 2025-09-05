import { useRef, useState } from "react";
import { register } from "../services/userServices";
import { notify } from "../utils/notify";
import { useAuth } from "../context/AuthUserContext";

export const useRegisterForm = () => {
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const { setUser } = useAuth();
  const timeoutRef = useRef(null);

  const handleChange = (field, value) => {
    if (field === "image") {
      const image = URL.createObjectURL(value);
      setPreviewImage(image);
      setRegisterForm({ ...registerForm, ["image"]: value });
    } else {
      setRegisterForm({ ...registerForm, [field]: value });
    }
  };

  const debounce = (value, setter) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setter(value);
    }, 200);
  };

  const handleSubmit = async () => {
    const response = await register(registerForm);
    notify(response.message, response.status);
    setUser(response.newUser);
  };

  return {
    registerForm,
    handleChange,
    handleSubmit,
    previewImage,
    setPreviewImage,
    debounce,
  };
};
