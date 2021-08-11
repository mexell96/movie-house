import { FormIdTrStyled, FormIdTdStyled } from "./FormId.style";

type FormIdPropType = {
  id: string;
};

const FormId = ({ id }: FormIdPropType) => {
  return (
    <FormIdTrStyled>
      <FormIdTdStyled>ID:</FormIdTdStyled>
      <FormIdTdStyled>{id}</FormIdTdStyled>
    </FormIdTrStyled>
  );
};

export { FormId };
