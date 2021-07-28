import styled from "styled-components";

export const ReviewHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReviewHeaderTitleStyled = styled.span`
  font-size: 2vw;

  @media (max-width: 835px) {
    font-size: 2.5vw;
  }
`;

export const ReviewContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 10px;
`;

export const ReviewButtonCloseStyled = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ReviewButtonSubmitStyled = styled.button`
  appearance: none;
  padding: 10px;
  margin: 10px 0;
  border: none;
  background-color: #2d313a;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
`;
