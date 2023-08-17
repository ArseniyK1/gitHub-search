import { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ setVisibleModal, visibleModal, children, ...props }) => {
  const handleEscapeKeyPress = (event) => {
    if (event.key === "Escape") {
      setVisibleModal(false);
    }
  };

  // Эффект для добавления обработчика события при появлении модального окна
  useEffect(() => {
    if (visibleModal) {
      window.addEventListener("keydown", handleEscapeKeyPress);
    }

    // Очистка обработчика события при закрытии модального окна или при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [visibleModal]);

  return (
    <>
      <div
        className={styles["bg-modal"]}
        onClick={() => {
          setVisibleModal(false);
        }}
        {...props}
      >
        <div
          className={styles.modal}
          onClick={(event) => event.stopPropagation()}
        >
          <img
            src="/close.png"
            alt="close"
            className={styles.close}
            onClick={() => {
              setVisibleModal(false);
            }}
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
