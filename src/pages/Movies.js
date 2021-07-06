import React from "react";
import FoundMovies from "../components/FoundMovies";
import SearchInput from "../components/SearchInput";
import PaginationForMovies from "../components/PaginationForMovies";

const Movies = () => {
  return (
    <div>
      <h1>MOVIES</h1>
      <SearchInput />
      <FoundMovies />
      <PaginationForMovies />
    </div>
  );
};

export { Movies };
