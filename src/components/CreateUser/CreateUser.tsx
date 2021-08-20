import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { MEGABYTE } from "../../consts";
import { setUser } from "../../redux/actions";

type RegistrationPropsType = {
  email: string;
  name: string;
  password: string;
  upload: any;
};

const CreateUser = () => {
  const history = useHistory();
  const { login }: AuthContextType = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({
    email,
    name,
    password,
    upload,
  }: RegistrationPropsType): void => {
    (async () => {
      try {
        const response = await request("/api/register", "POST", {
          email,
          name,
          password,
          upload,
        });
        message.success(response.message);
        const dataLogin = await request("/api/login", "POST", {
          email,
          password,
        });
        dispatch(setUser(dataLogin.user));
        login(dataLogin.token, dataLogin.userId);
        history.push(`/profile/${dataLogin.userId}`);
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log("Failed:", errorInfo);
  };

  const beforeUpload = (file: any): string | false => {
    const imgType = ["image/png", "image/jpeg", "image/jpeg"];
    if (imgType.includes(file.type) && file.size <= MEGABYTE) {
      return false;
    } else if (imgType.includes(file.type) && file.size > MEGABYTE) {
      message.error(`${file.name} is too big file size`);
      return Upload.LIST_IGNORE;
    } else {
      message.error(`${file.name} is not a png, jpg, jpeg file`);
      return Upload.LIST_IGNORE;
    }
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
      <Form.Item name="upload" valuePropName="file">
        <Upload
          name="logo"
          maxCount={1}
          listType="picture"
          beforeUpload={beforeUpload}>
          <Button icon={<UploadOutlined />}>Click to upload photo</Button>
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
