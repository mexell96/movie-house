import styled from "styled-components";

export const AuthenticationWrapperStyled = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 750px) {
    align-items: center;
    flex-direction: column;
  }
`;
