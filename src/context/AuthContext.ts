import { createContext } from "react";

const noop = () => {};

const theme = () => ({
  body: "",
  text: "",
  toggleBorder: "",
  background: "",
});

const asyncFunction: () => Promise<void> = async () => {
  await new Promise((res, rej) => {});
};

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  getUser: asyncFunction,
  getTheme: theme,
  setReview: asyncFunction,
  getReviews: asyncFunction,
  getUserReviews: asyncFunction,
  authLoading: false,
} as AuthContextType);
