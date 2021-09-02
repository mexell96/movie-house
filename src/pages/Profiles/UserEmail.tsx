import {
  ProfileEditIconStyled,
  ProfileEditStyled,
  ProfileChangeIconStyled,
} from "./Profiles.style";

import { message, Form, Input } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { useState } from "react";

import { changeEmail } from "../../api/user";

const UserEmail = ({ userEmail, user, getUsersFn }: any) => {
  const [editEmail, setEditEmail] = useState(false);

  const onFinishEmail = ({ email, id }: any): void => {
    (async () => {
      try {
        const response = await changeEmail(id, email, "root-");
        message.success(response.message);
        await getUsersFn();
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
            id: user.id,
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
