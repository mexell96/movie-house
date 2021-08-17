import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { makeStyles, TextField } from "@material-ui/core";
import { uid } from "uid/secure";

import {
  ReviewAuthentificatedWrapperStyled,
  ReviewAuthentificatedButtonSubmitStyled,
  ReviewAuthentificatedImgStyled,
  ReviewAuthentificatedNameStyled,
} from "./ReviewAuthentificated.style";

import { Rating } from "..";
import { useAuth } from "../../hooks/auth.hook";

const useStyles = makeStyles(() => ({
  input: {
    color: "white",
  },
}));

const validationSchema = Yup.object().shape({
  review: Yup.string()
    .min(10, "Must be 10 characters or more")
    .required("Required"),
  rating: Yup.number().min(1, "Choose a rating").required("Required"),
});

const ReviewAuthentificated = ({
  setShowModal,
  getReviewsFromDB,
}: ReviewPropsType) => {
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { userId, setReview } = useAuth();

  const initialValues = {
    name: userReducer.name,
    review: "",
    rating: 0,
    avatar: userReducer.avatar,
  };

  const onSubmit = async (
    values: ReviewInfoType,
    actions: ReviewActionsType
  ) => {
    try {
      const newReview: ReviewType = {
        uid: uid(25),
        movieId: id,
        owner: userId || uid(25),
        ...values,
      };
      await setReview(newReview);
      await getReviewsFromDB();
      actions.setSubmitting(false);
      setShowModal(false);
    } catch (e) {
      console.log("ReviewAuthentificated -", e);
    }
  };

  return (
    <ReviewAuthentificatedWrapperStyled>
      <ReviewAuthentificatedImgStyled src={userReducer.avatar} alt="avatar" />
      <ReviewAuthentificatedNameStyled>
        {userReducer.name}
      </ReviewAuthentificatedNameStyled>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <TextField
                style={{ width: "400px" }}
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
              <ReviewAuthentificatedButtonSubmitStyled type="submit">
                Submit
              </ReviewAuthentificatedButtonSubmitStyled>
            </form>
          );
        }}
      </Formik>
    </ReviewAuthentificatedWrapperStyled>
  );
};

export { ReviewAuthentificated };
