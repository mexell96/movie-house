import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { message, Button } from "antd";

import {
  ProfileTableStyled,
  ProfileTbodyStyled,
  ProfileAvatarWrapperStyled,
  ProfileButtonAccountStyled,
  ProfileModalButtonsWrapperStyled,
  ProfileWrapperStyled,
  ProfileCardWrapperStyled,
} from "./Profile.style";

import useAuth from "../../hooks/auth";
import { getUserReviews } from "../../api/review";
import { deleteUser } from "../../api/user";

import {
  FormId,
  FormName,
  FormEmail,
  FormSelect,
  FormImage,
  FormPassword,
  ReviewCard,
  Modal,
} from "../../components";

const Profile = () => {
  const history = useHistory();
  const { logoutFn } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { token, user } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [userReviews, setUserReviews] = useState<any>(null);

  const deleteUserFn = async () => {
    const response = await deleteUser(id);
    message.success(response.message);
    logoutFn();
    history.push(`/`);
  };

  const getUserReviewsFromDB = async () => {
    const userReviewsDB = await getUserReviews(id);
    setUserReviews(userReviewsDB);
  };

  useEffect(() => {
    getUserReviewsFromDB();
  }, []);

  return (
    <>
      {id && token && (
        <ProfileWrapperStyled>
          <h2>Profile</h2>
          <ProfileAvatarWrapperStyled>
            <FormImage avatar={user.avatar} id={user.id} token={token} />
          </ProfileAvatarWrapperStyled>
          <ProfileTableStyled>
            <ProfileTbodyStyled>
              <FormId id={user.id} />
              <FormName name={user.name} id={user.id} token={token} />
              <FormEmail email={user.email} id={user.id} token={token} />
              <FormPassword id={user.id} token={token} />
              <FormSelect theme={user.theme} id={user.id} token={token} />
            </ProfileTbodyStyled>
          </ProfileTableStyled>
          <ProfileButtonAccountStyled onClick={() => setShowModal(true)}>
            Delete account
          </ProfileButtonAccountStyled>
          {(user.role === "SUPERADMIN" || user.role === "ADMIN") && (
            <ProfileButtonAccountStyled>
              <Link to={`/users`}>View users</Link>
            </ProfileButtonAccountStyled>
          )}
          {showModal && (
            <Modal
              close={setShowModal}
              title="Do you want to delete this account?">
              <ProfileModalButtonsWrapperStyled>
                <Button onClick={deleteUserFn}>Yes</Button>
                <Button onClick={() => setShowModal(false)}>No</Button>
              </ProfileModalButtonsWrapperStyled>
            </Modal>
          )}
        </ProfileWrapperStyled>
      )}
      {userReviews && (
        <ProfileCardWrapperStyled>
          {userReviews.map((item: any) => (
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
