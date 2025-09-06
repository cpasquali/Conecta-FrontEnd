import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

export const BaseModal = ({
  isOpen,
  children,
  width,
  height,
  backgroundColorOverlay = "rgba(0, 0, 0, 0.2)",
}) => {
  const modalStyles = {
    overlay: {
      backgroundColor: backgroundColorOverlay,
      zIndex: 999,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      backgroundColor: "white",
      width: `${width}`,
      justifySelf: "center",
      padding: "2rem",
      borderRadius: "10px",
      margin: "auto",
      overflow: "hidden",
      marginTop: "40px",
      position: "relative",
      height: `${height}px`,
    },
  };

  return (
    <ReactModal className="base-modal" style={modalStyles} isOpen={isOpen}>
      {children}
    </ReactModal>
  );
};
