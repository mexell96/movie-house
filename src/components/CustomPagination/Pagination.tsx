import {
  PaginationWrapperStyled,
  PaginationUlStyled,
  PaginationLIStyled,
  PaginationButtonStyled,
} from "./Pagination.styled";

type PaginationPropsType = {
  handleChange: (currentPage: number) => void;
  count: number;
  currentPage: number;
  portionOfPages: number;
};

const Pagination = ({
  handleChange,
  count,
  currentPage,
  portionOfPages,
}: PaginationPropsType): JSX.Element => {
  const getPreviousPages = (currentPage: number, number: number): number[] => {
    const previousArray = [];
    for (let item = --currentPage; item !== currentPage - number; item--) {
      if (item > 0) {
        previousArray.push(item);
      }
    }
    return previousArray.reverse();
  };

  const getNextPages = (currentPage: number, number: number): number[] => {
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
    <PaginationWrapperStyled>
      <PaginationUlStyled>
        <PaginationLIStyled>
          <PaginationButtonStyled
            disabled={currentPage === 1}
            onClick={() => {
              handleChange(--currentPage);
            }}>
            &lt;
          </PaginationButtonStyled>
        </PaginationLIStyled>
        {currentPage > ++portionOfPages && (
          <>
            <PaginationButtonStyled
              onClick={() => handleChange(1)}
              selected={currentPage === 1}>
              1
            </PaginationButtonStyled>
            <PaginationLIStyled>...</PaginationLIStyled>
          </>
        )}
        {previous.map((page) => (
          <PaginationLIStyled key={page}>
            <PaginationButtonStyled
              onClick={() => handleChange(page)}
              selected={currentPage === page}>
              {page}
            </PaginationButtonStyled>
          </PaginationLIStyled>
        ))}
        <PaginationLIStyled>
          <PaginationButtonStyled
            onClick={() => handleChange(currentPage)}
            selected>
            {currentPage}
          </PaginationButtonStyled>
        </PaginationLIStyled>
        {next.map((page) => (
          <PaginationLIStyled key={page}>
            <PaginationButtonStyled
              onClick={() => handleChange(page)}
              selected={currentPage === page}>
              {page}
            </PaginationButtonStyled>
          </PaginationLIStyled>
        ))}
        {currentPage <= count - portionOfPages && (
          <>
            <PaginationLIStyled>...</PaginationLIStyled>
            <PaginationLIStyled>
              <PaginationButtonStyled
                onClick={() => handleChange(count)}
                selected={currentPage === count}>
                {count}
              </PaginationButtonStyled>
            </PaginationLIStyled>
          </>
        )}
        <PaginationLIStyled>
          <PaginationButtonStyled
            disabled={currentPage === count}
            onClick={() => {
              handleChange(++currentPage);
            }}>
            &gt;
          </PaginationButtonStyled>
        </PaginationLIStyled>
      </PaginationUlStyled>
    </PaginationWrapperStyled>
  );
};

export { Pagination };
