import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import { AppRouterStyled } from "./AppRouter.style";

import { Home, Movies, PreviousSearches } from "./pages";
import { Header, Movie, Navbar } from "./components";
import { setReviews } from "./redux/actions";

const AppRouter = () => {
  const dispatch = useDispatch();

  dispatch(setReviews(JSON.parse(localStorage.getItem("Reviews") || "null")));

  return (
    <Router>
      <Header />
      <AppRouterStyled>
        <Container>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/movies/:id" component={Movie} exact />
            <Route path="/movies" component={Movies} exact />
            <Route
              path="/previous-searches"
              component={PreviousSearches}
              exact
            />
          </Switch>
        </Container>
      </AppRouterStyled>
      <Navbar />
    </Router>
  );
};

export { AppRouter };
