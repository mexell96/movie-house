import { useContext, useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { message, Button } from "antd";

import {
  ProfileTableStyled,
  ProfileTbodyStyled,
  ProfileAvatarWrapperStyled,
  ProfileButtonDeleteAccountStyled,
  ProfileModalButtonsWrapperStyled,
  ProfileWrapperStyled,
  ProfileCardWrapperStyled,
} from "./Profile.style";

import { useHttp } from "../../hooks/http.hook";
import { useAuth } from "../../hooks/auth.hook";
import { AuthContext } from "../../context/AuthContext";
import {
  FormId,
  FormName,
  FormEmail,
  FormSelect,
  Loader,
  FormImage,
  FormPassword,
  ReviewCard,
  Modal,
} from "../../components";

const Profile = () => {
  const history = useHistory();
  const { token, getUser, logout } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const { getUserReviews } = useAuth();
  const { id } = useParams<{ id: string }>();
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [userReviews, setUserReviews] = useState<ReviewType[] | null>(null);

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

  const getUserReviewsFromDB = async () => {
    const userReviewsDB = await getUserReviews(id, token);
    setUserReviews(userReviewsDB);
  };

  useEffect(() => {
    getUserReviewsFromDB();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && id && userReducer && token && (
        <ProfileWrapperStyled>
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
              <FormSelect
                theme={userReducer.theme}
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
        </ProfileWrapperStyled>
      )}
      {userReviews && (
        <ProfileCardWrapperStyled>
          {userReviews.map((item) => (
            <ReviewCard
              key={item.uid}
              review={item}
              getUserReviewsFromDB={getUserReviewsFromDB}
            />
          ))}
        </ProfileCardWrapperStyled>
      )}
    </>
  );
};

export { Profile };
