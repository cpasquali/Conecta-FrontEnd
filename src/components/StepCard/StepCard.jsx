import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { useRegisterForm } from "../../hooks/useRegisterForm";

export const StepCard = ({ step, setStep }) => {
  const {
    registerForm,
    handleChange,
    handleSubmit,
    previewImage,
    setPreviewImage,
    debounce,
  } = useRegisterForm();

  if (step === 1)
    return (
      <StepOne
        debounce={debounce}
        handleChange={handleChange}
        registerForm={registerForm}
        setStep={setStep}
      />
    );
  if (step === 2)
    return (
      <StepTwo
        debounce={debounce}
        handleChange={handleChange}
        registerForm={registerForm}
        setStep={setStep}
      />
    );
  if (step === 3)
    return (
      <StepThree
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        registerForm={registerForm}
        setStep={setStep}
      />
    );
};
