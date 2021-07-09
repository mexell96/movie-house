import { setSearchValue } from "../../redux/actions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import "./SearchInput.css";
import {
  Button,
  createMuiTheme,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

function SearchInput() {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.searchValuesReducer);
  const [input, setInput] = useState(request.inputValue || "");
  const searchValue = {
    inputValue: input,
    page: 1,
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(searchValue));
  };

  useEffect(() => {
    setInput(request.inputValue);
  }, [request.inputValue]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <form
          className="search"
          noValidate
          autoComplete="off"
          onSubmit={onFormSubmit}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
    </div>
  );
}

export default SearchInput;
