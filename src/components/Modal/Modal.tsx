import { useRef } from "react";

import { ModalWrapperStyled, ModalStyled } from "./Modal.style";

type PropsType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
};

const Modal: React.FC<PropsType> = ({ setShowModal, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.SyntheticEvent) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <ModalWrapperStyled onClick={closeModal} ref={modalRef}>
      <ModalStyled>{children}</ModalStyled>
    </ModalWrapperStyled>
  );
};

export { Modal };
