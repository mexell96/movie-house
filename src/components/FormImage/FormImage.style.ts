import styled from "styled-components";
import { Button } from "@material-ui/core";

type FormImageButtonType = {
  component: string;
};

export const FormImageButtonStyled = styled(Button)<FormImageButtonType>`
  border-radius: 50% !important;
  padding: 0 !important;
`;

export const FormImageErrorStyled = styled.div`
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

export const FormImageAvatarStyled = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
