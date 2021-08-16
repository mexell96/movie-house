import styled from "styled-components";

export const FormWrapperStyled = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 750px) {
    align-items: center;
    flex-direction: column;
  }
`;

export const FormWrapperChildrenStyled = styled.div`
  width: 350px;
  margin: 10px;
  background-color: ${(props) => props.theme.body};
  border: 1px solid #282c34;
  border-radius: 10;
  color: white;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
  padding: 5px;
`;
