import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUrl } from "../../redux/actions";
import { MOVIES_NUMBER_ON_ONE_PAGE } from "../../consts";
import { uniqueKey } from "../../utils";
import { Pagination } from "./Pagination";

const CustomPagination = () => {
  const dispatch = useDispatch();
  const resultsMovies = useSelector(({ resultsMovies }) => resultsMovies);
  const urlReducer = useSelector(({ urlReducer }) => urlReducer);
  const loading = useSelector(({ appReducer: { loading } }) => loading);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const handleChange = ({ event, page }) => {
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
      {!loading && resultsMovies && (
        <Pagination
          onChange={handleChange}
          count={Math.ceil(numberOfPages / MOVIES_NUMBER_ON_ONE_PAGE)}
          page={urlReducer.page}
        />
      )}
    </>
  );
};

export { CustomPagination };
