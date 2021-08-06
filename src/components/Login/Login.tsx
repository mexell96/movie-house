import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values: any) => {
    const { email, password, remember } = values;
    console.log("Success:", values);

    const data = JSON.parse(localStorage.getItem("Users") || "null");
    const user = data[email];
    console.log(user, "user 444");

    if (user && password === user.password) {
      dispatch(login(user));
      message.success("Сonfirmed");
      history.push(`/`);
    } else {
      message.error("Error - wrong data");
    }
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
        <Button htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  );
};

export { Login };
