import { combineReducers } from "redux";
import { authReducers } from "./Authreducer";

export default combineReducers({
  auth: authReducers,
});
