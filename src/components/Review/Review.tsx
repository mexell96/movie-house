import { Avatar, Rating } from "..";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { makeStyles, TextField } from "@material-ui/core";
import { useParams } from "react-router";
import { uid } from "uid/secure";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  ReviewContainerStyled,
  ReviewButtonSubmitStyled,
} from "./Review.style";

import { setReview } from "../../redux/actions";

type ReviewPropsType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReviewActionsType = {
  setSubmitting: (isSubmitting: boolean) => void;
};

type ReviewInfoType = {
  name: string;
  review: string;
  rating: number;
  avatar: string;
};

const useStyles = makeStyles(() => ({
  input: {
    color: "white",
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  review: Yup.string()
    .min(10, "Must be 10 characters or more")
    .required("Required"),
  rating: Yup.number().min(1, "Choose a rating").required("Required"),
  avatar: Yup.string().required("Required"),
});

const initialValues = { name: "", review: "", rating: 0, avatar: "" };

const Review = ({ setShowModal }: ReviewPropsType) => {
  const dispatch = useDispatch();
  const reviewsReducer = useSelector(
    ({ reviewsReducer }: RootStateType) => reviewsReducer
  );
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const onSubmit = (values: ReviewInfoType, actions: ReviewActionsType) => {
    const review: ReviewType = {
      uid: uid(25),
      date: Date.now(),
      ...values,
    };

    const reviews: ReviewType[] = (reviewsReducer && reviewsReducer[id]) || [];
    reviews.push(review);

    dispatch(setReview(reviews, id));
    actions.setSubmitting(false);
    setShowModal(false);
  };

  useEffect(() => {
    localStorage.setItem("Reviews", JSON.stringify(reviewsReducer));
  }, [reviewsReducer]);

  return (
    <ReviewContainerStyled>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <TextField
                id="name"
                name="name"
                label="Name"
                placeholder="Name"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                error={props.touched.name && Boolean(props.errors.name)}
                helperText={props.touched.name && props.errors.name}
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
              />
              <TextField
                id="review"
                name="review"
                label="Review"
                placeholder="Review"
                rows="5"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.review}
                error={props.touched.review && Boolean(props.errors.review)}
                helperText={props.touched.review && props.errors.review}
                multiline
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
              />
              <Field name="rating" component={Rating} />
              <Field name="avatar" component={Avatar} />
              <ReviewButtonSubmitStyled type="submit">
                Submit
              </ReviewButtonSubmitStyled>
            </form>
          );
        }}
      </Formik>
    </ReviewContainerStyled>
  );
};

export { Review };
