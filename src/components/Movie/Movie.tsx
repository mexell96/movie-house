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
  MovieReviewsWrapperStyled,
} from "./Movie.style";

import { Loader, Modal, Review } from "..";
import { fetchMovie } from "../../redux/actions";
import { getPicture } from "../../utils";
import { ReviewCard } from "..";

type MaterialUIStyleType = {
  paper: string;
};

const body = (
  { Poster, Title, Year, Plot }: MovieType,
  history: History<unknown>,
  classes: MaterialUIStyleType,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  dataFromLocalStorage: () => void
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
        <Button onClick={() => setShowModal(true)} variant="contained">
          Add review
        </Button>
        <Button onClick={() => history.goBack()} variant="contained">
          Go back
        </Button>
      </MovieButtonsWrapper>
      {showModal && (
        <Modal close={setShowModal} title="Write a review">
          <Review
            setShowModal={setShowModal}
            dataFromLocalStorage={dataFromLocalStorage}
          />
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
  const history = useHistory();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);

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

  const dataFromLocalStorage = (): void => {
    const reviewsFromLS: string | null = localStorage.getItem("Reviews");
    const parseReviewsFromLS: ReviewsType | null =
      reviewsFromLS && JSON.parse(reviewsFromLS);

    if (parseReviewsFromLS && parseReviewsFromLS[id]) {
      setReviews(parseReviewsFromLS[id]);
    }
  };

  useEffect(() => {
    dataFromLocalStorage();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        movie &&
        body(
          movie,
          history,
          classes,
          showModal,
          setShowModal,
          dataFromLocalStorage
        )}
      {reviews && (
        <MovieReviewsWrapperStyled>
          {reviews.map((item) => (
            <ReviewCard review={item} />
          ))}
        </MovieReviewsWrapperStyled>
      )}
    </>
  );
};

export { Movie };
