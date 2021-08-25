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
import { useGetReviews } from "../../hooks";

const body = (
  { Poster, Title, Year, Plot }: MovieType,
  history: History<unknown>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  isAuthenticated: boolean,
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
            {!isAuthenticated && (
              <Review
                setShowModal={setShowModal}
                getReviewsFromDB={getReviewsFromDB}
                title={Title}
              />
            )}
            {isAuthenticated && (
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
  const [reviews, setReviewsState] = useState<ReviewType[] | null>(null);
  const { getReviews } = useGetReviews();
  const { token } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );
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

  const getReviewsFromDB = async () => {
    const reviewsDB = await getReviews(id);
    reviewsDB && setReviewsState(reviewsDB);
  };

  useEffect(() => {
    getReviewsFromDB();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        movie &&
        body(
          movie,
          history,
          showModal,
          setShowModal,
          isAuthenticated,
          getReviewsFromDB
        )}
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
