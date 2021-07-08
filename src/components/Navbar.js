import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();

  return (
    <BottomNavigation showLabels className={classes.root}>
      <Link to="/">
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Home"
          icon={<HomeIcon />}
        />
      </Link>
      <Link to="/movies">
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />
      </Link>
      <Link to="/previous-searches">
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Previous search"
          icon={<SearchIcon />}
        />
      </Link>
    </BottomNavigation>
  );
}
