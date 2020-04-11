import {
  SIGN_IN_ATTEMPT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_ATTEMPT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT
} from "../actions/user";

const initialState = {
  email: null,
  token: null,
  hasFetched: false,
  isFetching: false,
  signUpErrors: [],
  signInErrors: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_ATTEMPT:
      return Object.assign({}, state, initialState, {
        email: action.email,
        isFetching: true
      });
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        email: action.email,
        token: action.token,
        isFetching: false,
        hasFetched: true,
        hasActivationWarning: false
      });
    case SIGN_IN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        hasFetched: true,
        signInErrors: action.errors
      });
    case SIGN_UP_ATTEMPT:
      return Object.assign({}, state, initialState, {
        email: action.email,
        isFetching: true
      });
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        hasFetched: true,
        hasActivationWarning: true
      });
    case SIGN_UP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        hasFetched: true,
        signUpErrors: action.errors
      });
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
