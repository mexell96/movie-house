import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { MovieListStyled } from "./MovieList.style";

import { Loader, SingleMovie } from "..";
import { fetchMovies } from "../../redux/actions";

const MoviesList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const urlReducer = useSelector(({ urlReducer }: RootStateType) => urlReducer);
  const resultsMovies = useSelector(
    ({ resultsMovies }: RootStateType) => resultsMovies
  );
  const loading = useSelector(
    ({ appReducer: { loading } }: RootStateType) => loading
  );
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    if (urlReducer.input) {
      if (resultsMovies[urlReducer.key]) {
        setMovies(resultsMovies[urlReducer.key].movies);
      } else {
        dispatch(fetchMovies(urlReducer));
      }
    }
  }, [urlReducer]);

  useEffect(() => {
    if (resultsMovies[urlReducer.key]) {
      setMovies(resultsMovies[urlReducer.key].movies);
    }
  }, [resultsMovies]);

  return (
    <MovieListStyled>
      {loading && <Loader />}
      {!loading &&
        movies?.length > 0 &&
        movies.map(({ imdbID, Title, Poster, Year, Type }) => (
          <SingleMovie
            key={imdbID}
            imdbID={imdbID}
            Title={Title}
            Poster={Poster}
            Year={Year}
            Type={Type}
          />
        ))}
      {!loading && !movies && urlReducer.input && <h2>No Movies Found</h2>}
      {!loading && location.search && !urlReducer.input && (
        <h2>Error: "Invalid request"</h2>
      )}
    </MovieListStyled>
  );
};

export { MoviesList };
