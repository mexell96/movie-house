import { Rating } from "..";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { makeStyles, TextField } from "@material-ui/core";
import { useParams } from "react-router";
import { uid } from "uid/secure";

import {
  ReviewContainerStyled,
  ReviewButtonSubmitStyled,
} from "./Review.style";

type ReviewPropsType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReviewValuesType = {
  name: string;
  review: string;
  rating: string;
};

type ReviewActionsType = {
  setSubmitting: (isSubmitting: boolean) => void;
};

type ReviewType = {
  name: string;
  review: string;
  rating: string;
  uid: string;
  date: number;
};

type ReviewsType = {
  [id: string]: ReviewType[];
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
  rating: Yup.string().required("Required"),
});

const initialValues = { name: "", review: "", rating: "" };

const Review = ({ setShowModal }: ReviewPropsType) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const onSubmit = (values: ReviewValuesType, actions: ReviewActionsType) => {
    const review: ReviewType = {
      uid: uid(25),
      date: Date.now(),
      ...values,
    };

    const reviews: ReviewsType = {
      [id]: [],
    };

    const reviewsFromLS: string | null = localStorage.getItem("Reviews");
    const parseReviewsFromLS: ReviewsType | null =
      reviewsFromLS && JSON.parse(reviewsFromLS);

    if (parseReviewsFromLS && parseReviewsFromLS[id]) {
      parseReviewsFromLS[id] = [...parseReviewsFromLS[id], review];
      localStorage.setItem("Reviews", JSON.stringify(parseReviewsFromLS));
    } else if (parseReviewsFromLS && !parseReviewsFromLS[id]) {
      parseReviewsFromLS[id] = [review];
      localStorage.setItem("Reviews", JSON.stringify(parseReviewsFromLS));
    } else {
      reviews[id] = [review];
      localStorage.setItem("Reviews", JSON.stringify(reviews));
    }

    actions.setSubmitting(false);
    setShowModal(false);
  };

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
