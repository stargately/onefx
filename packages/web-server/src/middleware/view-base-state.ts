import deepExtend from "deep-extend";
import dotty from "dottie";
import { Context } from "koa";

import { Server } from "../server";
import { Middleware, Next } from "../types";

export function viewBaseState(server: Server): Middleware {
  return async (ctx: Context, next: Next) => {
    ctx.state.view = {
      base: {
        analytics: server.config.analytics || {},
        csrfToken: ctx.csrf,
        routePrefix: server.config.server.routePrefix,
        cdnBase: server.config.server.cdnBase,
      },
    };

    ctx.deepExtendState = (newState: object): void => {
      ctx.state.view = deepExtend({}, ctx.state.view, newState);
    };

    ctx.setState = (path: string, val: object): void => {
      dotty.set(ctx.state.view, path, val);
    };

    ctx.getState = (path: string): void => {
      if (path) {
        return dotty.get(ctx.state.view, path);
      }
      return ctx.state.view;
    };

    return next();
  };
}
