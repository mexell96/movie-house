import { Link } from "react-router-dom";
import HistoryIcon from "@material-ui/icons/History";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";

import { NavbarStyled, NavbarButtonStyled } from "./Navbar.style";

const Navbar = (): JSX.Element => {
  return (
    <NavbarStyled>
      <NavbarButtonStyled
        color="primary"
        component={Link}
        to="/"
        startIcon={<HomeIcon />}>
        Home
      </NavbarButtonStyled>
      <NavbarButtonStyled
        color="primary"
        component={Link}
        to="/movies"
        startIcon={<SearchIcon />}>
        Movies
      </NavbarButtonStyled>
      <NavbarButtonStyled
        color="primary"
        component={Link}
        to="/previous-searches"
        startIcon={<HistoryIcon />}>
        Previous search
      </NavbarButtonStyled>
    </NavbarStyled>
  );
};

export { Navbar };
