import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import {
  ProfileTableStyled,
  ProfileTbodyStyled,
  ProfileAvatarWrapperStyled,
} from "./Profile.style";

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
  const { token, getUser } = useContext(AuthContext);
  const { loading } = useHttp();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && id && userReducer && token && (
        <div className={classes.paper}>
          <h2>Profile</h2>
          <ProfileAvatarWrapperStyled>
            <FormImage
              avatar={userReducer.avatar}
              id={userReducer._id}
              token={token}
              getUser={getUser}
            />
          </ProfileAvatarWrapperStyled>
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
