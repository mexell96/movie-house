import { useState, useEffect } from "react";
import { Form, Button, message, Select } from "antd";

import { FormThemeTrStyled, FormThemeTdStyled } from "./FormTheme.style";

import { useHttp } from "../../hooks";

type FormThemePropType = {
  theme: string;
  id: string;
  token: string;
  auth: () => Promise<void>;
};

type ThemePropType = {
  theme: string;
};

const FormSelect = ({
  theme,
  id,
  token,
  auth,
}: FormThemePropType): JSX.Element => {
  const [editTheme, setEditTheme] = useState(false);
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const onFinish = ({ theme }: ThemePropType): void => {
    (async () => {
      try {
        const response = await request(
          `/api/profile-theme/${id}`,
          "PATCH",
          { theme },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);
        setEditTheme(false);
        await auth();
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const onFinishFailed = (errorInfo: any): any => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormThemeTrStyled>
      <FormThemeTdStyled>Theme:</FormThemeTdStyled>
      {!editTheme && <FormThemeTdStyled>{theme}</FormThemeTdStyled>}
      {editTheme && (
        <FormThemeTdStyled>
          <Form
            name="Theme"
            initialValues={{
              theme,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError>
            <Form.Item
              name="theme"
              noStyle
              rules={[{ required: true, message: "Theme is required" }]}>
              <Select value={theme} style={{ width: 120 }}>
                <Select.Option value="light">light</Select.Option>
                <Select.Option value="dark">dark</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" disabled={loading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </FormThemeTdStyled>
      )}
      <FormThemeTdStyled>
        {!editTheme && (
          <Button onClick={() => setEditTheme(true)}>Change</Button>
        )}
        {editTheme && (
          <Button onClick={() => setEditTheme(false)}>Cancel</Button>
        )}
      </FormThemeTdStyled>
    </FormThemeTrStyled>
  );
};

export { FormSelect };
