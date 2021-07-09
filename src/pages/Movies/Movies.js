import React from "react";
import {
  MoviesList,
  SearchInput,
  PaginationForMovies,
  urlField,
} from "../../components";

const Movies = () => {
  return (
    <div>
      <h1>MOVIES</h1>
      <urlField />
      <SearchInput />
      <MoviesList />
      <PaginationForMovies />
    </div>
  );
};

export { Movies };
