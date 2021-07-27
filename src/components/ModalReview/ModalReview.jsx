import {
  ModalReviewWrapperStyled,
  ModalReviewModalStyled,
  ModalReviewModalContainerStyled,
  ModalReviewModalButtonStyled,
  ModalReviewButtonSubmitStyled,
  ModalReviewHeaderStyled,
  ModalReviewHeaderTitleStyled,
} from "./ModalReview.style";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { useRef } from "react";
import { Rating } from "../index";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";

const ModalReview = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    review: Yup.string()
      .min(10, "Must be 10 characters or more")
      .required("Required"),
  });

  return (
    <>
      {showModal && (
        <ModalReviewWrapperStyled onClick={closeModal} ref={modalRef}>
          <ModalReviewModalStyled>
            <ModalReviewHeaderStyled>
              <ModalReviewHeaderTitleStyled>
                Write a review
              </ModalReviewHeaderTitleStyled>
              <ModalReviewModalButtonStyled
                onClick={() => setShowModal((prev) => !prev)}>
                <CancelPresentationIcon />
              </ModalReviewModalButtonStyled>
            </ModalReviewHeaderStyled>
            <ModalReviewModalContainerStyled>
              <Formik
                initialValues={{ name: "", review: "", rating: "" }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 100);
                }}>
                {(props) => {
                  return (
                    <form onSubmit={props.handleSubmit}>
                      <TextField
                        style={{ width: "100%" }}
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
                      />
                      <TextField
                        multiline
                        style={{ width: "100%" }}
                        id="review"
                        name="review"
                        label="Review"
                        placeholder="Review"
                        rows="5"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.review}
                        error={
                          props.touched.review && Boolean(props.errors.review)
                        }
                        helperText={props.touched.review && props.errors.review}
                      />
                      <Field name="rating" component={Rating} />
                      <ModalReviewButtonSubmitStyled type="submit">
                        Submit
                      </ModalReviewButtonSubmitStyled>
                    </form>
                  );
                }}
              </Formik>
            </ModalReviewModalContainerStyled>
          </ModalReviewModalStyled>
        </ModalReviewWrapperStyled>
      )}
    </>
  );
};

export { ModalReview };
