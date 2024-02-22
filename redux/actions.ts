import { UserAuthentication } from "../types/auth";
import {
  LOGOUT_FROM_ACCOUNT,
  SIGN_IN_ACCOUNT,
  SIGN_IN_ACCOUNT_SUCCESS,
  USER_AUTH_CHECK,
} from "./constants";

export const signinToAccount = (credential: UserAuthentication) => {
  return {
    type: SIGN_IN_ACCOUNT,
    credential,
  };
};

export const signinToAccountSuccess = (response: any) => {
  return {
    type: SIGN_IN_ACCOUNT_SUCCESS,
    response,
  };
};

export const signinToAccountError = (error: any) => {
  return {
    type: SIGN_IN_ACCOUNT_SUCCESS,
    error,
  };
};

export const logOutFromAccount = () => {
  return {
    type: LOGOUT_FROM_ACCOUNT,
  };
};

export const userAuthCheck = (token: any) => {
  return {
    type: USER_AUTH_CHECK,
    token,
  };
};
