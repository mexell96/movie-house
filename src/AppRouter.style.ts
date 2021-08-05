import styled from "styled-components";

export const AppRouterStyled = styled.div`
  min-height: calc(100vh - 56px);
  background-color: #39445a;
  color: white;
  padding-top: 180px;
  padding-bottom: 70px;

  @media (max-width: 700px) {
    min-height: calc(100vh - 56px);
    padding-top: 140px;
    padding-bottom: 70px;
  }
`;
