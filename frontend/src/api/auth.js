require("es6-promise").polyfill();
require("isomorphic-fetch");

// TODO password and username resets
// TODO change djoser setting to send emails

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const logIn = (email, password) => {
  const promise = fetch("/auth/token/login/", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  return promise.then((result) => {
    return result.json().then((data) => {
      const newResult = {
        success: result.ok,
        ...result,
        data: data
      };
      return newResult;
    });
  });
};

export const signUp = (email, password, re_password) => {
  const promise = fetch("/auth/users/", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      email: email,
      password: password,
      re_password: re_password
    })
  });

  return promise.then((result) => {
    return result.json().then((data) => {
      if (result.ok) {
        return {
          success: result.ok,
          ...data
        };
      } else {
        const { email, password, re_password, non_field, ...rest } = data;
        return {
          success: result.ok,
          ...result,
          data: rest,
          errors: [].concat(email, password, re_password, non_field)
        };
      }
    });
  });
};

export const verifyToken = (token) => {
  // TODO probably not working as intended
  // use users/me. If token is invalid, returns 400
  const promise = fetch("/auth/users/me/", {
    method: "GET",
    headers: {
      ...defaultHeaders,
      Authorization: `Token ${token}`
    }
  });

  return promise.then((result) => {
    return {
      success: result.ok,
      email: result.email
    };
  });
};

export const logOut = (token) => {
  // returns HTTP_204_NO_CONTENT
  fetch("/auth/token/logout/", {
    method: "POST",
    headers: {
      ...defaultHeaders,
      Authorization: `Token ${token}`
    }
  });
};
