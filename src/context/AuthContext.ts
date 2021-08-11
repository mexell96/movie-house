import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  userId: string | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
};

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
} as AuthContextType);
