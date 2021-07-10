import { useSelector, useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import "./Pagination.css";

import { setSearchValue } from "../../redux/actions";

import { MOVIES_NUMBER_ON_ONE_PAGE } from "../../consts";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const PaginationForMovies = () => {
  const dispatch = useDispatch();
  const totalResults = useSelector((state) => state.moviesReducer.totalResults);
  const request = useSelector((state) => state.searchValuesReducer);
  const loading = useSelector((state) => state.appReducer.loading);

  const handleChange = (event, page) => {
    dispatch(setSearchValue({ inputValue: request.inputValue, page }));
    window.scroll(0, 0);
  };

  if (!loading) {
    return (
      <div className="pagination">
        <ThemeProvider theme={darkTheme}>
          {totalResults && (
            <Pagination
              onChange={handleChange}
              count={Math.ceil(totalResults / MOVIES_NUMBER_ON_ONE_PAGE)}
              page={request.page}
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
