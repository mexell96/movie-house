import React from "react";
import MoviesList from "../components/MovieList/MoviesList";
import SearchInput from "../components/SearchInput/SearchInput";
import PaginationForMovies from "../components/Pagination/Pagination";
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
