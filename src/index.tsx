import React from "react";
import ReactDOM from "react-dom";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { GlobalStyles } from "./GlobalStyles";

import { AppRouter } from "./AppRouter";

import { rootReducer } from "./redux/rootReducer";
// import { sagaWatcher } from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

const middleware = [
  applyMiddleware(thunk, sagaMiddleware),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

const store = createStore(rootReducer, compose(...middleware));

// sagaMiddleware.run(sagaWatcher);

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
