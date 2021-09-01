import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  Home,
  AuthLogin,
  Movies,
  PreviousSearches,
  Profile,
  Profiles,
  Registration,
  Movie,
} from "./pages";

const Routes = (): JSX.Element => {
  const { isAuth } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/movies/:id" component={Movie} exact />
      <Route path="/movies" component={Movies} exact />
      <Route path="/previous-searches" component={PreviousSearches} exact />
      {isAuth && <Route path="/user/:id" component={Profile} exact />}
      {isAuth && <Route path="/users" component={Profiles} exact />}
      {!isAuth && <Route path="/login" component={AuthLogin} exact />}
      {!isAuth && <Route path="/registration" component={Registration} exact />}
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
