import toast from "react-hot-toast";

export const notify = (message, type = "success") => {
  if (type === "success") {
    toast.success(message, {
      style: {
        borderRadius: "100px",
      },
    });
  }

  if (type === "error") {
    toast.error(message, {
      style: {
        borderRadius: "100px",
      },
    });
  }
};
