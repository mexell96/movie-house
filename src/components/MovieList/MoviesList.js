import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { Trending } from "./MovieList.style";

import { Loader, SingleMovie } from "../../components";

import { fetchMovies } from "../../redux/actions";

const MoviesList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const urlReducer = useSelector(({ urlReducer }) => urlReducer);
  const resultsMovies = useSelector(({ resultsMovies }) => resultsMovies);
  const loading = useSelector(({ appReducer: { loading } }) => loading);
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
        dispatch(
          fetchMovies(urlReducer.input, urlReducer.page, urlReducer.key)
        );
      }
    }
  }, [urlReducer]);

  useEffect(() => {
    for (let key of Object.keys(resultsMovies)) {
      const arrayMovies = resultsMovies[key];
      setMovies(arrayMovies.movies);
    }
  }, [resultsMovies]);

  const body = (
    <Trending>
      {location.search && !urlReducer.input && (
        <h2>Error: "Invalid request"</h2>
      )}
      {location.search && !urlReducer.page && <h2>Error: "Invalid page"</h2>}
      {!movies && urlReducer.input && <h2>No Movies Found</h2>}
      {movies &&
        movies.map((movie) => (
          <SingleMovie
            imdbID={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            plot={movie.Plot}
            year={movie.Year}
            type={movie.Type}
            key={movie.imdbID}
          />
        ))}
    </Trending>
  );
  return (
    <>
      {loading && <Loader />}
      {!loading && body}
    </>
  );
};

export { MoviesList };
