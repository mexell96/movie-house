import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies } from "../redux/actions";
import { useLocation } from "react-router";
import { Container, Paper, Grid } from "@material-ui/core";

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
    <Container maxWidth="xl">
      <Grid container spacing={2} justify="center">
        {location.search && !request.inputValue && <div>Invalid request</div>}
        {location.search && !request.page && <div>Invalid page</div>}

        {!movies && <h5>Not found</h5>}
        {movies &&
          movies.map((movie) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                <Paper
                  style={{
                    height: 600,
                    width: "100%",
                    background: "#ffffa2",
                  }}>
                  <div key={movie.imdbID}>
                    <Link to={`/movies/${movie.imdbID}`}>
                      <h2>{movie.Title}</h2>
                    </Link>
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      style={{ height: "inherit", width: "100%" }}
                    />
                    <p>{movie.Plot}</p>
                    <span>{movie.Year}</span>
                  </div>
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}

export default MoviesList;
