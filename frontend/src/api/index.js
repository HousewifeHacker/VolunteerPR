require("es6-promise").polyfill();
require("isomorphic-fetch");

export const getRequest = (url, token) => {
  let defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (token) {
    defaultHeaders["Authorization"] = `token ${token}`;
  }
  return fetch(url, {
    method: "GET",
    headers: defaultHeaders
  })
    .then((resp) => resp.json())
    .then((data) => Object.assign({}, data, { success: true }))
    .catch((error) => Object.assign({}, error, { success: false }));
};
