import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HistoryIcon from "@material-ui/icons/History";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
    height: "56px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(0),
    color: "white",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        component={Link}
        to="/"
        startIcon={<HomeIcon />}
        className={classes.button}>
        Home
      </Button>
      <Button
        color="primary"
        component={Link}
        to="/movies"
        startIcon={<SearchIcon />}
        className={classes.button}>
        Movies
      </Button>
      <Button
        color="primary"
        component={Link}
        to="/previous-searches"
        startIcon={<HistoryIcon />}
        className={classes.button}>
        Previous search
      </Button>
    </div>
  );
};

export { Navbar };
