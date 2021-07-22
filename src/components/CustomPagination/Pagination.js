import { UlStyled, LIStyled, ButtonStyled } from "./Pagination.styled";

const Pagination = ({ onChange, count, page }) => {
  console.log(count, "count");
  console.log(page, "page");
  console.log(onChange, "onChange");

  let pages = [];

  for (let index = 1; index <= count; index++) {
    pages.push(index);
  }
  console.log(pages, "pages 222");

  return (
    <div>
      <UlStyled>
        {pages.map((page) => {
          return (
            <LIStyled>
              <ButtonStyled onClick={() => onChange({ page })}>
                {page}
              </ButtonStyled>
            </LIStyled>
          );
        })}
      </UlStyled>
    </div>
  );
};

export { Pagination };
