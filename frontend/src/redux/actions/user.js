import * as api from "../../api/auth";

export const SIGN_IN_ATTEMPT = "SIGN_IN_ATTEMPT";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export const SIGN_UP_ATTEMPT = "SIGN_UP_ATTEMPT";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SIGN_OUT = "SIGN_OUT";

export const signInAttempt = (email, password) => (dispatch, getState) => {
  dispatch({
    type: SIGN_IN_ATTEMPT,
    email: email
  });
  return api.logIn(email, password).then(result => {
    if (result.success) {
      dispatch(signInSuccess(result.data.auth_token, email));
    } else {
      dispatch(signInFailure(["Invalid credentials"]));
    }

    return result;
  });
};

export const signInFailure = errors => dispatch => {
  dispatch({
    type: SIGN_IN_FAILURE,
    errors: errors
  });
};

export const signInSuccess = (token, email) => dispatch => {
  dispatch({
    type: SIGN_IN_SUCCESS,
    token: token,
    email: email
  });

  return Promise.resolve();
};

export const signUpAttempt = (email, password, re_password) => dispatch => {
  dispatch({
    type: SIGN_UP_ATTEMPT,
    email: email
  });
  return api.signUp(email, password, re_password).then(result => {
    if (result.success) {
      dispatch(signUpSuccess());
    } else {
      let errors = result.errors.filter(errors => !!errors);
      dispatch(signUpFailure(errors));
    }

    return result;
  });
};

export const signUpSuccess = () => dispatch => {
  dispatch({
    type: SIGN_UP_SUCCESS
  });
};

export const signUpFailure = errors => dispatch => {
  dispatch({
    type: SIGN_UP_FAILURE,
    errors: errors
  });
};

export const validateToken = token => dispatch => {
  // could show a logged out message or auth error message
  return api.verifyToken(token).then(result => {
    if (result.success) {
      dispatch({
        type: SIGN_IN_SUCCESS,
        token: token,
        email: result.email
      });
    } else {
      dispatch({
        type: SIGN_OUT
      });
    }
    return result.success;
  });
};

export const signOut = token => dispatch => {
  // TODO redirect
  api.logOut(token);
  dispatch({
    type: SIGN_OUT
  });
};
