import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { setSearchValue } from "../redux/actions";

function URL() {
  const history = useHistory();
  const request = useSelector((state) => state.searchValuesReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  const getUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = {
      inputValue: searchParams.get("s"),
      page: searchParams.get("page"),
    };
    if (location.search) {
      dispatch(setSearchValue(searchValue));
    }
  };

  useEffect(() => {
    getUrl();
  }, []);

  const changeRouter = (movie, page = 1) => {
    history.push(`movies?s=${movie}&page=${page}`);
  };

  useEffect(() => {
    if (request.inputValue) {
      changeRouter(request.inputValue, request.page);
    }
  }, [request.inputValue, request.page]);

  return false;
}

export default URL;
