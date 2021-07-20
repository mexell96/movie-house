import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #39445a;
`;

export const RequestStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  background-color: #282c34;
  border-radius: 10px;
  position: relative;
  font-family: "Montserrat", sans-serif;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export const InformationStyled = styled.div`
  width: 100%;
  text-align: center;
  font-size: 17px;
  padding: 8px 0;
`;
