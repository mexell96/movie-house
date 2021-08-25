import { useDispatch } from "react-redux";

import { setUser } from "../redux/actions";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(
      setUser({
        token: "",
        user: {
          email: "",
          name: "",
          role: "",
          _id: "",
          avatar: "",
          theme: "",
          createdAt: "",
          updatedAt: "",
        },
      })
    );
    localStorage.removeItem("userData");
  };

  return { logout };
};

export { useLogout };
