import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setUser } from "../redux/actions";
import { login, logout, checkAuth } from "../api/auth";
import { setLocalStorageToken, clearLocalStorageToken } from "../utils";

const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginFn = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    const { user, message, accessToken }: LoginDataPropsType = await login({
      email,
      password,
    });
    dispatch(setUser({ user, token: accessToken, isAuth: true }));
    remember && setLocalStorageToken(accessToken);
    history.push(`/`);
    return message;
  };

  const logoutFn = async () => {
    const data = await logout();
    dispatch(
      setUser({
        token: "",
        user: {},
        isAuth: false,
      })
    );
    clearLocalStorageToken();
    return data;
  };

  const checkAuthFn = async () => {
    const response = await checkAuth();
    dispatch(
      setUser({
        user: response?.data?.user,
        token: response?.data?.accessToken,
        isAuth: true,
      })
    );
    setLocalStorageToken(response?.data?.accessToken);
  };

  return { loginFn, logoutFn, checkAuthFn };
};

export default useAuth;
