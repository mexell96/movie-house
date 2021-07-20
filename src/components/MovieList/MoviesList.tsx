import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { MovieListTrendingStyled } from "./MovieList.style";

import { Loader, SingleMovie } from "..";

import { fetchMovies } from "../../redux/actions";

const MoviesList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const urlReducer = useSelector(({ urlReducer }: any) => urlReducer);
  const resultsMovies = useSelector(({ resultsMovies }: any) => resultsMovies);
  const loading = useSelector(({ appReducer: { loading } }: any) => loading);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (urlReducer.input && urlReducer.page) {
      if (urlReducer.key in resultsMovies) {
        for (let key of Object.keys(resultsMovies)) {
          if (key === urlReducer.key) {
            const arrayMovies = resultsMovies[key];
            setMovies(arrayMovies.movies);
          }
        }
      } else {
        dispatch(fetchMovies(urlReducer));
      }
    }
  }, [urlReducer]);

  useEffect(() => {
    for (let key of Object.keys(resultsMovies)) {
      const arrayMovies = resultsMovies[key];
      setMovies(arrayMovies.movies);
    }
  }, [resultsMovies]);

  const singleMovie = (movie: any) => (
    <SingleMovie
      imdbID={movie.imdbID}
      title={movie.Title}
      poster={movie.Poster}
      plot={movie.Plot}
      year={movie.Year}
      type={movie.Type}
      key={movie.imdbID}
    />
  );

  const moviesBlock = () => {
    return <>{movies.map((movie) => singleMovie(movie))}</>;
  };
  const moviesNotFound = <h2>No Movies Found</h2>;
  const InvalidRequest = <h2>Error: "Invalid request"</h2>;

  return (
    <MovieListTrendingStyled>
      {loading && <Loader />}
      {!loading && movies && moviesBlock()}
      {!loading && !movies && urlReducer.input && moviesNotFound}
      {!loading && location.search && !urlReducer.input && InvalidRequest}
    </MovieListTrendingStyled>
  );
};

export { MoviesList };
