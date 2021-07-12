import { combineReducers } from "redux";
import { resultsMovies } from "./resultsMovies";
import { previousSearches } from "./previousSearches";
import { appReducer } from "./AppReducer";
import { urlReducer } from "./urlReducer";
import { resultMovie } from "./resultMovie";

export const rootReducer = combineReducers({
  previousSearches,
  resultsMovies,
  appReducer,
  urlReducer,
  resultMovie,
});
