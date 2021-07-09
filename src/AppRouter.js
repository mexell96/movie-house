import { Container } from "@material-ui/core";
import React from "react";
import "./AppRouter.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Movie } from "./components/Movie/Movie";
import { Movies } from "./pages/Movies";
import { PreviousSearches } from "./pages/PreviousSearches";
import Header from "./components/Header/Header";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/movies/:id" component={Movie} />
            <Route path="/movies" component={Movies} />
            <Route path="/previous-searches" component={PreviousSearches} />
          </Switch>
        </Container>
      </div>
      <Navbar />
    </Router>
  );
};

export { AppRouter };
