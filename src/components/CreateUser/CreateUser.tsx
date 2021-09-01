import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { MEGABYTE } from "../../consts";
import { setUser } from "../../redux/actions";
import useHttp from "../../hooks/http";
import { setLocalStorageToken } from "../../utils";
import { login, register } from "../../api/auth";

type RegistrationPropsType = {
  email: string;
  name: string;
  password: string;
  upload: any;
};

const CreateUser = (): JSX.Element => {
  const history = useHistory();
  const { loading, error, clearError } = useHttp();
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
        const response = await register({
          email,
          name,
          password,
          upload,
        });
        message.success(response.message);
        const dataUser = await login({ email, password });
        dispatch(
          setUser({
            user: dataUser.user,
            token: dataUser.accessToken,
            isAuth: true,
          })
        );
        setLocalStorageToken(dataUser.accessToken);
        history.push(`/user/${dataUser.user.id}`);
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
