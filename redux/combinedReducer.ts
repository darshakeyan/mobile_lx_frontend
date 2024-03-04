import { combineReducers } from "redux";
import { authReducers } from "./Authreducer";
import { appReducers } from "./appReducer";

export default combineReducers({
  auth: authReducers,
  app: appReducers,
});
