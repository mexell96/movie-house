import {
  FormWrapperStyled,
  FormWrapperChildrenStyled,
} from "./FormWrapper.style";

type FormWrapperPropsType = {
  children: JSX.Element;
};

const FormWrapper = ({ children }: FormWrapperPropsType): JSX.Element => (
  <FormWrapperStyled>
    <FormWrapperChildrenStyled>{children}</FormWrapperChildrenStyled>
  </FormWrapperStyled>
);

export { FormWrapper };
