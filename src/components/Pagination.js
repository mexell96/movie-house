import { setSearchValue } from "./../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const PaginationForMovies = () => {
  const dispatch = useDispatch();
  const totalResults = useSelector((state) => state.moviesReducer.totalResults);
  const inputValue = useSelector(
    (state) => state.searchValuesReducer.inputValue
  );
  const page = useSelector((state) => state.searchValuesReducer.page);
  
  const handleChange = (event, page) => {
    dispatch(setSearchValue({ inputValue, page }));
  };

  return (
    <div>
      <Pagination
        count={Math.ceil(totalResults / 10)}
        page={+page}
        onChange={handleChange}
        color="primary"
      />
    </div>
  );
};

export default PaginationForMovies;
