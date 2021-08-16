import styled from "styled-components";

export const ModalWrapperStyled = styled.div`
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

export const ModalStyled = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.body};
  border: 1px solid #282c34;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
  padding: 10px;
`;

export const ModalHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalHeaderTitleStyled = styled.span`
  font-size: 2vw;

  @media (max-width: 835px) {
    font-size: 2.5vw;
  }
`;

export const ModalButtonCloseStyled = styled.div`
  margin: 5px;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
