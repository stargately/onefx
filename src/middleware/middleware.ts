import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import uuid from "uuid/v4";
import { isoReactRenderMiddleware } from "../iso-react-render/iso-react-render-middleware";
import { Server } from "../server";
import { Context, Middleware, Next } from "../types";
import { cookieSessionMiddleware } from "./cookie-session-middleware";
// @ts-ignore
import csp from "./csp/csp";
import { csrfMiddleware, isPrefixMatched } from "./csrf-middleware";
import { initI18nMiddleware } from "./i18n-middleware";
import { staticServe } from "./static-serve";
import { uncaughtErrorMiddleware } from "./uncaught-error-middleware";
import { viewBaseState } from "./view-base-state";

export function initMiddleware(server: Server): void {
  server.use(uncaughtErrorMiddleware(server));

  // Static file serving
  const staticDir =
    (server.config && server.config.server && server.config.server.staticDir) ||
    "dist";
  server.all("serve-static", "/*", staticServe(staticDir));

  server.use(bodyParser());
  server.use(cookieSessionMiddleware(server));

  server.use(csrfMiddleware(server));
  server.use(viewBaseState(server));
  initI18nMiddleware(server);
  server.use(isoReactRenderMiddleware(server));

  // security headers
  const { noSecurityHeadersRoutes } = server.config.server;
  // @ts-ignore
  server.use(
    htmlOnlyMiddleware({
      postFunc: async (ctx: Context, _: Next) => {
        if (isPrefixMatched(noSecurityHeadersRoutes, ctx.path)) {
          return;
        }
        await helmet()(ctx, () => Promise.resolve(null));
      }
    })
  );
  const cspConfig = server.config.csp;
  if (cspConfig) {
    server.use(
      htmlOnlyMiddleware({
        preFunc: async ctx => {
          ctx.state.nonce = uuid();
        },
        postFunc: async ctx => {
          if (isPrefixMatched(noSecurityHeadersRoutes, ctx.path)) {
            return;
          }
          await csp({
            policy: {
              ...cspConfig,
              "script-src": [
                ...cspConfig["script-src"],
                (ctx: Context) => {
                  return `'nonce-${ctx.state.nonce}'`;
                }
              ]
            }
          })(ctx, () => null);
        }
      })
    );
  }
}

function htmlOnlyMiddleware({
  preFunc = () => null,
  postFunc = () => null
}: {
  preFunc?: Middleware;
  postFunc?: Middleware;
}): Middleware {
  return async (ctx: Context, next: Next) => {
    await preFunc(ctx, next);
    await next();
    if (ctx.response.type === "text/html") {
      await postFunc(ctx, next);
    }
  };
}
