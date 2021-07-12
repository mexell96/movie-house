import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { setUrl } from "../../redux/actions";

const UrlField = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const urlReducer = useSelector((state) => state.urlReducer);

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

  const changeRouter = (movie, page) => {
    history.push(`movies?s=${movie}&page=${page}`);
  };

  useEffect(() => {
    if (urlReducer.input && urlReducer.page) {
      changeRouter(urlReducer.input, urlReducer.page);
    }
  }, [urlReducer]);

  return false;
};

export { UrlField };
