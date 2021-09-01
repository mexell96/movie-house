import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "styled-components";

import { AppRouterStyled } from "./AppRouter.style";
import { GlobalStyles } from "./styles";

import { Header, Navbar } from "./components";
import useAuth from "./hooks/auth";
import Routes from "./routes";
import { lightTheme, darkTheme } from "./themes";

const AppRouter = () => {
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const theme = () =>
    userReducer?.user?.theme === "light" ? lightTheme : darkTheme;

  const { checkAuthFn } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuthFn();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <AppRouterStyled>
          <Container>
            <Routes />
          </Container>
        </AppRouterStyled>
        <Navbar />
      </Router>
    </ThemeProvider>
  );
};

export { AppRouter };
