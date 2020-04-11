import { combineReducers } from "redux";

import { SIGN_OUT } from "../actions/user";
import userReducer from "./user";

const appReducer = combineReducers({
  user: userReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    //Re-initialize state if we are signing out.
    return Object.assign({}, appReducer({}, {}));
  } else {
    return appReducer(state, action);
  }
};
export default rootReducer;
