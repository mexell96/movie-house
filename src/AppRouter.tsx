import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "styled-components";

import { AppRouterStyled } from "./AppRouter.style";
import { GlobalStyles } from "./styles";

import { Header, Loader, Navbar } from "./components";
import { setReviews } from "./redux/actions";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { token, login, logout, userId, ready, getUser, getTheme } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    dispatch(setReviews(JSON.parse(localStorage.getItem("Reviews") || "null")));
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  if (!ready) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={getTheme}>
      <GlobalStyles />
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          isAuthenticated,
          getUser,
          getTheme,
        }}>
        <Router>
          <Header />
          <AppRouterStyled>
            <Container>{routes}</Container>
          </AppRouterStyled>
          <Navbar />
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export { AppRouter };
