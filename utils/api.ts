import axios from "axios";

const BASE_URL = "https://lx-backend.onrender.com/";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.response.use(handleSuccess, handleError);

export function handleSuccess(response: { data: any }) {
  // Success
  return response.data;
}

export function handleError(error: {
  message: string;
  response: { status: any; data: { type: string }[] };
}) {
  if (error.message === "Network Error") {
    // The user doesn't have internet
    return Promise.reject(error);
  }
  switch (error.response.status) {
    case 400:
      // Check for access denied
      if (error.response && error.response.data && error.response.data.length) {
        if (
          error.response.data[0] &&
          error.response.data[0].type === "ACCESS_DENIED"
        ) {
          return Promise.reject(new Error("Access Denied"));
        }
      }
      break;
    case 401:
      // Go to login
      break;
    case 404:
      // Show 404 page
      break;
    case 500:
      // Server Error redirect to 500
      break;
    default:
      // Unknown Error
      break;
  }
  return Promise.reject(error);
}

export function signInAPI(payload: any) {
  return API.post(`login`, payload);
}

export function signupAPI(payload: any) {
  return API.post(`signup`, payload);
}

export function getProfile(payload: any) {
  return API.get(`profile`, payload);
}
