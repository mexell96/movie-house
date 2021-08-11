import { useState, useEffect } from "react";
import { Button, message } from "antd";

import {
  FormImageButtonStyled,
  FormImageErrorStyled,
  FormImageAvatarStyled,
} from "./FormImage.style";

import { noPicture, MEGABYTE } from "../../consts";
import { useHttp } from "../../hooks/http.hook";

type FormImagePropType = {
  avatar: string;
  id: string;
  token: string;
  getUser: () => Promise<void>;
};

const FormImage = ({ avatar, id, token, getUser }: FormImagePropType) => {
  const [sizeError, setSizeError] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [logo, setLogo] = useState("");
  const { loading, error, request, clearError } = useHttp();

  const onFileChange = (input: any) => {
    const file = input.target.files[0];
    if (file && file.size < MEGABYTE) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("avatar", reader.result as string);
        setEditAvatar(true);
        setLogo(reader.result as string);
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

  const changeAvatar = ({ logo }: any) => {
    (async () => {
      try {
        const response = await request(
          `/api/profile-name/${id}`,
          "PATCH",
          { logo },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);
        setEditAvatar(false);
        getUser();
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  return (
    <div>
      <FormImageButtonStyled component="label">
        <FormImageAvatarStyled src={logo || noPicture} alt="avatar" />
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
        <Button onClick={() => changeAvatar(logo)} disabled={loading}>
          Save
        </Button>
      )}
      {editAvatar && (
        <Button onClick={() => setEditAvatar(false)}>Cancel</Button>
      )}
    </div>
  );
};

export { FormImage };
