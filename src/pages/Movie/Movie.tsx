import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { History } from "history";

import {
  MovieStyled,
  MovieWrapperStyled,
  MovieAboutStyled,
  MovieTitleStyled,
  MovieDescriptionStyled,
  MovieImgStyled,
  MovieButtonsWrapper,
  MovieReviewsWrapperStyled,
} from "./Movie.style";

import {
  Loader,
  Modal,
  Review,
  ReviewAuthentificated,
  ReviewCard,
} from "../../components";
import { fetchMovie } from "../../redux/actions";
import { getPicture } from "../../utils";
import { getReviews } from "../../api/review";

const socket = new WebSocket("ws://movie-house-back.herokuapp.com");

const body = (
  { Poster, Title, Year, Plot }: MovieType,
  history: History<unknown>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  isAuth: boolean,
  getReviewsFromDB: () => Promise<void>
) => {
  return (
    <MovieWrapperStyled>
      <MovieStyled>
        <MovieImgStyled src={getPicture(Poster)} alt={Title} />
        <MovieAboutStyled>
          <MovieTitleStyled>
            {Title}({Year})
          </MovieTitleStyled>
          <MovieDescriptionStyled>{Plot}</MovieDescriptionStyled>
        </MovieAboutStyled>
      </MovieStyled>
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
            {!isAuth && (
              <Review
                setShowModal={setShowModal}
                getReviewsFromDB={getReviewsFromDB}
                title={Title}
              />
            )}
            {isAuth && (
              <ReviewAuthentificated
                setShowModal={setShowModal}
                getReviewsFromDB={getReviewsFromDB}
                title={Title}
              />
            )}
          </>
        </Modal>
      )}
    </MovieWrapperStyled>
  );
};

const Movie = (): JSX.Element => {
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
  const { isAuth } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

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

  socket.onmessage = (event) => {
    let msg = JSON.parse(event.data);
    switch (msg.method) {
      case "review":
        getReviewsFromDB();
        break;
    }
  };

  const getReviewsFromDB = async () => {
    const reviewsDB = await getReviews(id);
    setReviews(reviewsDB);
    if (
      reviews?.length !== reviewsDB?.length &&
      reviews?.length !== undefined
    ) {
      socket.send(
        JSON.stringify({
          method: "review",
        })
      );
    }
  };

  useEffect(() => {
    getReviewsFromDB();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        movie &&
        body(movie, history, showModal, setShowModal, isAuth, getReviewsFromDB)}
      {reviews && (
        <MovieReviewsWrapperStyled>
          {reviews.map((item) => (
            <ReviewCard
              key={item.uid}
              review={item}
              getReviewsFromDB={getReviewsFromDB}
            />
          ))}
        </MovieReviewsWrapperStyled>
      )}
    </>
  );
};

export { Movie };
