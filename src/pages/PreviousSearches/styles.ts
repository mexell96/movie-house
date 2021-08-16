import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.body};
`;

export const RequestStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  background-color: ${(props) => props.theme.card};
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
