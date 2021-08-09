import { Route, Switch, Redirect } from "react-router-dom";

import {
  Home,
  AuthLogin,
  Movies,
  PreviousSearches,
  Profile,
  Profiles,
  Registration,
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
        <Route path="/profiles" component={Profiles} exact />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/movies/:id" component={Movie} exact />
      <Route path="/movies" component={Movies} exact />
      <Route path="/previous-searches" component={PreviousSearches} exact />
      <Route path="/login" component={AuthLogin} exact />
      <Route path="/registration" component={Registration} exact />
      <Redirect to="/" />
    </Switch>
  );
};

export { useRoutes };
