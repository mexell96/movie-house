import { Button } from "@material-ui/core";

import { AvatarErrorStyled } from "./Avatar.styled";

const Avatar = ({ form }: FormikPropsType) => {
  const onFileChange = (input: any) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => form.setFieldValue("avatar", reader.result as string);
    reader.onerror = () => console.log(reader.error, "error");
  };

  return (
    <div>
      <Button variant="contained" component="label">
        Upload avatar
        <input
          accept="image/*"
          id="avatar"
          name="avatar"
          type="file"
          hidden
          onChange={onFileChange}
        />
      </Button>
      {form?.touched?.avatar && (
        <AvatarErrorStyled>{form?.errors?.avatar}</AvatarErrorStyled>
      )}
    </div>
  );
};

export { Avatar };
