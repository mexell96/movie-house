import { FormImageStyled } from "./FormImage.style";

import { noPicture } from "../../consts";

type FormImagePropType = {
  avatar: string;
};

const FormImage = ({ avatar }: FormImagePropType) => {
  return <FormImageStyled src={avatar || noPicture} alt="avatar" />;
};

export { FormImage };
