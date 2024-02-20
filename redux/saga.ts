// import action type from constant file - FETCH_MOVIES
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { signInAPI } from "../utils/api";
import { signinToAccountError, signinToAccountSuccess } from "./actions";
import { SIGN_IN_ACCOUNT } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

function* signinToAccount(action: any): Generator {
  try {
    let authResponse: any = yield call(signInAPI, action.credential);
    yield put(signinToAccountSuccess(authResponse));
    AsyncStorage.setItem("token", authResponse.token);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.message;
      yield put(signinToAccountError(errorMessage));
    } else {
      yield put(
        signinToAccountError("An error occurred. Please try again later.")
      );
    }
  }
}

function* listenForSignInToAccount() {
  yield takeLatest(SIGN_IN_ACCOUNT, signinToAccount);
}

function* mySaga() {
  yield all([listenForSignInToAccount()]);
}

export default mySaga;
