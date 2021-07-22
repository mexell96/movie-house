import styled from "styled-components";

export const UlStyled = styled.ul`
  background: inherit;
`;

export const LIStyled = styled.li`
  display: inline;
  list-style-type: none;
`;

export const ButtonStyled = styled.button`
  outline: none;
  height: 32px;
  margin: 0 3px;
  padding: 0 6px;
  font-size: 0.875rem;
  min-width: 32px;
  box-sizing: border-box;
  text-align: center;
  font-weight: 400;
  line-height: 1.43;
  border-style: none;
  border-radius: 16px;
  background-color: #282c34;
  color: #fff;

  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;
