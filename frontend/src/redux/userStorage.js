import cookies from "cookies.js";
import { validateToken } from "./actions/user";

export const getUser = () => {
  const serializedState = getSessionValue("volunteer_PR_user");
  if (serializedState === null) {
    return undefined;
  }
  let userData = JSON.parse(serializedState);
  if (validateToken(userData.token)) {
    return { user: userData };
  } else {
    removeSessionValue("volunteer_PR_user");
    return {};
  }
};

export const setUser = data => {
  const serializedState = JSON.stringify(data);
  setSessionValue("volunteer_PR_user", serializedState);
};

const checkIfSessionStorageIsAvailable = () => {
  let hasSessionStorage = false;

  try {
    if ("sessionStorage" in window && window.sessionStorage !== null) {
      window.sessionStorage.setItem("__sessionStorageTest__", "1");
      window.sessionStorage.removeItem("__sessionStorageTest__");
    }
    hasSessionStorage = true;
  } catch (e) {
    hasSessionStorage = false;
  }

  return hasSessionStorage;
};
export const sessionStorageIsAvailable = checkIfSessionStorageIsAvailable();

export const getSessionValue = key => {
  let value;

  if (sessionStorageIsAvailable) {
    value = window.sessionStorage.getItem(key);
  } else {
    value = cookies.get(`sessionStorage.${key}`);
  }

  if (value === undefined) {
    return null;
  }

  return value;
};

export const removeSessionValue = key => {
  if (sessionStorageIsAvailable) {
    return window.sessionStorage.removeItem(key);
  } else {
    return cookies.remove(`sessionStorage.${key}`);
  }
};

export const setSessionValue = (key, value) => {
  const keyType = typeof key;
  if (keyType !== "string") {
    throw new Error(`${key} must be a string but was ${keyType}`);
  }

  if (sessionStorageIsAvailable) {
    return window.sessionStorage.setItem(key, value);
  } else {
    return cookies.set(`sessionStorage.${key}`, value);
  }
};
