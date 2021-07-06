import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
import { searchValuesReducer } from "./searchValuesReducer";

export const rootReducer = combineReducers({
  searchValuesReducer,
  moviesReducer,
});
