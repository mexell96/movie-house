import { useRef } from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

import {
  ModalWrapperStyled,
  ModalStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalButtonCloseStyled,
} from "./Modal.style";

type ModalPropsType = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: JSX.Element;
};

const Modal = ({ close, title, children }: ModalPropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.SyntheticEvent) => {
    if (modalRef.current === e.target) {
      close(false);
    }
  };

  return (
    <ModalWrapperStyled onClick={closeModal} ref={modalRef}>
      <ModalStyled>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>{title}</ModalHeaderTitleStyled>
          <ModalButtonCloseStyled onClick={() => close(false)}>
            <CancelPresentationIcon />
          </ModalButtonCloseStyled>
        </ModalHeaderStyled>
        {children}
      </ModalStyled>
    </ModalWrapperStyled>
  );
};

export { Modal };
