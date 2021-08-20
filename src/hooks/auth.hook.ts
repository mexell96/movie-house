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
  const [authLoading, setAuthLoading] = useState(false);

  const getTheme = () =>
    userReducer.theme === "light" ? lightTheme : darkTheme;

  const getUser = useCallback(async () => {
    setAuthLoading(true);
    const data: DataLSType = JSON.parse(
      localStorage.getItem("userData") || "null"
    );
    if (data) {
      try {
        const user: UserType = await request(
          `/api/profile/${data.userId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${data.token}`,
          }
        );
        dispatch(setUser(user));
        setAuthLoading(false);
      } catch (e) {
        setAuthLoading(false);
        console.log(e, "Error profile");
      }
    }
  }, []);

  const getReviews = useCallback(async (id: string) => {
    setAuthLoading(true);
    try {
      const reviews = await request(`/api/reviews/${id}`, "GET");
      console.log(reviews, "reviews 333");
      setAuthLoading(false);
      return reviews;
    } catch (e) {
      setAuthLoading(false);
      console.log(e, "E message createUserPage");
    }
  }, []);

  const setReview = useCallback(async (newReview: ReviewType) => {
    setAuthLoading(true);
    try {
      const response = await request("/api/create-review", "POST", newReview);
      message.success(response.message);
      setAuthLoading(false);
    } catch (e) {
      setAuthLoading(false);
      console.log(e, "E message createUserPage");
    }
  }, []);

  const getUserReviews = useCallback(
    async (id: string, token: string | null) => {
      setAuthLoading(true);
      try {
        const reviews = await request(
          `/api/profile-reviews/${id}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setAuthLoading(false);
        return reviews;
      } catch (e) {
        setAuthLoading(false);
        console.log(e, "E message createUserPage");
      }
    },
    []
  );

  const login = useCallback((jwtToken: string, id: string) => {
    setAuthLoading(true);
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: jwtToken })
    );
    setAuthLoading(false);
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
    getUserReviews,
    authLoading,
  };
};

export { useAuth };
