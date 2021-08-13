import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";

import {
  FormEmailTrStyled,
  FormEmailTdStyled,
  FormEmailDivStyled,
} from "./FormEmail.style";

import { useHttp } from "../../hooks/http.hook";

type FormEmailPropType = {
  email: string;
  id: string;
  token: string;
  getUser: () => Promise<void>;
};

type EmailPropType = {
  email: string;
};

const FormEmail = ({ email, id, token, getUser }: FormEmailPropType) => {
  const [editEmail, setEditEmail] = useState(false);
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ email }: EmailPropType) => {
    (async () => {
      try {
        const response = await request(
          `/api/profile-email/${id}`,
          "PATCH",
          { email },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);
        setEditEmail(false);
        getUser();
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormEmailTrStyled>
      <FormEmailTdStyled>Email:</FormEmailTdStyled>
      {!editEmail && <FormEmailTdStyled>{email}</FormEmailTdStyled>}
      {editEmail && (
        <FormEmailTdStyled>
          <Form
            name="Email"
            initialValues={{
              email,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError>
            <FormEmailDivStyled>
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
            </FormEmailDivStyled>
            <Form.Item>
              <Button htmlType="submit" disabled={loading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </FormEmailTdStyled>
      )}
      <FormEmailTdStyled>
        {!editEmail && (
          <Button onClick={() => setEditEmail(true)}>Change</Button>
        )}
        {editEmail && (
          <Button onClick={() => setEditEmail(false)}>Cancel</Button>
        )}
      </FormEmailTdStyled>
    </FormEmailTrStyled>
  );
};

export { FormEmail };
