import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import {
  SearchInputStyled,
  SearchInputBoxStyled,
  SearchInputButtonStyled,
} from "./SearchInput.style";

import { setSearchValue, setUrl } from "../../redux/actions";
import { uniqueKey } from "../../utils";

const SearchInput = () => {
  const dispatch = useDispatch();
  const previousSearches = useSelector(
    ({ previousSearches }: RootStateType) => previousSearches
  );
  const urlReducer = useSelector(({ urlReducer }: RootStateType) => urlReducer);
  const [input, setInput] = useState(urlReducer.input || "");

  const searchValue = {
    input: input.trim(),
    page: 1,
    key: uniqueKey(input, 1),
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const setValue = () => {
    const requestExist = previousSearches.find(
      (item: SearchInfoType) => item.key === urlReducer.key
    );
    !requestExist && urlReducer.input && dispatch(setSearchValue(urlReducer));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUrl(searchValue));
  };

  useEffect(() => {
    setInput(urlReducer.input);
    setValue();
  }, [urlReducer]);

  return (
    <ThemeProvider theme={darkTheme}>
      <SearchInputStyled noValidate autoComplete="off" onSubmit={onFormSubmit}>
        <SearchInputBoxStyled
          label="Search"
          variant="filled"
          value={input}
          onChange={({ target: { value } }) => setInput(value)}
          placeholder="Enter the name of the movie"
        />
        <SearchInputButtonStyled
          type="submit"
          disabled={!input}
          variant="contained">
          <SearchIcon fontSize="large" />
        </SearchInputButtonStyled>
      </SearchInputStyled>
    </ThemeProvider>
  );
};

export { SearchInput };
