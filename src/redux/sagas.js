// import { getMovies } from "./../apiFunctions";
// import { showLoader, hideLoader } from "./actions";
// import { takeEvery, put, call } from "redux-saga/effects";
// import { FETCH_MOVIES } from "./types";

// function* sagaWorker(action) {
//   try {
//     console.log(action, "787678");
//     yield put(showLoader());
//     const data = yield call(fetchMovies, action.payload);
//     console.log(data, "data 989898");
//     yield put({ type: FETCH_MOVIES, payload: data });
//     yield put(hideLoader());
//   } catch (err) {
//     console.log(err, "Error");
//     yield put(hideLoader());
//   }
// }

// export function* sagaWatcher() {
//   yield takeEvery(FETCH_MOVIES, sagaWorker);
// }

// async function fetchMovies(props) {
//   console.log(props, "props 777");
//   const data = await getMovies(input, page);
//   return data;
// }
