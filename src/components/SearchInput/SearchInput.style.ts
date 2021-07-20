import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

export const SearchInputStyled = styled.form`
  display: flex;
  margin: 15px 0;
`;

export const SearchInputBoxStyled = styled(TextField)`
  flex: 1;
`;

export const SearchInputButtonStyled = styled(Button)`
  margin-left: 10;
`;
