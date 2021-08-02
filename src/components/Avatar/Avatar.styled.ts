import styled from "styled-components";
import { Button } from "@material-ui/core";

type AvatarButtonType = {
  success: string;
  component: string;
};

export const AvatarButtonStyled = styled(Button)<AvatarButtonType>`
  background: ${({ success }) =>
    success ? "lightGreen" : "contained"} !important;
`;

export const AvatarErrorStyled = styled.div`
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
