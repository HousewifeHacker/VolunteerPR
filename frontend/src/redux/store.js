import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers/index";
import { setUser, getUser } from "./userStorage";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const configureStore = (initialState, extras) => {
  let userData = getUser();
  const store = createStore(
    reducers,
    { ...initialState, ...userData },
    composeEnhancers(applyMiddleware(thunk.withExtraArgument({ ...extras })))
  );
  store.subscribe(() => {
    setUser(store.getState().user);
  });
  return store;
};

export default configureStore;
