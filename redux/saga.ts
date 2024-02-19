// import action type from constant file - FETCH_MOVIES
import { put, takeEvery } from "redux-saga/effects";

function* fetchMovies(action: any) {
  try {
    // call async API

    // get the data

    // we need to put the data in reducer
    yield put({ type: "Here_we_need_to_put_data", data: "xyc" });
  } catch (error) {
    // Handle Failer
  }
}

function* mySaga() {
  yield takeEvery(/* Name of the action */ "Define_action", fetchMovies);
}

export default mySaga;
