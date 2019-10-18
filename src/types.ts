/* tslint:disable */
import koa from "koa";
import { Reducer } from "redux";

export interface Context extends koa.Context {
  deepExtendState(newState: object): void;

  setState(path: string, val: any): void;

  getState(path?: string): object;

  isoReactRender(opts: {
    VDom: JSX.Element;
    reducer: Reducer;
    clientScript: string;
  }): string;

  state: State;
}

export type ViewState = {
  base: {
    analytics: {};
    translations: Dict;
    manifest: Dict;
  };
} & Record<any, any>;

export type State = {
  view: ViewState;
  nonce: string;
} & Record<any, any>;

export type Middleware = koa.Middleware<State, Context>;
// tslint:disable-next-line
export type Next = () => Promise<any>;
export type Dict = {
  [key: string]: string;
};
