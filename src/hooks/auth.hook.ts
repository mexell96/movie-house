import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { setUser } from "../redux/actions";
import { useHttp } from "./http.hook";
import { lightTheme, darkTheme } from "../Themes";

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const getTheme = () => {
    return userReducer.theme === "light" ? lightTheme : darkTheme;
  };

  const getUser = useCallback(async () => {
    const data: DataLSType = JSON.parse(
      localStorage.getItem("userData") || "null"
    );
    if (data) {
      try {
        const user: any = await request(
          `/api/profile/${data.userId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${data.token}`,
          }
        );
        dispatch(setUser(user));
      } catch (e) {
        console.log(e, "Error profile");
      }
    }
  }, []);

  const getReviews = useCallback(async (id: string) => {
    try {
      const reviews = await request(`/api/reviews/${id}`, "GET");
      return reviews;
    } catch (e) {
      console.log(e, "E message createUserPage");
    }
  }, []);

  const setReview = useCallback(async (newReview: ReviewType) => {
    try {
      const response = await request("/api/create-review", "POST", newReview);
      message.success(response.message);
    } catch (e) {
      console.log(e, "E message createUserPage");
    }
  }, []);

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    getTheme();
    dispatch(setUser({}));
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const data: DataLSType = JSON.parse(
      localStorage.getItem("userData") || "null"
    );
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return {
    login,
    logout,
    token,
    userId,
    ready,
    getUser,
    getTheme,
    setReview,
    getReviews,
  };
};

export { useAuth };
