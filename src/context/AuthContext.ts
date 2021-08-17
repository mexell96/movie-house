import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  userId: string | null;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  getUser: () => Promise<void>;
  getTheme: () => {
    body: string;
    text: string;
    toggleBorder: string;
    background: string;
  };
  setReview: (newReview: ReviewType) => Promise<void>;
  getReviews: (id: string) => Promise<void>;
  getUserReviews: (id: string, token: string) => Promise<void>;
};

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
} as AuthContextType);
