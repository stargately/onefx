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
  request: koa.Request;
  state: State;
}
declare module "koa" {
  interface Request {
    body?: any;
    rawBody: string;
  }
}
export declare type ViewState = {
  base: {
    analytics: {};
    translations: Dict;
    manifest: Dict;
    routePrefix: string;
    cdnBase: string;
  } & Record<any, any>;
} & Record<any, any>;
export declare type State = {
  view: ViewState;
  nonce: string;
} & Record<any, any>;
export declare type Middleware = koa.Middleware<State, Context>;
export declare type Next = () => Promise<any>;
export declare type Dict = {
  [key: string]: string;
};
