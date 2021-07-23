import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUrl } from "../../redux/actions";
import { MOVIES_NUMBER_ON_ONE_PAGE, PORTION_OF_PAGES } from "../../consts";
import { uniqueKey } from "../../utils";
import { Pagination } from "./Pagination";

const CustomPagination = () => {
  const dispatch = useDispatch();
  const resultsMovies = useSelector(
    ({ resultsMovies }: RootStateType) => resultsMovies
  );
  const urlReducer = useSelector(({ urlReducer }: RootStateType) => urlReducer);
  const loading = useSelector(
    ({ appReducer: { loading } }: RootStateType) => loading
  );
  const [numberOfPages, setNumberOfPages] = useState(0);

  const handleChange = (currentPage: number) => {
    dispatch(
      setUrl({
        input: urlReducer.input,
        page: currentPage,
        key: uniqueKey(urlReducer.input, currentPage),
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
      {!loading && urlReducer.input && resultsMovies && (
        <Pagination
          handleChange={handleChange}
          count={Math.ceil(numberOfPages / MOVIES_NUMBER_ON_ONE_PAGE)}
          currentPage={urlReducer.page}
          portionOfPages={PORTION_OF_PAGES}
        />
      )}
    </>
  );
};

export { CustomPagination };
