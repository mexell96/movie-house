import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { Search, SearchBox, ButtonStyle } from "./SearchInput.style";

import { setSearchValue, setUrl } from "../../redux/actions";
import { RootState } from "../../redux/rootReducer";

const SearchInput = () => {
  const dispatch = useDispatch();
  const previousSearches = useSelector(
    ({ previousSearches }: RootState) => previousSearches
  );
  const urlReducer = useSelector(({ urlReducer }: RootState) => urlReducer);
  const [input, setInput] = useState(urlReducer.input || "");

  const searchValue = {
    input: input,
    page: 1,
    key: input + "_" + 1,
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const comparisonObjects = () => {
    const requestExist = previousSearches.find((item) => {
      return JSON.stringify(item) === JSON.stringify(urlReducer);
    });
    !requestExist && dispatch(setSearchValue(urlReducer));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUrl(searchValue));
  };

  useEffect(() => {
    setInput(urlReducer.input);
    comparisonObjects();
  }, [urlReducer]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Search noValidate autoComplete="off" onSubmit={onFormSubmit}>
        <SearchBox
          label="Search"
          variant="filled"
          value={input}
          onChange={({ target: { value } }) => setInput(value)}
          placeholder="Enter the name of the movie"
        />
        <ButtonStyle type="submit" disabled={!input} variant="contained">
          <SearchIcon fontSize="large" />
        </ButtonStyle>
      </Search>
    </ThemeProvider>
  );
};

export { SearchInput };
