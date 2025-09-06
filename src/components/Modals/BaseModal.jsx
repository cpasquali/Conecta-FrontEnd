import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

export const BaseModal = ({
  isOpen,
  children,
  backgroundColorOverlay = "rgba(0, 0, 0, 0.2)",
  isResponsiveModal = false,
}) => {
  const modalStyles = {
    overlay: {
      backgroundColor: backgroundColorOverlay,
      zIndex: 999,
    },
    content: {
      overflow: "hidden",
      position: "absolute",
    },
  };

  const responsiveModalClass = isResponsiveModal
    ? "w-[90%] h-[500px] top-10"
    : "w-full h-full";

  return (
    <ReactModal
      className={`base-modal sm:rounded-xl flex items-center justify-center bg-white ${responsiveModalClass} sm:w-[500px] sm:h-[500px] left-1/2 -translate-x-1/2 sm:top-10`}
      style={modalStyles}
      isOpen={isOpen}
    >
      {children}
    </ReactModal>
  );
};
