import { combineReducers } from "redux";

export function noopReducer(
  state: Record<string, unknown> = {},
  _: Record<string, unknown>
): Record<string, unknown> {
  return state;
}

export const rootReducer = combineReducers({
  base: noopReducer,
});
