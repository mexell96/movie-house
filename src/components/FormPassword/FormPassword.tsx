import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";

import {
  FormPasswordTrStyled,
  FormPasswordTdStyled,
} from "./FormPassword.style";

import { useHttp } from "../../hooks/http.hook";
import { FormPasswordDivStyled } from "./FormPassword.style";

type FormPasswordPropType = {
  id: string;
  token: string;
  getUser: () => Promise<void>;
};

type PasswordsPropType = {
  oldPassword: string;
  newPassword: string;
};

const FormPassword = ({ id, token, getUser }: FormPasswordPropType) => {
  const [editPassword, setEditPassword] = useState(false);
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ oldPassword, newPassword }: PasswordsPropType) => {
    (async () => {
      try {
        const response = await request(
          `/api/profile-password/${id}`,
          "PATCH",
          { oldPassword, newPassword },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);
        setEditPassword(false);
        await getUser();
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormPasswordTrStyled>
      <FormPasswordTdStyled>Password:</FormPasswordTdStyled>
      {!editPassword && <FormPasswordTdStyled></FormPasswordTdStyled>}
      {editPassword && (
        <FormPasswordTdStyled>
          <Form
            name="Password"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError>
            <FormPasswordDivStyled>
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  { min: 6, message: "Password must be minimum 6 characters." },
                ]}>
                <Input.Password placeholder="Current password" />
              </Form.Item>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  { min: 6, message: "Password must be minimum 6 characters." },
                ]}>
                <Input.Password placeholder="New password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}>
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
            </FormPasswordDivStyled>
            <Form.Item>
              <Button htmlType="submit" disabled={loading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </FormPasswordTdStyled>
      )}
      <FormPasswordTdStyled>
        {!editPassword && (
          <Button onClick={() => setEditPassword(true)}>Change</Button>
        )}
        {editPassword && (
          <Button onClick={() => setEditPassword(false)}>Cancel</Button>
        )}
      </FormPasswordTdStyled>
    </FormPasswordTrStyled>
  );
};

export { FormPassword };
