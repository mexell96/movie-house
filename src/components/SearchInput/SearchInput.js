import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  createMuiTheme,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

import "./SearchInput.css";

import { setSearchValue, setUrl } from "../../redux/actions";

const SearchInput = () => {
  const dispatch = useDispatch();
  const previousSearches = useSelector((state) => state.previousSearches);
  const urlReducer = useSelector((state) => state.urlReducer);
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
    const previousSearch = previousSearches.find((item) => {
      return JSON.stringify(item) === JSON.stringify(urlReducer);
    });

    if (!!previousSearch) {
      console.log("already exist");
    } else {
      dispatch(setSearchValue(urlReducer));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setUrl(searchValue));
  };

  useEffect(() => {
    if (urlReducer.input && urlReducer.page) {
      comparisonObjects();
    }
  }, [urlReducer]);

  useEffect(() => {
    setInput(urlReducer.input);
  }, [previousSearches]);

  return (
    <ThemeProvider theme={darkTheme}>
      <form
        className="search"
        noValidate
        autoComplete="off"
        onSubmit={onFormSubmit}>
        <TextField
          className="searchBox"
          label="Search"
          variant="filled"
          value={input}
          onChange={({ target: { value } }) => setInput(value)}
          placeholder="Enter the name of the movie"
        />
        <Button
          type="submit"
          disabled={!input}
          variant="contained"
          style={{ marginLeft: 10 }}>
          <SearchIcon fontSize="large" />
        </Button>
      </form>
    </ThemeProvider>
  );
};

export { SearchInput };
