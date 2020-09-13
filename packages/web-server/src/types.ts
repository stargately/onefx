/* tslint:disable */
import koa from "koa";
import { Reducer } from "redux";

export interface Context extends koa.Context {
  deepExtendState(newState: Record<string, unknown>): void;

  setState(path: string, val: any): void;

  getState(path?: string): Record<string, unknown>;

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

export type ViewState = {
  base: {
    analytics: Record<string, any>;
    translations: Dict;
    manifest: Dict;
    routePrefix: string;
    cdnBase: string;
  } & Record<any, any>;
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
