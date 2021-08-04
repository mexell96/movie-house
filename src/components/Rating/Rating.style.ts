import styled from "styled-components";

type RatingStarType = {
  pointer?: boolean;
  rating: number;
};

const colors = ["#ccc", "#eb2228", "#fa6837", "#fdae38", "#87d44a", "#2db539"];

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

export const RatingStarStyled = styled.div<RatingStarType>`
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
  color: ${({ rating }) => colors[rating]};
  font-size: 50px;

  @media (max-width: 835px) {
    font-size: 40px;
  }
`;
