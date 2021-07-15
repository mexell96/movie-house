import { combineReducers } from "redux";
import { resultsMovies } from "./resultsMovies";
import { previousSearches } from "./previousSearches";
import { appReducer } from "./appReducer";
import { urlReducer } from "./urlReducer";
import { resultMovie } from "./resultMovie";
import { tabsReducer } from "./tabsReducer";

export const rootReducer = combineReducers({
  previousSearches,
  resultsMovies,
  appReducer,
  urlReducer,
  resultMovie,
  tabsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
