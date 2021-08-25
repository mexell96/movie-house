import { useCallback, useState, useEffect } from "react";
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

import { useHttp } from "../../hooks";
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
import { useLogout } from "../../hooks/logout";
import { useAuth } from "../../hooks/auth";
import { useGetUserReviews } from "../../hooks/getUserReviews";

const Profile = () => {
  const history = useHistory();

  const { auth } = useAuth();
  const { logout } = useLogout();
  const { request } = useHttp();
  const { getUserReviews } = useGetUserReviews();
  const { id } = useParams<{ id: string }>();
  const { token, user } = useSelector(
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
    try {
      const userReviewsDB = await getUserReviews(id, token);
      setUserReviews(userReviewsDB);
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  useEffect(() => {
    getUserReviewsFromDB();
  }, []);

  // if (authLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      {id && token && (
        <ProfileWrapperStyled>
          <h2>Profile</h2>
          <ProfileAvatarWrapperStyled>
            <FormImage
              avatar={user.avatar}
              id={user._id}
              token={token}
              auth={auth}
            />
          </ProfileAvatarWrapperStyled>
          <ProfileTableStyled>
            <ProfileTbodyStyled>
              <FormId id={user._id} />
              <FormName
                name={user.name}
                id={user._id}
                token={token}
                auth={auth}
              />
              <FormEmail
                email={user.email}
                id={user._id}
                token={token}
                auth={auth}
              />
              <FormPassword id={user._id} token={token} auth={auth} />
              <FormSelect
                theme={user.theme}
                id={user._id}
                token={token}
                auth={auth}
              />
            </ProfileTbodyStyled>
          </ProfileTableStyled>
          <ProfileButtonAccountStyled onClick={() => setShowModal(true)}>
            Delete account
          </ProfileButtonAccountStyled>
          {(user.role === "SUPERADMIN" || user.role === "ADMIN") && (
            <ProfileButtonAccountStyled>
              <Link to={`/profiles`}>View users</Link>
            </ProfileButtonAccountStyled>
          )}
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
