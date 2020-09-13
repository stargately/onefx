import { Server } from "../server";
import { Context, Middleware } from "../types";

export function uncaughtErrorMiddleware(server: Server): Middleware {
  return async (ctx: Context, next: Function) => {
    try {
      await next();
    } catch (err) {
      if (ctx.message) {
        throw err;
      }
      ctx.status = err.status || 500;
      ctx.body = "internal server error";
      server.logger.error(`internal server error: ${err.stack}`);
    }
  };
}
