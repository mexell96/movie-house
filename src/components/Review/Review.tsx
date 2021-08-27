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

import { UploadImage, Rating } from "..";
import { setReview } from "../../api/review";

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

const Review = ({
  setShowModal,
  getReviewsFromDB,
  title,
}: ReviewPropsType): JSX.Element => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const initialValues = { name: "", review: "", rating: 0, avatar: "" };

  const onSubmit = async (
    values: ReviewInfoType,
    actions: ReviewActionsType
  ) => {
    try {
      const newReview: ReviewType = {
        uid: uid(25),
        movie: title,
        movieId: id,
        owner: uid(25),
        ...values,
      };
      await setReview(newReview);
      await getReviewsFromDB();
      actions.setSubmitting(false);
      setShowModal(false);
    } catch (e) {
      console.log("Review -", e);
    }
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
