// import action type from constant file - FETCH_MOVIES
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { signInAPI, signupAPI } from "../utils/api";
import {
  signinToAccountError,
  signinToAccountSuccess,
  signupToAccountError,
  signupToAccountSuccess,
} from "./actions";
import { SIGN_IN_ACCOUNT, SIGN_UP_ACCOUNT } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

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

function* signupToAccount(action: any): Generator {
  try {
    let response: any = yield call(signupAPI, action.userDetail);
    yield put(signupToAccountSuccess(response));
    ToastAndroid.show(response.message, ToastAndroid.SHORT);
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    yield put(signupToAccountError(errorMessage));
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  }
}

function* listenForSignInToAccount() {
  yield takeLatest(SIGN_IN_ACCOUNT, signinToAccount);
}

function* listenForSignUpToAccount() {
  yield takeLatest(SIGN_UP_ACCOUNT, signupToAccount);
}

function* mySaga() {
  yield all([listenForSignInToAccount(), listenForSignUpToAccount()]);
}

export default mySaga;
