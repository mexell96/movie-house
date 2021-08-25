import { useState, useEffect } from "react";
import { Button, message } from "antd";

import {
  FormImageButtonStyled,
  FormImageErrorStyled,
  FormImageAvatarStyled,
  FormImageWrapperStyled,
} from "./FormImage.style";

import { MEGABYTE } from "../../consts";
import { useHttp } from "../../hooks";

type FormImagePropType = {
  avatar: string;
  id: string;
  token: string;
  auth: () => Promise<void>;
};

const FormImage = ({
  avatar,
  id,
  token,
  auth,
}: FormImagePropType): JSX.Element => {
  const [sizeError, setSizeError] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const { loading, error, request, clearError } = useHttp();
  const [newAvatar, setNewAvatar] = useState("");

  const onFileChange = (input: any): void => {
    const file = input.target.files[0];
    if (file && file.size < MEGABYTE) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setEditAvatar(true);
        setSizeError(false);
        setNewAvatar(reader.result as string);
      };
      reader.onerror = () => console.log(reader.error, "error");
    } else {
      setSizeError(true);
    }
  };

  useEffect(() => {
    if (error !== null) {
      message.error(`${error}`);
      clearError();
    }
  }, [error, clearError]);

  const changeAvatar = (newAvatar: any): void => {
    (async () => {
      try {
        const response = await request(
          `/api/profile-avatar/${id}`,
          "PATCH",
          { avatar: newAvatar },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);
        setEditAvatar(false);
        await auth();
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const cancel = (): void => {
    setNewAvatar("");
    setEditAvatar(false);
  };

  return (
    <FormImageWrapperStyled>
      <FormImageButtonStyled component="label">
        <FormImageAvatarStyled src={newAvatar || avatar} alt="avatar" />
        <input
          accept="image/*"
          id="avatar"
          name="avatar"
          type="file"
          hidden
          onChange={onFileChange}
        />
      </FormImageButtonStyled>
      {sizeError && (
        <FormImageErrorStyled>
          Large file size choose another one
        </FormImageErrorStyled>
      )}
      {editAvatar && (
        <Button
          style={{ width: "100px" }}
          onClick={() => changeAvatar(newAvatar)}
          disabled={loading}>
          Save
        </Button>
      )}
      {editAvatar && (
        <Button style={{ width: "100px" }} onClick={() => cancel()}>
          Cancel
        </Button>
      )}
    </FormImageWrapperStyled>
  );
};

export { FormImage };
