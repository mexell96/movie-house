import {
  MoviesList,
  SearchInput,
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
      <CustomPagination />
    </>
  );
};

export { Movies };
