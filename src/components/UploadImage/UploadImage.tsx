import { useState } from "react";

import {
  UploadImageErrorStyled,
  UploadImageButtonStyled,
  UploadImageAvatarStyled,
} from "./UploadImage.styled";

import { MEGABYTE, noPicture } from "../../consts";

type UploadImagePropsType = {
  value: string;
  onChange: (field: string, value: string) => void;
  errors: string | undefined;
  touched: boolean | undefined;
};

const UploadImage = ({
  onChange,
  value,
  errors,
  touched,
}: UploadImagePropsType) => {
  const [sizeError, setSizeError] = useState(false);

  const onFileChange = (input: any) => {
    const file = input.target.files[0];
    if (file && file.size < MEGABYTE) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => onChange("avatar", reader.result as string);
      reader.onerror = () => console.log(reader.error, "error");
    } else {
      setSizeError(true);
    }
  };

  return (
    <div>
      <UploadImageButtonStyled component="label">
        <UploadImageAvatarStyled src={value || noPicture} alt="avatar" />
        <input
          accept="image/*"
          id="avatar"
          name="avatar"
          type="file"
          hidden
          onChange={onFileChange}
        />
      </UploadImageButtonStyled>
      {touched && errors && (
        <UploadImageErrorStyled>{errors}</UploadImageErrorStyled>
      )}
      {sizeError && (
        <UploadImageErrorStyled>
          Large file size choose another one
        </UploadImageErrorStyled>
      )}
    </div>
  );
};

export { UploadImage };
