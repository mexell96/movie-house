import { setSearchValue } from "./../redux/actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function SearchInput() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const searchValue = {
    inputValue,
    page: 1,
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите название фильма"
      />
      <button
        type="button"
        disabled={!inputValue}
        onClick={() => dispatch(setSearchValue(searchValue))}>
        Найти
      </button>
    </div>
  );
}

export default SearchInput;
