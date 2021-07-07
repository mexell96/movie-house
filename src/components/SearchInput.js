import { setSearchValue } from "./../redux/actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function SearchInput() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const searchValue = {
    inputValue: inputValue,
    page: 1,
  };

  const handler = () => {
    dispatch(setSearchValue(searchValue));
  };
  
  const onFormSubmit = (e) => {
    e.preventDefault();
    handler();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter the name of the movie"
      />
      <button type="submit" disabled={!inputValue}>
        Search
      </button>
    </form>
  );
}

export default SearchInput;
