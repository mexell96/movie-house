import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { History } from "history";

import {
  MovieWrapperStyled,
  MovieAboutStyled,
  MovieTitleStyled,
  MovieDescriptionStyled,
  MovieImgStyled,
  MovieButtonsWrapper,
  MovieReviewsWrapperStyled,
} from "./Movie.style";

import { Loader, Modal, Review, ReviewAuthentificated, ReviewCard } from "..";
import { fetchMovie } from "../../redux/actions";
import { getPicture } from "../../utils";
import { useAuth } from "../../hooks/auth.hook";

type MaterialUIStyleType = {
  paper: string;
};

const body = (
  { Poster, Title, Year, Plot }: MovieType,
  history: History<unknown>,
  classes: MaterialUIStyleType,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  isAuthenticated: boolean
) => {
  return (
    <div className={classes.paper}>
      <MovieWrapperStyled>
        <MovieImgStyled src={getPicture(Poster)} alt={Title} />
        <MovieAboutStyled>
          <MovieTitleStyled>
            {Title}({Year})
          </MovieTitleStyled>
          <MovieDescriptionStyled>{Plot}</MovieDescriptionStyled>
        </MovieAboutStyled>
      </MovieWrapperStyled>
      <MovieButtonsWrapper>
        <Button onClick={() => setShowModal(true)} variant="contained">
          Add review
        </Button>
        <Button onClick={() => history.goBack()} variant="contained">
          Go back
        </Button>
      </MovieButtonsWrapper>
      {showModal && (
        <Modal close={setShowModal} title="Write a review">
          <>
            {!isAuthenticated && <Review setShowModal={setShowModal} />}
            {isAuthenticated && (
              <ReviewAuthentificated setShowModal={setShowModal} />
            )}
          </>
        </Modal>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
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
  const reviewsReducer = useSelector(
    ({ reviewsReducer }: RootStateType) => reviewsReducer
  );
  const history = useHistory();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [reviews, setReviewsState] = useState<ReviewType[] | null>(null);
  const { token } = useAuth();
  const isAuthenticated = !!token;

  useEffect(() => {
    if (resultsMovie[id]) {
      setMovie(resultsMovie[id]);
    } else {
      dispatch(fetchMovie(id));
    }
  }, [id]);

  useEffect(() => {
    resultsMovie[id] && setMovie(resultsMovie[id]);
  }, [resultsMovie]);

  useEffect(() => {
    setReviewsState(reviewsReducer[id]);
  }, [reviewsReducer]);

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        movie &&
        body(movie, history, classes, showModal, setShowModal, isAuthenticated)}
      {reviews && (
        <MovieReviewsWrapperStyled>
          {reviews.map((item) => (
            <ReviewCard key={item.uid} review={item} />
          ))}
        </MovieReviewsWrapperStyled>
      )}
    </>
  );
};

export { Movie };
