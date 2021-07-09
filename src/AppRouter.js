import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./AppRouter.css";
import { Header, Movie, Navbar } from "./components";
import { Home, Movies, PreviousSearches } from "./pages";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <div className="app">
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
      </div>
      <Navbar />
    </Router>
  );
};

export { AppRouter };
