import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "./../../redux/actions";
import { noPicture } from "./../../consts";
import React, { useEffect, useState } from "react";
import { getMovie } from "../../APIFunctions";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Movie.css";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

const Movie = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);

  const fetchMovie = () => {
    dispatch(async (dispatch) => {
      dispatch(showLoader());
      const { data } = await getMovie(id);
      setTimeout(() => {
        setMovie(data);
        dispatch(hideLoader());
      }, 500);
    });
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  let picture;
  if (movie?.Poster === "N/A") {
    picture = noPicture;
  } else {
    picture = movie?.Poster;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {movie && (
        <div className={classes.paper}>
          <div className="ContentModal">
            <img src={picture} alt={movie.Title} />
            <div className="ContentModal__about">
              <span className="ContentModal__title">
                {movie.Title}({movie.Year})
              </span>
              <i className="tagline">{movie.Plot}</i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Movie };
