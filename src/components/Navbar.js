import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import HistoryIcon from "@material-ui/icons/History";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
  button: {
    margin: theme.spacing(0),
    color: "white",
  },
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();

  return (
    <BottomNavigation showLabels className={classes.root}>
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
    </BottomNavigation>
  );
}
