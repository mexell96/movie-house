import styled from "styled-components";
import { TextField } from "@material-ui/core";

const Search = styled.form`
  display: flex;
  margin: 15px 0;
`;

const SearchBox = styled(TextField)`
  flex: 1;
`;

export { Search, SearchBox };
