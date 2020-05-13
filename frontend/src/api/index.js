require("es6-promise").polyfill();
require("isomorphic-fetch");

export const makeRequest = (url, token, method = "GET", body) => {
  let defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (token) {
    defaultHeaders["Authorization"] = `token ${token}`;
  }
  let options = {
    method: method,
    headers: defaultHeaders
  };
  if (method !== "GET") {
    options["body"] = JSON.stringify(body);
  }
  return fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => Object.assign({}, data, { success: true }))
    .catch((error) => Object.assign({}, error, { success: false }));
};
