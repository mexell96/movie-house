import { setSearchValue } from "./../redux/actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchInput() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const searchValue = {
    inputValue,
    page: 1,
  };

  function changeRouter(movie, page = 1) {
    history.push(`movies?s=${movie}&page=${page}`);
  }

  function handler() {
    dispatch(setSearchValue(searchValue));
    changeRouter(searchValue.inputValue, searchValue.page);
  }

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите название фильма"
      />
      <button type="button" disabled={!inputValue} onClick={handler}>
        Найти
      </button>
    </div>
  );
}

export default SearchInput;
