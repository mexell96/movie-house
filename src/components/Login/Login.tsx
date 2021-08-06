import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values: any) => {
    const { email, password, remember } = values;
    const data = JSON.parse(localStorage.getItem("Users") || "null");

    for (const user in data) {
      console.log(data[user].email, "1111");

      if (data[user].email === email && data[user].password === password) {
        dispatch(login(data[user]));
        message.success("Сonfirmed");
        history.push(`/`);
        return;
      }
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
