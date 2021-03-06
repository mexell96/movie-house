import { combineReducers } from "redux";

import { resultsMovies } from "./resultsMovies";
import { previousSearches } from "./previousSearches";
import { appReducer } from "./appReducer";
import { urlReducer } from "./urlReducer";
import { resultsMovie } from "./resultsMovie";
import { tabsReducer } from "./tabsReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  appReducer,
  previousSearches,
  resultsMovies,
  urlReducer,
  resultsMovie,
  tabsReducer,
  userReducer,
});
