import { toast, Bounce } from "react-toastify";

export const notify = (message, type = "success") => {
  const toastStyles = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  if (type === "success") {
    toast.success(message, toastStyles);
  }

  if (type === "error") {
    toast.error(message, toastStyles);
  }
};
