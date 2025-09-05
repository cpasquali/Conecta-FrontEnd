import { RegisterModal } from "./RegisterModal";
import { LogInModal } from "./LogInModal";

export const AuthModal = ({
  isModalActive,
  setIsModalActive,
  authType = "login",
  setTypeModal,
}) => {
  if (authType === "register") {
    return (
      <RegisterModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        setTypeModal={setTypeModal}
      />
    );
  }

  return (
    <LogInModal
      isModalActive={isModalActive}
      setIsModalActive={setIsModalActive}
      setTypeModal={setTypeModal}
    />
  );
};
