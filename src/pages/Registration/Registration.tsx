import { makeStyles } from "@material-ui/core/styles";

import { RegistrationWrapperStyled } from "./Registration.style";

import { CreateUser } from "../../components";

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

const Registration = () => {
  const classes = useStyles();

  return (
    <RegistrationWrapperStyled>
      <div className={classes.paper}>
        <CreateUser />
      </div>
    </RegistrationWrapperStyled>
  );
};

export { Registration };
