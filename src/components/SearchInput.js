import React from "react";

function SearchInput({ searchValue, setSearchValue }) {
    return (
        <div>
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Введите название фильма"
            />
        </div>
    );
}

export default SearchInput;
