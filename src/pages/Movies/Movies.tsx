import {
  MoviesList,
  SearchInput,
  PaginationForMovies,
  UrlField,
  CustomPagination,
} from "../../components";

const Movies = () => {
  return (
    <>
      <h1>MOVIES</h1>
      <UrlField />
      <SearchInput />
      <MoviesList />
      <PaginationForMovies />
      <CustomPagination />
    </>
  );
};

export { Movies };
