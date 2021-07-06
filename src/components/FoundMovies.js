import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies } from "../redux/actions";

function FoundMovies() {
  const request = useSelector(
    (state) =>
      state.searchValuesReducer.requests[
        state.searchValuesReducer.requests.length - 1
      ]
  );
  const input = useSelector((state) => state.searchValuesReducer.requests);
  const movies = useSelector((state) => state.moviesReducer.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (request) {
      dispatch(fetchMovies(request.inputValue, request.page));
    }
  }, [request]);

  return (
    <div>
      {!movies[movies.length - 1] && !!input.length && <h5>Not found</h5>}
      {movies[movies.length - 1] &&
        movies[movies.length - 1].map((movie) => {
          return (
            <div key={movie.imdbID}>
              <Link to={`/movies/${movie.imdbID}`}>
                <h2>{movie.Title}</h2>
              </Link>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Plot}</p>
              <span>{movie.Year}</span>
            </div>
          );
        })}
    </div>
  );
}

export default FoundMovies;
