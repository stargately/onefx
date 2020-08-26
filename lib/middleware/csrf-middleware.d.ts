import { Server } from "../server";
import { Middleware } from "../types";
declare type Prefixes = {
  [prefix: string]: boolean;
};
export declare function csrfMiddleware(server: Server): Middleware;
export declare function isPrefixMatched(
  prefixes: Prefixes,
  target: string
): boolean;
export {};
