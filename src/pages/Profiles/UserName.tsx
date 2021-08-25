import {
  ProfileErrorStyled,
  ProfileEditIconStyled,
  ProfileEditStyled,
  ProfileChangeIconStyled,
} from "./Profiles.style";

import { message, Form, Input } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { useState, useCallback } from "react";
import { useHttp, useAuth } from "../../hooks/";
import { useSelector } from "react-redux";

const UserName = ({ userName, user }: any) => {
  const [editName, setEditName] = useState(false);
  const { request, loading } = useHttp();
  const { auth } = useAuth();
  const { token } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const getUsers = useCallback(async () => {
    try {
      const users = await request(`/api/profiles`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      // setUsers(users);
    } catch (e) {
      console.log(e, "Error profiles");
    }
  }, [token, request]);

  const onFinishName = ({ name, id }: any): void => {
    (async () => {
      try {
        const response = await request(
          `/api/root-profile-name/${id}`,
          "PATCH",
          { name },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);

        await auth();
        await getUsers();
        setEditName(false);
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ProfileEditStyled>
      {!editName && (
        <>
          {userName}
          <ProfileEditIconStyled onClick={() => setEditName(true)}>
            <EditIcon />
          </ProfileEditIconStyled>
        </>
      )}
      {editName && (
        <Form
          name="Name"
          initialValues={{
            name: userName,
            id: user._id,
          }}
          onFinish={onFinishName}
          onFinishFailed={onFinishFailed}
          scrollToFirstError>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
              {
                min: 2,
                message: "Minimum 2 characters.",
              },
            ]}>
            <Input placeholder="Name" />
          </Form.Item>
          <div style={{ display: "none" }}>
            <Form.Item name="id">
              <Input placeholder="Id" />
            </Form.Item>
          </div>
          <Form.Item>
            <ProfileChangeIconStyled>
              <ProfileEditIconStyled type="submit">
                <SaveIcon />
              </ProfileEditIconStyled>
              <ProfileEditIconStyled onClick={() => setEditName(false)}>
                <CancelIcon />
              </ProfileEditIconStyled>
            </ProfileChangeIconStyled>
          </Form.Item>
        </Form>
      )}
    </ProfileEditStyled>
  );
};

export { UserName };
