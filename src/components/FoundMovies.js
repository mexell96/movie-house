import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies } from "../redux/actions";

function FoundMovies() {
  const [nextNumber, setNextNumber] = useState(0);
  const request = useSelector(
    (state) => state.searchValuesReducer.requests[nextNumber]
  );
  const movies = useSelector((state) => state.moviesReducer.movies);
  console.log(movies, "state FoundMovies");
  console.log(request, "state request");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(request, "request !!!!!!!!!!!!!!!!!!!!");
    if (request) {
      dispatch(fetchMovies(request.inputValue));
      setNextNumber((prev) => prev + 1);
      console.log("________________________");
    }
  }, [request]);

  console.log(nextNumber, "nextNumber");
  console.log(movies, "movies!!!!!!!");

  if (movies[0]) {
    return movies[0].map((movie) => {
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
    });
  }
  return <div>666</div>;
}

export default FoundMovies;
