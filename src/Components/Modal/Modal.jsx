import Modal from "react-modal";
import css from "./Modal.module.css";
import { useMediaQuery } from "react-responsive";
import { VscChromeClose } from "react-icons/vsc";

export function BookModal({ isOpen, onClose, children }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // const modalStyle = {
  //   overlay: {
  //     backgroundColor: "transparent",
  //   },
  // };

  return (
    <div>
      <Modal
        overlayClassName={css.modalOverlay}
        // style={modalStyle}
        isOpen={isOpen}
        className={css.modal}
        onRequestClose={onClose}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        preventScroll={true}
        shouldCloseOnOverlayClick={false}
      >
        {!isMobile && <VscChromeClose className={css.icon} onClick={onClose} />}
        {children}
      </Modal>
    </div>
  );
}
