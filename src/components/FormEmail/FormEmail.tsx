import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";

import {
  FormEmailTrStyled,
  FormEmailTdStyled,
  FormEmailDivStyled,
} from "./FormEmail.style";

import useHttp from "../../hooks/http";
import { changeEmail } from "../../api/user";

type FormEmailPropType = {
  email: string;
  id: string;
  token: string;
};

type EmailPropType = {
  email: string;
};

const FormEmail = ({ email, id, token }: FormEmailPropType): JSX.Element => {
  const [editEmail, setEditEmail] = useState(false);
  const { loading, error, clearError } = useHttp();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ email }: EmailPropType): void => {
    (async () => {
      try {
        const response = await changeEmail(id, email);
        message.success(response.message);
        setEditEmail(false);
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const onFinishFailed = (errorInfo: any): void => {
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
