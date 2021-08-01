import styled from "styled-components";

type RatingStarType = {
  pointer?: boolean;
  rating: number;
};

const colors = ["#ccc", "#eb2228", "#fa6837", "#fdae38", "#87d44a", "#2db539"];

export const RatingStarStyled = styled.div<RatingStarType>`
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
  color: ${({ rating }) => colors[rating]};
  font-size: 50px;

  @media (max-width: 835px) {
    font-size: 40px;
  }
`;
