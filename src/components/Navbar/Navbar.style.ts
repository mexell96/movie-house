import styled from "styled-components";
import { Button } from "@material-ui/core";

export const NavbarStyled = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${(props) => props.theme.body};
  z-index: 100;
  height: 56px;
  display: flex;
  justify-content: center;
`;

export const NavbarButtonStyled = styled(Button)<any>`
  margin: 0;
  color: #fff !important;

  &:hover {
    background-color: ${(props) => props.theme.card} !important;
  }
`;
