import { RegisterModal } from "./RegisterModal";
import { LogInModal } from "./LogInModal";

export const AuthModal = ({
  isModalActive,
  setIsModalActive,
  authType = "login",
}) => {
  if (authType === "register") {
    return (
      <RegisterModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
    );
  }

  return (
    <LogInModal
      isModalActive={isModalActive}
      setIsModalActive={setIsModalActive}
    />
  );
};
