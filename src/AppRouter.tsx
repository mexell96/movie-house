import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "styled-components";

import { AppRouterStyled } from "./AppRouter.style";
import { GlobalStyles } from "./styles";

import { Header, Loader, Navbar } from "./components";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

const AppRouter = () => {
  const {
    token,
    login,
    logout,
    userId,
    ready,
    getUser,
    getTheme,
    setReview,
    getReviews,
    getUserReviews,
    authLoading,
  } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {!ready && <Loader />}
      {ready && (
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
              setReview,
              getReviews,
              getUserReviews,
              authLoading,
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
      )}
    </>
  );
};

export { AppRouter };
