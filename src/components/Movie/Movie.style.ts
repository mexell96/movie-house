import styled from "styled-components";

export const MovieWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  @media (min-width: 835px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
  }
`;

export const MovieAboutStyled = styled.div`
  padding: 10px;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  justify-content: space-evenly;
  font-weight: 300;

  @media (min-width: 835px) {
    width: 58%;
    padding: 0;
    height: 100%;
  }
`;

export const MovieTitleStyled = styled.span`
  height: 12%;
  font-size: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 835px) {
    font-size: 3.5vw;
  }
`;

export const MovieDescriptionStyled = styled.i`
  padding-bottom: 10px;
  align-self: center;
`;

export const MovieImgStyled = styled.img`
  height: inherit;
`;

export const MovieButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MovieReviewsWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 835px) {
    justify-content: center;
  }
`;
