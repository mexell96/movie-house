import { useRef } from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

import {
  ModalWrapperStyled,
  ModalStyled,
  ReviewHeaderStyled,
  ReviewHeaderTitleStyled,
  ReviewButtonCloseStyled,
} from "./Modal.style";

type ModalPropsType = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: JSX.Element;
};

const Modal: React.FC<ModalPropsType> = ({ close, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.SyntheticEvent) => {
    if (modalRef.current === e.target) {
      close(false);
    }
  };

  return (
    <ModalWrapperStyled onClick={closeModal} ref={modalRef}>
      <ModalStyled>
        <ReviewHeaderStyled>
          <ReviewHeaderTitleStyled>{title}</ReviewHeaderTitleStyled>
          <ReviewButtonCloseStyled onClick={() => close(false)}>
            <CancelPresentationIcon />
          </ReviewButtonCloseStyled>
        </ReviewHeaderStyled>
        {children}
      </ModalStyled>
    </ModalWrapperStyled>
  );
};

export { Modal };
