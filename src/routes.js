import { Route, Switch, Redirect } from "react-router-dom";

import {
  Home,
  Authentication,
  Movies,
  PreviousSearches,
  Profile,
} from "./pages";

import { Movie } from "./components";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movies/:id" component={Movie} exact />
        <Route path="/movies" component={Movies} exact />
        <Route path="/previous-searches" component={PreviousSearches} exact />
        <Route path="/profile/:id" component={Profile} exact />
        <Route path="/auth" component={Authentication} exact />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/movies/:id" component={Movie} exact />
      <Route path="/movies" component={Movies} exact />
      <Route path="/auth" component={Authentication} exact />
      <Redirect to="/auth" />
    </Switch>
  );
};

export { useRoutes };
