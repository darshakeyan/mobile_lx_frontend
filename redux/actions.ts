import { UserAuthentication, UserDetailAuthentication } from "../types/auth";
import {
  LOGOUT_FROM_ACCOUNT,
  SET_MOVIE_ID_FROM_VIEW_PORT,
  SET_SORTBY_VALUE,
  SIGN_IN_ACCOUNT,
  SIGN_IN_ACCOUNT_SUCCESS,
  SIGN_UP_ACCOUNT,
  SIGN_UP_ACCOUNT_ERROR,
  SIGN_UP_ACCOUNT_SUCCESS,
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

export const signupToAccount = (userDetail: UserDetailAuthentication) => {
  return {
    type: SIGN_UP_ACCOUNT,
    userDetail,
  };
};

export const signupToAccountSuccess = (response: any) => {
  return {
    type: SIGN_UP_ACCOUNT_SUCCESS,
    response,
  };
};

export const signupToAccountError = (error: any) => {
  return {
    type: SIGN_UP_ACCOUNT_ERROR,
    error,
  };
};

export const setMovieIdFromViewport = (movieId: string) => {
  return {
    type: SET_MOVIE_ID_FROM_VIEW_PORT,
    movieId,
  };
};

export const setSortByValue = (value: string) => {
  return {
    type: SET_SORTBY_VALUE,
    value,
  };
};
