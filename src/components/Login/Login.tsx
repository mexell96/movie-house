import { useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const history = useHistory();
  const authentication: any = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ email, password, remember }: any) => {
    const loginHandler = async () => {
      try {
        const data = await request("/api/login", "POST", {
          email,
          password,
          remember,
        });
        console.log("DATA loginPage ---", data);
        message.success(data.message);
        authentication.login(data.token, data.userId);
        history.push(`/`);
      } catch (e) {
        console.log(e, "E message loginPage");
      }
    };
    loginHandler();
  };

  const onFinishFailed = (errorInfo: any) => {
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
