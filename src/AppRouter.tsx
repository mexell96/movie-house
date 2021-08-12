import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@material-ui/core";

import { AppRouterStyled } from "./AppRouter.style";

import { Header, Loader, Navbar } from "./components";
import { setReviews, setUser } from "./redux/actions";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { useHttp } from "./hooks/http.hook";
import { AuthContext } from "./context/AuthContext";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const { request } = useHttp();

  dispatch(setReviews(JSON.parse(localStorage.getItem("Reviews") || "null")));

  const data: DataLSType = JSON.parse(
    localStorage.getItem("userData") || "null"
  );

  useEffect(() => {
    (async () => {
      try {
        if (data) {
          const user = await request(
            `/api/profile/${data.userId}`,
            "GET",
            null,
            {
              Authorization: `Bearer ${data.token}`,
            }
          );
          dispatch(setUser(user));
        }
      } catch (e) {
        console.log(e, "Error profile");
      }
    })();
  }, []);

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
