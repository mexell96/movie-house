import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import "./Pagination.css";

import { setUrl } from "../../redux/actions";

import { MOVIES_NUMBER_ON_ONE_PAGE } from "../../consts";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const PaginationForMovies = () => {
  const dispatch = useDispatch();
  const resultsMovies = useSelector(({resultsMovies}) => resultsMovies);
  const urlReducer = useSelector(({urlReducer}) => urlReducer);
  const loading = useSelector(({appReducer: {loading}}) => loading);
  const [numberOfPages, setNumberOfPages] = useState(null);

  const handleChange = (event, page) => {
    dispatch(
      setUrl({
        input: urlReducer.input,
        page: page,
        key: urlReducer.key,
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
    <div className="pagination">
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
    </div>
  );

  return (
    <>
      {loading && null}
      {!loading && body}
    </>
  );
};

export { PaginationForMovies };
