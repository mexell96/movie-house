import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Movie } from "./pages/Movie";
import { Movies } from "./pages/Movies";
import { PreviousSearches } from "./pages/PreviousSearches";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/movies/:id">
          <Movie />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/previous-searches">
          <PreviousSearches />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export { AppRouter };
