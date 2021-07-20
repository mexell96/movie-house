import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import {
  MovieContentModalStyled,
  MovieContentModalAboutStyled,
  MovieContentModalTitleStyled,
  MovieTaglineStyled,
  MovieImgStyled,
} from "./Movie.style";

import { noPicture } from "../../consts";
import { Loader } from "..";
import { fetchMovie } from "../../redux/actions";
import { RootState } from "../../redux/rootReducer";

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
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const loading = useSelector(
    ({ appReducer: { loading } }: RootState) => loading
  );
  const resultMovie = useSelector(({ resultMovie }: any) => resultMovie);
  const history = useHistory();
  const [picture, setPicture] = useState("");
  const [movie, setMovie] = useState({
    Poster: "",
    Title: "",
    Year: "",
    Plot: "",
  });

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
    movie.Poster === "N/A" ? setPicture(noPicture) : setPicture(movie.Poster);
  }, [movie]);

  const body = (
    <>
      {movie && (
        <div className={classes.paper}>
          <MovieContentModalStyled>
            <MovieImgStyled src={picture} alt={movie.Title} />
            <MovieContentModalAboutStyled>
              <MovieContentModalTitleStyled>
                {movie.Title}({movie.Year})
              </MovieContentModalTitleStyled>
              <MovieTaglineStyled>{movie.Plot}</MovieTaglineStyled>
            </MovieContentModalAboutStyled>
          </MovieContentModalStyled>
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
