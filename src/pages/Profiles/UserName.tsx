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

import { changeName } from "../../api/user";

const UserName = ({ userName, user, getUsersFn }: any) => {
  const [editName, setEditName] = useState(false);

  const onFinishName = ({ name, id }: any): void => {
    (async () => {
      try {
        const response = await changeName(id, name, "root-");
        message.success(response.message);
        await getUsersFn();
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
            id: user.id,
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
