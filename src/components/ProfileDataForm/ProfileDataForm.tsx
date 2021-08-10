import { useEffect } from "react";
import { Form, Input, Button, message } from "antd";

import { ProfileDataFormStyled } from "./Profile.style";

import { noPicture } from "../../consts";
import { useHttp } from "../../hooks/http.hook";

type MaterialUIStyleType = {
  paper: string;
};

type ProfileDataFormPropsType = {
  user: any;
  classes: MaterialUIStyleType;
  setEditMode: any;
  getUser: any;
  token: any;
};

const ProfileDataForm = ({
  user,
  classes,
  setEditMode,
  getUser,
  token,
}: ProfileDataFormPropsType) => {
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ name, email }: any) => {
    const registerHandler = async () => {
      try {
        const response = await request(
          `/api/profile/${user._id}`,
          "POST",
          {
            name,
            email,
          },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        message.success(response.message);
        setEditMode(false);
        getUser();
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    };
    registerHandler();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes.paper}>
      <h2>Edit profile</h2>
      <div>
        <ProfileDataFormStyled src={user.avatar || noPicture} alt="avatar" />
      </div>
      <Form
        name="register"
        initialValues={{
          name: user.name,
          email: user.email,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError>
        <h2>Registration</h2>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
            { min: 2, message: "Username must be minimum 2 characters." },
          ]}>
          <Input placeholder="Name" value="ttt" />
        </Form.Item>
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
          <Input placeholder="Email" value={user.email} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" disabled={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { ProfileDataForm };
