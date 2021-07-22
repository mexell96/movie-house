import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { setUrl } from "../../redux/actions";
import { uniqueKey } from "../../utils";

const UrlField = () => {
  const history = useHistory();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const urlReducer = useSelector(({ urlReducer }: RootStateType) => urlReducer);

  const getSearchValue = () => {
    const searchParams = new URLSearchParams(search);
    const input = searchParams.get("s")?.trim()! || "";
    const page = Number(searchParams.get("page")?.trim()!) || 1;
    const key = uniqueKey(input, page) || "";

    return {
      input,
      page,
      key,
    };
  };

  const getUrl = (searchValue: SearchInfoType) =>
    search && dispatch(setUrl(searchValue));

  useEffect(() => {
    getUrl(getSearchValue());
  }, []);

  const changeRouter = (movie: string, page: number) => {
    history.push(`movies?s=${movie}&page=${page}`);
  };

  useEffect(() => {
    if (urlReducer.input && urlReducer.page) {
      changeRouter(urlReducer.input, urlReducer.page);
    }
  }, [urlReducer]);

  return null;
};

export { UrlField };
