import { Server } from "../server";
import { Context, Middleware } from "../types";
export declare type RateLimiterOpts = {
  name: string;
  generateKey(ctx: Context): string;
  interval: number;
  max: number;
};
export declare function createRateLimiter(
  server: Server,
  opts: RateLimiterOpts
): Middleware;
