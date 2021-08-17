import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { makeStyles, TextField } from "@material-ui/core";
import { uid } from "uid/secure";

import {
  ReviewWrapperStyled,
  ReviewButtonSubmitStyled,
  ReviewAvatarStyled,
} from "./Review.style";

import { setReview } from "../../redux/actions";
import { UploadImage, Rating } from "..";

type ReviewPropsType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReviewActionsType = {
  setSubmitting: (isSubmitting: boolean) => void;
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
      movieId: id,
      ...values,
    };

    const reviews: ReviewType[] = (reviewsReducer && reviewsReducer[id]) || [];
    reviews.push(review);

    dispatch(setReview({ reviews, id }));
    actions.setSubmitting(false);
    setShowModal(false);
  };

  return (
    <ReviewWrapperStyled>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <ReviewAvatarStyled>
                <Field
                  name="avatar"
                  component={({ form }: FormikPropsType) => (
                    <UploadImage
                      value={form.values.avatar}
                      onChange={form.setFieldValue}
                      errors={form.errors.avatar}
                      touched={form.touched.avatar}
                    />
                  )}
                />
              </ReviewAvatarStyled>
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
              <Field
                name="rating"
                component={({ form }: FormikPropsType) => (
                  <Rating
                    value={form.values.rating}
                    onChange={form.setFieldValue}
                    errors={form.errors.rating}
                    touched={form.touched.rating}
                    changeable={true}
                  />
                )}
              />
              <ReviewButtonSubmitStyled type="submit">
                Submit
              </ReviewButtonSubmitStyled>
            </form>
          );
        }}
      </Formik>
    </ReviewWrapperStyled>
  );
};

export { Review };
