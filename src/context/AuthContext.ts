import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  userId: string | null;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  getUser: () => Promise<void>;
};

const noop = () => {};

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
} as AuthContextType);
