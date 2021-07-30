import styled from "styled-components";

type RatingStarType = {
  rating: number;
};

const colors = ["#ccc", "#eb2228", "#fa6837", "#fdae38", "#87d44a", "#2db539"];

export const ReviewsWindowStyled = styled.div`
  display: flex;
  width: 366px;
  padding: 10px;
  margin: 10px 0;
  background-color: #282c34;
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
`;

export const ReviewsAvatarWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const ReviewsInfoWrapperStyled = styled.div``;

export const ReviewsAvatarStyled = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const ReviewsRatingStarStyled = styled.div<RatingStarType>`
  color: ${({ rating }) => colors[rating]};
  font-size: 50px;

  @media (max-width: 835px) {
    font-size: 40px;
  }
`;

export const ReviewsStarsWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReviewsCommentStyled = styled.div`
  padding: 10px;
  color: white;
  background-color: #39445a;
  font-weight: 300;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  font-style: italic;
`;
