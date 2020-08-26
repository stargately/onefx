import { Reducer } from "redux";
export declare const STYLETRON_GLOBAL = "styletron-global";
declare type Opts = {
  reducer: Reducer;
  VDom: JSX.Element;
};
export declare function clientReactRender({ reducer, VDom }: Opts): void;
export {};
