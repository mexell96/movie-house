import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@material-ui/core";

import { AppRouterStyled } from "./AppRouter.style";

import { Header, Loader, Navbar } from "./components";
import { setReviews } from "./redux/actions";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  dispatch(setReviews(JSON.parse(localStorage.getItem("Reviews") || "null")));

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}>
      <Router>
        <Header />
        <AppRouterStyled>
          <Container>{routes}</Container>
        </AppRouterStyled>
        <Navbar />
      </Router>
    </AuthContext.Provider>
  );
};

export { AppRouter };
