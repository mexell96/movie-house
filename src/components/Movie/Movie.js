import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import "./Movie.css";

import { showLoader, hideLoader } from "./../../redux/actions";
import { noPicture } from "./../../consts";
import { getMovie } from "../../apiFunctions";
import { Loader } from "../../components";

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
  const loading = useSelector((state) => state.appReducer.loading);
  const history = useHistory();

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
            <img
              src={picture}
              alt={movie.Title}
              style={{ height: "inherit" }}
            />
            <div className="ContentModal__about">
              <span className="ContentModal__title">
                {movie.Title}({movie.Year})
              </span>
              <i className="tagline">{movie.Plot}</i>
            </div>
          </div>
          <Button onClick={() => history.goBack()} variant="contained">
            Go back
          </Button>
        </div>
      )}
    </>
  );
};

export { Movie };
