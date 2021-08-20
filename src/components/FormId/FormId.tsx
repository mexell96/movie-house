import { FormIdTrStyled, FormIdTdStyled } from "./FormId.style";

type FormIdPropType = {
  id: string;
};

const FormId = ({ id }: FormIdPropType): JSX.Element => (
  <FormIdTrStyled>
    <FormIdTdStyled>ID:</FormIdTdStyled>
    <FormIdTdStyled>{id}</FormIdTdStyled>
  </FormIdTrStyled>
);

export { FormId };
