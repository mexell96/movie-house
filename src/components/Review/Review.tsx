import { Rating } from "..";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

import {
  ReviewContainerStyled,
  ReviewButtonCloseStyled,
  ReviewButtonSubmitStyled,
  ReviewHeaderStyled,
  ReviewHeaderTitleStyled,
} from "./Review.style";

type PropsType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Review = ({ setShowModal }: PropsType) => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    review: Yup.string()
      .min(10, "Must be 10 characters or more")
      .required("Required"),
    rating: Yup.string().required("Required"),
  });

  return (
    <>
      <ReviewHeaderStyled>
        <ReviewHeaderTitleStyled>Write a review</ReviewHeaderTitleStyled>
        <ReviewButtonCloseStyled onClick={() => setShowModal((prev) => !prev)}>
          <CancelPresentationIcon />
        </ReviewButtonCloseStyled>
      </ReviewHeaderStyled>
      <ReviewContainerStyled>
        <Formik
          initialValues={{ name: "", review: "", rating: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
              setShowModal((prev) => !prev);
            }, 100);
          }}>
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
    </>
  );
};

export { Review };
