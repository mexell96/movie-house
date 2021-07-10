import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import "./MovieList.css";

import { Loader, SingleMovie } from "../../components";

import { fetchMovies } from "../../redux/actions";

const MoviesList = () => {
  const request = useSelector((state) => state.searchValuesReducer);
  const movies = useSelector((state) => state.moviesReducer.movies);
  const loading = useSelector((state) => state.appReducer.loading);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (request.inputValue && request.page) {
      dispatch(fetchMovies(request.inputValue, request.page));
    }
  }, [request]);

  if (loading) return <Loader />;

  const body = (
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
  );
  return (
    <>
      {loading && <Loader />}
      {!loading && !!movies && body}
    </>
  );
};

export { MoviesList };
