import isBrowser from "is-browser";
import { applyMiddleware, compose, createStore, Reducer, Store } from "redux";
import thunk from "redux-thunk";
import { State } from "../../types";
import { rootReducer } from "./root-reducer";

export function configureStore(
  initialState: { base: object },
  reducer: Reducer = rootReducer
): Store<State> {
  const middleware = [];
  if (isBrowser) {
    middleware.push(thunk);
  }

  const enhancers = [applyMiddleware(...middleware)];

  // @ts-ignore
  if (isBrowser && window && window.devToolsExtension) {
    // @ts-ignore
    enhancers.push(window.devToolsExtension());
  }

  return createStore(reducer, initialState, compose(...enhancers));
}
