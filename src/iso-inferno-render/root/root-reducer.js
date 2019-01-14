import {combineReducers} from 'redux';

export function noopReducer(state = {}, action) {
  return state;
}

export const rootReducer = combineReducers({
  base: noopReducer,
});
