import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies } from "../redux/actions";

function MoviesList() {
  const request = useSelector((state) => state.searchValuesReducer);
  const movies = useSelector((state) => state.moviesReducer.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (request.inputValue && request.page) {
      dispatch(fetchMovies(request.inputValue, request.page));
    }
  }, [request]);

  return (
    <div>
      {!movies && <h5>Not found</h5>}
      {movies.map((movie) => {
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

export default MoviesList;
