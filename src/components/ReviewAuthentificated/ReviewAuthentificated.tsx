import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { makeStyles, TextField } from "@material-ui/core";
import { uid } from "uid/secure";
import { message } from "antd";

import {
  ReviewAuthentificatedWrapperStyled,
  ReviewAuthentificatedButtonSubmitStyled,
  ReviewAuthentificatedImgStyled,
  ReviewAuthentificatedNameStyled,
} from "./ReviewAuthentificated.style";

import { setReview } from "../../redux/actions";
import { Rating } from "..";
import { useHttp } from "../../hooks/http.hook";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  review: Yup.string()
    .min(10, "Must be 10 characters or more")
    .required("Required"),
  rating: Yup.number().min(1, "Choose a rating").required("Required"),
});

const ReviewAuthentificated = ({ setShowModal }: ReviewPropsType) => {
  const dispatch = useDispatch();
  const reviewsReducer = useSelector(
    ({ reviewsReducer }: RootStateType) => reviewsReducer
  );
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { request } = useHttp();
  const auth = useContext(AuthContext);

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
    const newReview: ReviewType = {
      uid: uid(25),
      date: Date.now(),
      ...values,
    };
    console.log(newReview, "newReview");

    try {
      const response = await request("/api/create-review", "POST", newReview, {
        Authorization: `Bearer ${auth.token}`,
      });
      console.log(response, "response 99999");
      message.success(response.message);

      const reviews: ReviewType[] =
        (reviewsReducer && reviewsReducer[id]) || [];
      reviews.push(response.review);
      dispatch(setReview({ reviews, id }));
    } catch (e) {
      console.log(e, "E message createUserPage");
    }

    actions.setSubmitting(false);
    setShowModal(false);
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
