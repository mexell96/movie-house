import {
  FormWrapperStyled,
  FormWrapperChildrenStyled,
} from "./FormWrapper.style";

type FormWrapperPropsType = {
  children: JSX.Element;
};

const FormWrapper = ({ children }: FormWrapperPropsType) => {
  return (
    <FormWrapperStyled>
      <FormWrapperChildrenStyled>{children}</FormWrapperChildrenStyled>
    </FormWrapperStyled>
  );
};

export { FormWrapper };
