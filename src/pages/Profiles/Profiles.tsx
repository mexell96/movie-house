import { useCallback, useContext, useState, useEffect } from "react";

import { ProfileImgStyled, ProfileWrapperStyled } from "./Profiles.style";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components";
import { noPicture } from "../../consts";

const body = (data: any) => {
  if (data.length > 0) {
    return (
      <>
        {data.map((user: any) => (
          <ProfileWrapperStyled key={user._id}>
            <h2>Profile</h2>
            <div>{user._id}</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <ProfileImgStyled src={user.avatar || noPicture} alt="avatar" />
          </ProfileWrapperStyled>
        ))}
      </>
    );
  }
};

const Profiles = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [data, setData] = useState([]);

  const getName = useCallback(async () => {
    try {
      const users = await request(`/api/profiles`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setData(users);
    } catch (e) {
      console.log(e, "Error profiles");
    }
  }, [token, request]);

  useEffect(() => {
    getName();
  }, [getName]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && body(data)}</>;
};

export { Profiles };
