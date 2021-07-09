import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/actions";
import { useLocation } from "react-router";
import SingleMovie from "../SingleMovie/SingleMovie";
import "./MovieList.css";

function MoviesList() {
  const request = useSelector((state) => state.searchValuesReducer);
  const movies = useSelector((state) => state.moviesReducer.movies);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (request.inputValue && request.page) {
      dispatch(fetchMovies(request.inputValue, request.page));
    }
  }, [request]);

  return (
    <div>
      <div className="trending">
        {location.search && !request.inputValue && (
          <h2>Error: "Invalid request"</h2>
        )}
        {location.search && !request.page && <h2>Error: "Invalid page"</h2>}
        {!movies && <h2>No Movies Found</h2>}
        {movies &&
          movies.map((movie) => (
            <SingleMovie
              imdbID={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              plot={movie.Plot}
              year={movie.Year}
              type={movie.Type}
            />
          ))}
      </div>
    </div>
  );
}

export default MoviesList;
