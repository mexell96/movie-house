import { setSearchValue } from "./../redux/actions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function SearchInput() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.searchValuesReducer);
  const [input, setInput] = useState(request.inputValue || "");
  const searchValue = {
    inputValue: input,
    page: 1,
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(searchValue));
  };

  useEffect(() => {
    setInput(request.inputValue);
  }, [request.inputValue]);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={onFormSubmit}>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter the name of the movie"
      />
      <Button
        type="submit"
        disabled={!input}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<SearchIcon />}>
        Search
      </Button>
    </form>
  );
}

export default SearchInput;
