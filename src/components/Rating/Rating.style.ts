import styled from "styled-components";

export const RatingWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  outline: none;
`;

export const RatingWrapperStarsStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const RatingStarErrorStyled = styled.div`
  color: #f44336;
  margin: 0;
  font-size: 0.75rem;
  margin-top: 3px;
  text-align: left;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
`;
