import styled from "styled-components";

type RatingStarType = {
  current?: boolean;
  positionHover?: number;
};

export const RatingContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  outline: none;
`;

export const RatingContainerStartsStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const RatingStarStyled = styled.div<RatingStarType>`
  cursor: pointer;
  color: ${(props) => {
    if (props.current) {
      if (props.positionHover === 1) {
        return "#eb2228";
      } else if (props.positionHover === 2) {
        return "#fa6837";
      } else if (props.positionHover === 3) {
        return "#fdae38";
      } else if (props.positionHover === 4) {
        return "#87d44a";
      } else if (props.positionHover === 5) {
        return "#2db539";
      }
    } else {
      return "#ccc";
    }
  }};
  font-size: 50px;

  @media (max-width: 835px) {
    font-size: 40px;
  }
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
