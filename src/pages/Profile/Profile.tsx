import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import { ProfileTableStyled, ProfileTbodyStyled } from "./Profile.style";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { setUser } from "../../redux/actions";
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
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const getUser = useCallback(async () => {
    try {
      const user: UserType = await request(`/api/profile/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(setUser(user));
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
      {!loading && id && userReducer && token && (
        <div className={classes.paper}>
          <h2>Profile</h2>
          <FormImage
            avatar={userReducer.avatar}
            id={userReducer._id}
            token={token}
            getUser={getUser}
          />
          <ProfileTableStyled>
            <ProfileTbodyStyled>
              <FormId id={userReducer._id} />
              <FormName
                name={userReducer.name}
                id={userReducer._id}
                token={token}
                getUser={getUser}
              />
              <FormEmail
                email={userReducer.email}
                id={userReducer._id}
                token={token}
                getUser={getUser}
              />
              <FormPassword
                id={userReducer._id}
                token={token}
                getUser={getUser}
              />
            </ProfileTbodyStyled>
          </ProfileTableStyled>
        </div>
      )}
    </>
  );
};

export { Profile };
