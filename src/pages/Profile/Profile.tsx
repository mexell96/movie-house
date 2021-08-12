import { useCallback, useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import { ProfileTableStyled, ProfileTbodyStyled } from "./Profile.style";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import {
  FormId,
  FormName,
  FormEmail,
  Loader,
  FormImage,
  FormPassword,
} from "../../components";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    margin: "10px",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

const Profile = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [user, setUser] = useState<UserType | null>(null);
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const getUser = useCallback(async () => {
    try {
      const user = await request(`/api/profile/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(user);
    } catch (e) {
      console.log(e, "Error profile");
    }
  }, [token, id, request]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && id && user && token && (
        <div className={classes.paper}>
          <h2>Profile</h2>
          <FormImage
            avatar={user.avatar}
            id={user._id}
            token={token}
            getUser={getUser}
          />
          <ProfileTableStyled>
            <ProfileTbodyStyled>
              <FormId id={user._id} />
              <FormName
                name={user.name}
                id={user._id}
                token={token}
                getUser={getUser}
              />
              <FormEmail
                email={user.email}
                id={user._id}
                token={token}
                getUser={getUser}
              />
              <FormPassword id={user._id} token={token} getUser={getUser} />
            </ProfileTbodyStyled>
          </ProfileTableStyled>
        </div>
      )}
    </>
  );
};

export { Profile };
