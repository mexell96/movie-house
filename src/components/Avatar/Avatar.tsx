import { AvatarErrorStyled, AvatarButtonStyled } from "./Avatar.styled";

const Avatar = ({ form }: FormikPropsType) => {
  const onFileChange = (input: any) => {
    const file = input.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        form.setFieldValue("avatar", reader.result as string);
      reader.onerror = () => console.log(reader.error, "error");
    }
  };

  return (
    <div>
      <AvatarButtonStyled
        variant="contained"
        component="label"
        success={form.values.avatar}>
        Upload avatar
        <input
          accept="image/*"
          id="avatar"
          name="avatar"
          type="file"
          hidden
          onChange={onFileChange}
        />
      </AvatarButtonStyled>
      {form?.touched?.avatar && (
        <AvatarErrorStyled>{form?.errors?.avatar}</AvatarErrorStyled>
      )}
    </div>
  );
};

export { Avatar };
