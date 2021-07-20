import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { setUrl } from "../../redux/actions";
import { RootState } from "../../redux/rootReducer";
import { uniqueKey } from "../../utils";

const UrlField = () => {
  const history = useHistory();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const urlReducer = useSelector(({ urlReducer }: RootState) => urlReducer);

  const getSearchValue = () => {
    const searchParams = new URLSearchParams(search);
    const input = searchParams.get("s")?.trim()!;
    const page = Number(searchParams.get("page")?.trim()!);
    const key = uniqueKey(input, page);

    const searchValue = {
      input: input || "",
      page: page || 1,
      key: key || "",
    };
    return searchValue;
  };

  interface IRequest {
    input: string;
    page: number;
    key: string;
  }

  const getUrl = (searchValue: IRequest) => {
    if (search) {
      dispatch(setUrl(searchValue));
    }
  };

  useEffect(() => {
    const searchValue = getSearchValue();
    getUrl(searchValue);
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