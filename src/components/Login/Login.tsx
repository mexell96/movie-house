import { useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";

import useHttp from "../../hooks/http";
import useAuth from "../../hooks/auth";

type LoginPropsType = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const { loading, error, clearError } = useHttp();
  const { loginFn } = useAuth();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ email, password, remember }: LoginPropsType): void => {
    (async () => {
      const messageSuccess = await loginFn(email, password, remember);
      message.success(messageSuccess);
    })();
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError>
      <h2>Login</h2>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          { required: true, message: "Please input your email!" },
        ]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" disabled={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export { Login };
