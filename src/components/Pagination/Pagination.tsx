import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { PaginationStyled } from "./Pagination.style";

import { setUrl } from "../../redux/actions";

import { MOVIES_NUMBER_ON_ONE_PAGE } from "../../consts";
import { RootState } from "../../redux/rootReducer";
import { uniqueKey } from "../../utils";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const PaginationForMovies = () => {
  const dispatch = useDispatch();
  const resultsMovies = useSelector(({ resultsMovies }: any) => resultsMovies);
  const urlReducer = useSelector(({ urlReducer }: RootState) => urlReducer);
  const loading = useSelector(
    ({ appReducer: { loading } }: RootState) => loading
  );
  const [numberOfPages, setNumberOfPages] = useState<any>(null);

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
    if (urlReducer.key in resultsMovies) {
      for (let key of Object.keys(resultsMovies)) {
        if (key === urlReducer.key) {
          const arrayMovies = resultsMovies[key];
          setNumberOfPages(arrayMovies.totalResults);
        }
      }
    }
  }, [resultsMovies]);

  const body = (
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
  );

  return (
    <>
      {loading && null}
      {!loading && body}
    </>
  );
};

export { PaginationForMovies };
