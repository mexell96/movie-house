import {
  WrapperStyled,
  UlStyled,
  LIStyled,
  ButtonStyled,
} from "./Pagination.styled";

type PaginationPropsType = {
  handleChange: any;
  count: number;
  currentPage: number;
  portionOfPages: number;
};

const Pagination = ({
  handleChange,
  count,
  currentPage,
  portionOfPages,
}: PaginationPropsType) => {
  const getPreviousPages = (currentPage: number, number: number) => {
    const previousArray = [];
    for (let item = --currentPage; item !== currentPage - number; item--) {
      if (item > 0) {
        previousArray.push(item);
      }
    }
    return previousArray.reverse();
  };

  const getNextPages = (currentPage: number, number: number) => {
    const nextArray = [];
    for (let item = ++currentPage; item !== currentPage + number; item++) {
      if (item <= count) {
        nextArray.push(item);
      }
    }

    return nextArray;
  };

  const previous = getPreviousPages(currentPage, portionOfPages);
  const next = getNextPages(currentPage, portionOfPages);

  return (
    <WrapperStyled>
      <UlStyled>
        <LIStyled>
          <ButtonStyled
            disabled={currentPage === 1}
            onClick={() => {
              handleChange(--currentPage);
            }}>
            &lt;
          </ButtonStyled>
        </LIStyled>
        {currentPage > ++portionOfPages && (
          <>
            <ButtonStyled
              onClick={() => handleChange(1)}
              selected={currentPage === 1}>
              1
            </ButtonStyled>
            <LIStyled>...</LIStyled>
          </>
        )}
        {previous.map((page) => {
          return (
            <LIStyled>
              <ButtonStyled
                onClick={() => handleChange(page)}
                selected={currentPage === page}>
                {page}
              </ButtonStyled>
            </LIStyled>
          );
        })}
        <LIStyled>
          <ButtonStyled onClick={() => handleChange(currentPage)} selected>
            {currentPage}
          </ButtonStyled>
        </LIStyled>
        {next.map((page) => {
          return (
            <LIStyled>
              <ButtonStyled
                onClick={() => handleChange(page)}
                selected={currentPage === page}>
                {page}
              </ButtonStyled>
            </LIStyled>
          );
        })}
        {currentPage <= count - portionOfPages && (
          <>
            <LIStyled>...</LIStyled>
            <LIStyled>
              <ButtonStyled
                onClick={() => handleChange(count)}
                selected={currentPage === count}>
                {count}
              </ButtonStyled>
            </LIStyled>
          </>
        )}
        <LIStyled>
          <ButtonStyled
            disabled={currentPage === count}
            onClick={() => {
              handleChange(++currentPage);
            }}>
            &gt;
          </ButtonStyled>
        </LIStyled>
      </UlStyled>
    </WrapperStyled>
  );
};

export { Pagination };
