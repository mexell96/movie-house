import styled from "styled-components";

export const PaginationWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const PaginationUlStyled = styled.ul`
  padding: 0;
  background: inherit;
`;

export const PaginationLIStyled = styled.li`
  display: inline;
  list-style-type: none;
`;

type PaginationButtonType = {
  selected?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PaginationButtonStyled = styled.button<PaginationButtonType>`
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
  color: ${(props) => (props.disabled ? "#848a98" : "#fff")};

  background-color: ${(props) => (props.selected ? "#3f51b5" : "inherit")};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "inherit" : "rgba(255, 255, 255, 0.08)"};
    cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  }
`;
