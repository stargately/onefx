import CSRF from "koa-csrf";
import { Server } from "../server";
import { Context, Middleware, Next } from "../types";

type Prefixes = { [prefix: string]: boolean };

export function csrfMiddleware(server: Server): Middleware {
  const csrf = new CSRF({
    invalidSessionSecretMessage: "Invalid session secret",
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: "Invalid CSRF token",
    invalidTokenStatusCode: 403,
    excludedMethods: ["GET", "HEAD", "OPTIONS"],
    disableQuery: false,
  });
  const noCsrfRoutes = server.config.server?.noCsrfRoutes;

  return async (ctx: Context, next: Next): Promise<void> => {
    if (isPrefixMatched(noCsrfRoutes, ctx.path)) {
      await next();
      return;
    }
    await csrf(ctx, next);
  };
}

export function isPrefixMatched(prefixes: Prefixes, target: string): boolean {
  for (const prefix of Object.keys(prefixes)) {
    if (String(target).startsWith(prefix) && prefixes[prefix]) {
      return true;
    }
  }
  return false;
}
