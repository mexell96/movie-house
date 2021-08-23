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
import { useState, useContext, useCallback } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

const UserEmail = ({ userEmail, user }: any) => {
  const { token }: AuthContextType = useContext(AuthContext);
  const [editEmail, setEditEmail] = useState(false);
  const { request, loading } = useHttp();
  const { getUser } = useAuth();

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

  const onFinishEmail = ({ email, id }: any): void => {
    (async () => {
      try {
        const response = await request(
          `/api/root-profile-email/${id}`,
          "PATCH",
          { email },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);

        await getUser();
        await getUsers();
        setEditEmail(false);
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
      {!editEmail && (
        <>
          {userEmail}
          <ProfileEditIconStyled onClick={() => setEditEmail(true)}>
            <EditIcon />
          </ProfileEditIconStyled>
        </>
      )}

      {editEmail && (
        <Form
          name="Email"
          initialValues={{
            email: userEmail,
            id: user._id,
          }}
          onFinish={onFinishEmail}
          onFinishFailed={onFinishFailed}
          scrollToFirstError>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}>
            <Input placeholder="Email" />
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
              <ProfileEditIconStyled onClick={() => setEditEmail(false)}>
                <CancelIcon />
              </ProfileEditIconStyled>
            </ProfileChangeIconStyled>
          </Form.Item>
        </Form>
      )}
    </ProfileEditStyled>
  );
};

export { UserEmail };
