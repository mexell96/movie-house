import { useEffect, useContext } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const CreateUser = () => {
  const history = useHistory();
  const authentication: any = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ email, name, password }: any) => {
    const registerHandler = async () => {
      try {
        const response = await request("/api/register", "POST", {
          email,
          name,
          password,
        });
        message.success(response.message);
        const dataLogin = await request("/api/login", "POST", {
          email,
          password,
        });
        authentication.login(dataLogin.token, dataLogin.userId);
        history.push(`/profile/${dataLogin.userId}`);
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
    <Form
      name="register"
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
        <Input placeholder="Name" />
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
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          { min: 6, message: "Password must be minimum 6 characters." },
        ]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}>
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item
        name="upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}>
        <Upload name="logo" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" disabled={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export { CreateUser };
