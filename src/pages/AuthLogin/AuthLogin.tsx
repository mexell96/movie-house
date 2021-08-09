import { makeStyles } from "@material-ui/core/styles";

import { AuthLoginWrapperStyled } from "./AuthLogin.style";

import { Login } from "../../components";

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

const AuthLogin = () => {
  const classes = useStyles();

  return (
    <AuthLoginWrapperStyled>
      <div className={classes.paper}>
        <Login />
      </div>
    </AuthLoginWrapperStyled>
  );
};

export { AuthLogin };
