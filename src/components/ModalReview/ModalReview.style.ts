import styled from "styled-components";

export const ModalReviewWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalReviewModalStyled = styled.div`
  position: relative;
  background-color: #39445a;
  border: 1px solid #282c34;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
  padding: 10px;
`;

export const ModalReviewHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalReviewHeaderTitleStyled = styled.span`
  font-size: 1.5vw;
`;

export const ModalReviewModalContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 10px;
`;

export const ModalReviewModalButtonStyled = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ModalReviewButtonSubmitStyled = styled.button`
  appearance: none;
  -webkit-appearance: none;
  padding: 10px;
  margin: 10px 0;
  border: none;
  background-color: #2d313a;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  width: 100%;
`;
