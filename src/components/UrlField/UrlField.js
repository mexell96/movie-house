import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { setUrl } from "../../redux/actions";

const UrlField = () => {
  const history = useHistory();
  const previousSearch = useSelector(
    (state) => state.previousSearches[state.previousSearches.length - 1]
  );
  const previousSearches = useSelector((state) => state.previousSearches);
  const dispatch = useDispatch();
  const location = useLocation();

  const getSearchValue = () => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = {
      input: searchParams.get("s") || "",
      page: searchParams.get("page") || 1,
    };
    return searchValue;
  };

  const getUrl = (searchValue) => {
    if (location.search) {
      dispatch(setUrl(searchValue));
    }
  };

  useEffect(() => {
    const searchValue = getSearchValue();
    getUrl(searchValue);
  }, []);

  const changeRouter = (movie, page = 1) => {
    history.push(`movies?s=${movie}&page=${page}`);
  };

  useEffect(() => {
    if (previousSearch.input && previousSearch.page) {
      changeRouter(previousSearch.input, previousSearch.page);
    }
  }, [previousSearches]);

  return false;
};

export { UrlField };
