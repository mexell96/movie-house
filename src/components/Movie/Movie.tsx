import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { History } from "history";

import {
  MovieContentModalStyled,
  MovieContentModalAboutStyled,
  MovieContentModalTitleStyled,
  MovieTaglineStyled,
  MovieImgStyled,
  MovieButtonsWrapper,
} from "./Movie.style";

import { Loader, ModalReview } from "..";
import { fetchMovie } from "../../redux/actions";
import { getPicture } from "../../utils";

type MaterialUIStyleType = {
  paper: string;
};

const body = (
  { Poster, Title, Year, Plot }: MovieType,
  history: History<unknown>,
  classes: MaterialUIStyleType,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <div className={classes.paper}>
      <MovieContentModalStyled>
        <MovieImgStyled src={getPicture(Poster)} alt={Title} />
        <MovieContentModalAboutStyled>
          <MovieContentModalTitleStyled>
            {Title}({Year})
          </MovieContentModalTitleStyled>
          <MovieTaglineStyled>{Plot}</MovieTaglineStyled>
        </MovieContentModalAboutStyled>
      </MovieContentModalStyled>
      <MovieButtonsWrapper>
        <Button
          onClick={() => setShowModal((prev) => !prev)}
          variant="contained">
          Add review
        </Button>
        <Button onClick={() => history.goBack()} variant="contained">
          Go back
        </Button>
      </MovieButtonsWrapper>
      <ModalReview showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

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
    ({ appReducer: { loading } }: RootStateType) => loading
  );
  const resultsMovie = useSelector(
    ({ resultsMovie }: RootStateType) => resultsMovie
  );
  const history = useHistory();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (resultsMovie[id]) {
      setMovie(resultsMovie[id]);
    } else {
      dispatch(fetchMovie(id));
    }
  }, [id]);

  useEffect(() => {
    if (resultsMovie[id]) {
      setMovie(resultsMovie[id]);
    }
  }, [resultsMovie]);

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        movie &&
        body(movie, history, classes, showModal, setShowModal)}
    </>
  );
};

export { Movie };
