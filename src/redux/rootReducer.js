import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
import { searchValuesReducer } from "./searchValuesReducer";
import { appReducer } from "./AppReducer";

export const rootReducer = combineReducers({
  searchValuesReducer,
  moviesReducer,
  appReducer,
});
