import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "styled-components";

import { AppRouterStyled } from "./AppRouter.style";
import { GlobalStyles } from "./styles";

import { Header, Loader, Navbar } from "./components";
import { useRoutes } from "./routes";
import { useAuth, useTheme } from "./hooks/";

const AppRouter = () => {
  const { token } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );
  const { auth, loading } = useAuth();
  const { theme } = useTheme();

  const routes = useRoutes(!!token);

  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router>
            <Header />
            <AppRouterStyled>
              <Container>{routes}</Container>
            </AppRouterStyled>
            <Navbar />
          </Router>
        </ThemeProvider>
      )}
    </>
  );
};

export { AppRouter };
