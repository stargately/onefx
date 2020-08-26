import { Reducer, Store } from "redux";
import { ViewState } from "../../types";
export declare function configureStore(
  initialState: {
    base: object;
  },
  reducer?: Reducer
): Store<ViewState>;
