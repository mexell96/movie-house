import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";

import {
  FormNameTrStyled,
  FormNameTdStyled,
  FormNameDivStyled,
} from "./FormName.style";

import { useHttp } from "../../hooks/http.hook";

type FormNamePropType = {
  name: string;
  id: string;
  token: string;
  getUser: () => Promise<void>;
};

type NamePropType = {
  name: string;
};

const FormName = ({
  name,
  id,
  token,
  getUser,
}: FormNamePropType): JSX.Element => {
  const [editName, setEditName] = useState(false);
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ name }: NamePropType) => {
    (async () => {
      try {
        const response = await request(
          `/api/profile-name/${id}`,
          "PATCH",
          { name },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);
        setEditName(false);
        await getUser();
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormNameTrStyled>
      <FormNameTdStyled>Name:</FormNameTdStyled>
      {!editName && <FormNameTdStyled>{name}</FormNameTdStyled>}
      {editName && (
        <FormNameTdStyled>
          <Form
            name="Name"
            initialValues={{
              name,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError>
            <FormNameDivStyled>
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
            </FormNameDivStyled>
            <Form.Item>
              <Button htmlType="submit" disabled={loading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </FormNameTdStyled>
      )}
      <FormNameTdStyled>
        {!editName && <Button onClick={() => setEditName(true)}>Change</Button>}
        {editName && <Button onClick={() => setEditName(false)}>Cancel</Button>}
      </FormNameTdStyled>
    </FormNameTrStyled>
  );
};

export { FormName };
