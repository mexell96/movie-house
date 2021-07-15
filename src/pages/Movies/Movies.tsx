import {
  MoviesList,
  SearchInput,
  PaginationForMovies,
  UrlField,
} from "../../components";

const Movies = () => {
  return (
    <>
      <h1>MOVIES</h1>
      <UrlField />
      <SearchInput />
      <MoviesList />
      <PaginationForMovies />
    </>
  );
};

export { Movies };
