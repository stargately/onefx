import { combineReducers } from "redux";

export function noopReducer(state: object = {}, _: object): object {
  return state;
}

export const rootReducer = combineReducers({
  base: noopReducer,
});
