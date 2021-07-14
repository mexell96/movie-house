import React from "react";
import ReactDOM from "react-dom";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { GlobalStyles } from "./GlobalStyles";

import { AppRouter } from "./AppRouter";

import { rootReducer } from "./redux/rootReducer";

const middleware = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

const store = createStore(rootReducer, compose(...middleware));

const app = (
  <Provider store={store}>
    <GlobalStyles />
    <AppRouter />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);
