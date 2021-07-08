import { setSearchValue } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const PaginationForMovies = () => {
  const dispatch = useDispatch();
  const totalResults = useSelector((state) => state.moviesReducer.totalResults);
  const request = useSelector((state) => state.searchValuesReducer);

  const handleChange = (event, page) => {
    dispatch(setSearchValue({ inputValue: request.inputValue, page }));
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}>
      <ThemeProvider theme={darkTheme}>
        {totalResults && (
          <Pagination
            onChange={handleChange}
            count={Math.ceil(totalResults / 10)}
            page={request.page}
            color="primary"
            hideNextButton
            hidePrevButton
          />
        )}
      </ThemeProvider>
    </div>
  );
};

export default PaginationForMovies;
