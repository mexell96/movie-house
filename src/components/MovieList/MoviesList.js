import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import "./MovieList.css";

import { Loader, SingleMovie } from "../../components";

import { fetchMovies } from "../../redux/actions";

const MoviesList = () => {
  const urlReducer = useSelector((state) => state.urlReducer);
  const moviesFromState = useSelector((state) => state.resultsMovies);
  const loading = useSelector((state) => state.appReducer.loading);
  const dispatch = useDispatch();
  const location = useLocation();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (urlReducer.input && urlReducer.page) {
      if (urlReducer.key in moviesFromState) {
        for (let key of Object.keys(moviesFromState)) {
          if (key === urlReducer.key) {
            const arrayMovies = moviesFromState[key];
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
    for (let key of Object.keys(moviesFromState)) {
      const arrayMovies = moviesFromState[key];
      setMovies(arrayMovies.movies);
    }
  }, [moviesFromState]);

  const body = (
    <div className="trending">
      {location.search && !urlReducer.input && (
        <h2>Error: "Invalid request"</h2>
      )}
      {location.search && !urlReducer.page && <h2>Error: "Invalid page"</h2>}
      {/* {!movies?.length && <h2>No Movies Found</h2>} */}
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
    </div>
  );
  return (
    <>
      {loading && <Loader />}
      {!loading && !!movies && body}
    </>
  );
};

export { MoviesList };
