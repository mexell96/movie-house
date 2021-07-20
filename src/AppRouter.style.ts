import styled from "styled-components";

export const AppRouterStyled = styled.div`
  min-height: calc(100vh - 220px);
  background-color: #39445a;
  color: white;
  padding-top: 150px;
  padding-bottom: 70px;

  @media (max-width: 700px) {
    min-height: calc(100vh - 140px);
    padding-top: 70px;
    padding-bottom: 70px;
  }
`;
