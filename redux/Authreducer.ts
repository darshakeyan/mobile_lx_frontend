// action will tell you what you want to do with data

// E.X -> action - Remove the item from an Cart
// -> reducer - will remove it (logical thinker) on data
// store - Updated data done by reducer

import { produce } from "immer";

import {
  LOGOUT_FROM_ACCOUNT,
  SIGN_IN_ACCOUNT,
  SIGN_IN_ACCOUNT_ERROR,
  SIGN_IN_ACCOUNT_SUCCESS,
  SIGN_UP_ACCOUNT,
  SIGN_UP_ACCOUNT_ERROR,
  SIGN_UP_ACCOUNT_SUCCESS,
  USER_AUTH_CHECK,
} from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const initialState: any = {
  isLoading: false,
  userToken: null,
  userTokenError: null,
  isSignUpLoading: false,
  isUserExist: false,
};

export const authReducers = (state = initialState, action: any) =>
  produce(state, (draftState: any) => {
    switch (action.type) {
      case SIGN_IN_ACCOUNT:
        draftState.isLoading = true;
        break;
      case SIGN_IN_ACCOUNT_SUCCESS:
        if (action.response) {
          draftState.userToken = JSON.stringify(action.response.token);
        } else {
          draftState.userTokenError = action.error;
        }
        draftState.isLoading = false;
        break;
      case SIGN_IN_ACCOUNT_ERROR:
        draftState.isLoading = false;
        break;
      case LOGOUT_FROM_ACCOUNT:
        draftState.isLoading = false;
        draftState.userToken = null;
        AsyncStorage.removeItem("token");
        draftState.userTokenError = null;
        break;
      case USER_AUTH_CHECK:
        draftState.userToken = action.token;
        break;
      case SIGN_UP_ACCOUNT:
        draftState.isSignUpLoading = true;
        break;
      case SIGN_UP_ACCOUNT_SUCCESS:
        draftState.isSignUpLoading = false;
        draftState.isUserExist = false;
        draftState.signupResponse = action.response.message;
        break;
      case SIGN_UP_ACCOUNT_ERROR:
        draftState.isUserExist = true;
        draftState.isSignUpLoading = false;
        break;
    }
  });

// now the data which get in saga will do something here to store in state....

// now it must be accessable through useSelector hook
