import { useContext, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { message, Button } from "antd";

import {
  ProfileTableStyled,
  ProfileTbodyStyled,
  ProfileAvatarWrapperStyled,
  ProfileButtonDeleteAccountStyled,
  ProfileModalButtonsWrapperStyled,
} from "./Profile.style";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "../../components/index";
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
  const history = useHistory();
  const { token, getUser, logout } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );
  const [showModal, setShowModal] = useState(false);

  const deleteUser = useCallback(async () => {
    try {
      const response = await request(`/api/delete-user/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      message.success(response.message);
      logout();
      history.push(`/`);
    } catch (e) {
      console.log(e, "Error profiles");
    }
  }, []);

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
          <ProfileButtonDeleteAccountStyled onClick={() => setShowModal(true)}>
            Delete account
          </ProfileButtonDeleteAccountStyled>
          {showModal && (
            <Modal
              close={setShowModal}
              title="Do you want to delete this account?">
              <ProfileModalButtonsWrapperStyled>
                <Button onClick={deleteUser}>Yes</Button>
                <Button onClick={() => setShowModal(false)}>No</Button>
              </ProfileModalButtonsWrapperStyled>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export { Profile };
