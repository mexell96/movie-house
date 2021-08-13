import { makeStyles } from "@material-ui/core/styles";

import { FormWrapperStyled } from "./FormWrapper.style";

type FormWrapperPropsType = {
  children: JSX.Element;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "350px",
    margin: "10px",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

const FormWrapper = ({ children }: FormWrapperPropsType) => {
  const classes = useStyles();

  return (
    <FormWrapperStyled>
      <div className={classes.paper}>{children}</div>
    </FormWrapperStyled>
  );
};

export { FormWrapper };
