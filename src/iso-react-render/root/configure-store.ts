import isBrowser from "is-browser";
import { applyMiddleware, compose, createStore, Reducer, Store } from "redux";
import thunk from "redux-thunk";
import { ViewState } from "../../types";
import { rootReducer } from "./root-reducer";

export function configureStore(
  initialState: { base: object },
  reducer: Reducer = rootReducer
): Store<ViewState> {
  const middleware = [];
  if (isBrowser) {
    middleware.push(thunk);
  }

  const enhancers = [applyMiddleware(...middleware)];

  // @ts-ignore
  if (isBrowser && window && window.__REDUX_DEVTOOLS_EXTENSION__) {
    // @ts-ignore
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(reducer, initialState, compose(...enhancers));
}
