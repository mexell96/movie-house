import styled from "styled-components";

export const ReviewCardWrapperStyled = styled.div`
  display: flex;
  width: 366px;
  padding: 10px;
  margin: 10px 0;
  background-color: ${(props) => props.theme.card};
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
`;

export const ReviewCardAvatarWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const ReviewCardAvatarStyled = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const ReviewCardInfoStyled = styled.div``;

export const ReviewCardStarsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReviewCardCommentStyled = styled.div`
  padding: 10px;
  color: white;
  background-color: ${(props) => props.theme.body};
  font-weight: 300;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  font-style: italic;
`;

export const ReviewCardDeleteReviewStyled = styled.div`
  margin: 5px;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const ReviewCardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;
