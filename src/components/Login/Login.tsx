import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";

import { useHttp, useLogin } from "../../hooks";
import { setUser } from "../../redux/actions";

type LoginPropsType = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const history = useHistory();
  const { login } = useLogin();
  const { loading, error, request, clearError } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ email, password, remember }: LoginPropsType): void => {
    (async () => {
      try {
        const data: LoginDataPropsType = await request("/api/login", "POST", {
          email,
          password,
        });
        message.success(data.message);
        dispatch(setUser({ user: data.user, token: data.token }));
        remember && login(data.token);
        history.push(`/`);
      } catch (e) {
        console.log(e, "E message loginPage");
      }
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
