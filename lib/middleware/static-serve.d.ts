import send from "koa-send";
import { Middleware } from "../types";
declare type Opts = send.SendOptions & {
  routePrefix?: string;
};
export declare function staticServe(
  root: string,
  staticOpts?: Opts
): Middleware;
export {};
