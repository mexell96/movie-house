import React from "react";
import MoviesList from "../components/MoviesList";
import SearchInput from "../components/SearchInput";
import PaginationForMovies from "../components/Pagination";
import URL from "../components/URL";

const Movies = () => {
  return (
    <div>
      <h1>MOVIES</h1>
      <URL />
      <SearchInput />
      <MoviesList />
      <PaginationForMovies />
    </div>
  );
};

export { Movies };
