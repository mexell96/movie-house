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
  const moviesFromState = useSelector((state) => state.resultsMovies);
  const urlReducer = useSelector((state) => state.urlReducer);
  const loading = useSelector((state) => state.appReducer.loading);
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
    if (urlReducer.key in moviesFromState) {
      for (let key of Object.keys(moviesFromState)) {
        if (key === urlReducer.key) {
          const arrayMovies = moviesFromState[key];
          setNumberOfPages(arrayMovies.totalResults);
        }
      }
    }
  }, [moviesFromState]);

  if (!loading) {
    return (
      <div className="pagination">
        <ThemeProvider theme={darkTheme}>
          {moviesFromState && (
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
  }
  if (loading) {
    return null;
  }
};

export { PaginationForMovies };
