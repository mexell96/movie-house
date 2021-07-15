import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

const Search = styled.form`
  display: flex;
  margin: 15px 0;
`;

const SearchBox = styled(TextField)`
  flex: 1;
`;

const ButtonStyle = styled(Button)`
  margin-left: 10;
`;

export { Search, SearchBox, ButtonStyle };
