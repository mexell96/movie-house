import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { setUrl } from "../../redux/actions";
import { RootState } from "../../redux/rootReducer";
import { IRequest } from "../../redux/interface";

const UrlField = () => {
  const history = useHistory();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const urlReducer = useSelector(({ urlReducer }: RootState) => urlReducer);

  const getSearchValue = () => {
    const searchParams = new URLSearchParams(search);
    const input = searchParams.get("s")!;
    const page = searchParams.get("page")!;
    const searchValue = {
      input: input || "",
      page: +page || 1,
    };
    return searchValue;
  };

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
