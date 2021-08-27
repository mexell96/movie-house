import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setUser } from "../redux/actions";
import { authentification, login } from "../api/auth";
import { clearLocalStorageToken, setLocalStorageToken } from "../utils";

const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = async () => {
    const token: string = JSON.parse(
      localStorage.getItem("authToken") || "null"
    );

    if (token) {
      const user: UserType = await authentification();
      dispatch(setUser({ token, user, isAuth: true }));
    }
  };

  const loginFn = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    const { user, message, token }: LoginDataPropsType = await login({
      email,
      password,
    });
    dispatch(setUser({ user, token, isAuth: true }));
    remember && setLocalStorageToken(token);
    history.push(`/`);
    return message;
  };

  const logout = () => {
    dispatch(
      setUser({
        token: "",
        user: {},
        isAuth: false,
      })
    );
    clearLocalStorageToken();
  };

  return { auth, loginFn, logout };
};

export default useAuth;
