import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

export const BaseModal = ({
  isOpen,
  children,
  backgroundColorOverlay = "rgba(0, 0, 0, 0.2)",
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

  return (
    <ReactModal
      className="base-modal p-[2rem] sm:rounded-xl flex items-center justify-center bg-white w-full h-full sm:w-[500px] sm:h-[500px] left-1/2 -translate-x-1/2 sm:top-10"
      style={modalStyles}
      isOpen={isOpen}
    >
      {children}
    </ReactModal>
  );
};
