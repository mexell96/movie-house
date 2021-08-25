import { useState } from "react";
import { useDispatch } from "react-redux";

import { useHttp } from "./";
import { setUser } from "../redux/actions";

const useAuth = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const [loading, setLoading] = useState(false);

  const auth = async () => {
    setLoading(true);
    const data: DataLSType = JSON.parse(
      localStorage.getItem("userData") || "null"
    );

    if (data && data.token) {
      try {
        const user: UserType = await request(
          `/api/profile`,
          "POST",
          { token: data.token },
          {
            Authorization: `Bearer ${data.token}`,
          }
        );
        dispatch(setUser({ token: data.token, user }));
      } catch (e) {
        console.log(e, "Error profile");
      }
    }
    setLoading(false);
  };

  return { auth, loading };
};

export { useAuth };
