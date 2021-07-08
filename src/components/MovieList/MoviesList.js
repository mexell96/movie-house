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
      <span className="pageTitle">Results</span>
      <div className="trending">
        {location.search && !request.inputValue && <div>Invalid request</div>}
        {location.search && !request.page && <div>Invalid page</div>}

        {!movies && <h5>Not found</h5>}
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
