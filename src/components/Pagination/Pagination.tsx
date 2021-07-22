import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { PaginationStyled } from "./Pagination.style";

import { setUrl } from "../../redux/actions";
import { MOVIES_NUMBER_ON_ONE_PAGE } from "../../consts";
import { uniqueKey } from "../../utils";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const PaginationForMovies = () => {
  const dispatch = useDispatch();
  const resultsMovies = useSelector(
    ({ resultsMovies }: RootStateType) => resultsMovies
  );
  const urlReducer = useSelector(({ urlReducer }: RootStateType) => urlReducer);
  const loading = useSelector(
    ({ appReducer: { loading } }: RootStateType) => loading
  );
  const [numberOfPages, setNumberOfPages] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    dispatch(
      setUrl({
        input: urlReducer.input,
        page: page,
        key: uniqueKey(urlReducer.input, page),
      })
    );
    window.scroll(0, 0);
  };

  useEffect(() => {
    if (resultsMovies[urlReducer.key]) {
      setNumberOfPages(Number(resultsMovies[urlReducer.key].totalResults));
    }
  }, [resultsMovies, urlReducer]);

  return (
    <>
      {loading && null}
      {!loading && (
        <PaginationStyled>
          <ThemeProvider theme={darkTheme}>
            {resultsMovies && (
              <Pagination
                onChange={handleChange}
                count={Math.ceil(numberOfPages / MOVIES_NUMBER_ON_ONE_PAGE)}
                page={urlReducer.page}
                color="primary"
                hideNextButton
                hidePrevButton
              />
            )}
          </ThemeProvider>
        </PaginationStyled>
      )}
    </>
  );
};

export { PaginationForMovies };
