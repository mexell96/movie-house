import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import {
  ContentModal,
  ContentModalAbout,
  ContentModalTitle,
  Tagline,
  Img,
} from "./Movie.style";

import { noPicture } from "../../consts";
import { Loader } from "..";
import { fetchMovie } from "../../redux/actions";

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
  const dispatch = useDispatch();
  const loading = useSelector(({ appReducer: { loading } }) => loading);
  const resultMovie = useSelector(({ resultMovie }) => resultMovie);
  const history = useHistory();
  const [picture, setPicture] = useState("");
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (id in resultMovie) {
      for (let key of Object.keys(resultMovie)) {
        if (key === id) {
          setMovie(resultMovie[key]);
        }
      }
    } else {
      dispatch(fetchMovie(id));
    }
  }, [id]);

  useEffect(() => {
    for (let key of Object.keys(resultMovie)) {
      if (key === id) {
        setMovie(resultMovie[key]);
      }
    }
  }, [resultMovie]);

  useEffect(() => {
    movie?.Poster === "N/A" ? setPicture(noPicture) : setPicture(movie?.Poster);
  }, [movie]);

  const body = (
    <>
      {movie && (
        <div className={classes.paper}>
          <ContentModal>
            <Img src={picture} alt={movie.Title} />
            <ContentModalAbout>
              <ContentModalTitle>
                {movie.Title}({movie.Year})
              </ContentModalTitle>
              <Tagline>{movie.Plot}</Tagline>
            </ContentModalAbout>
          </ContentModal>
          <Button onClick={() => history.goBack()} variant="contained">
            Go back
          </Button>
        </div>
      )}
    </>
  );
  return (
    <>
      {loading && <Loader />}
      {!loading && body}
    </>
  );
};

export { Movie };
