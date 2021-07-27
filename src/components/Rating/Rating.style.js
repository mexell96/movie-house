import styled from "styled-components";

export const RatingContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const RatingStarStyled = styled.div`
  color: ${(props) => (props.current ? "#000" : "#ccc")};
`;
