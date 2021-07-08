import { setSearchValue } from "./../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const PaginationForMovies = () => {
  const dispatch = useDispatch();
  const totalResults = useSelector((state) => state.moviesReducer.totalResults);
  const request = useSelector((state) => state.searchValuesReducer);

  const handleChange = (event, page) => {
    dispatch(setSearchValue({ inputValue: request.inputValue, page }));
  };

  return (
    <div>
      {totalResults && (
        <Pagination
          count={Math.ceil(totalResults / 10)}
          page={request.page}
          onChange={handleChange}
          color="primary"
        />
      )}
    </div>
  );
};

export default PaginationForMovies;
