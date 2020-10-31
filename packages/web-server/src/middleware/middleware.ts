import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import { v4 as uuidv4 } from "uuid";
import { isoReactRenderMiddleware } from "../iso-react-render/iso-react-render-middleware";
import { Server } from "../server";
import { Context, Middleware, Next } from "../types";
import { cookieSessionMiddleware } from "./cookie-session-middleware";
import { csrfMiddleware, isPrefixMatched } from "./csrf-middleware";
import { initI18nMiddleware } from "./i18n-middleware";
import { staticServe } from "./static-serve";
import { uncaughtErrorMiddleware } from "./uncaught-error-middleware";
import { viewBaseState } from "./view-base-state";

const csp = require("./csp/csp");

export function initMiddleware(server: Server): void {
  server.use(uncaughtErrorMiddleware(server));

  // Static file serving
  const staticDir =
    (server.config && server.config.server && server.config.server.staticDir) ||
    "dist";
  server.all(
    "serve-static",
    "/(.*)",
    staticServe(staticDir, {
      routePrefix: server.config.server.routePrefix,
    })
  );

  server.use(bodyParser());
  server.use(cookieSessionMiddleware(server));

  server.use(csrfMiddleware(server));
  server.use(viewBaseState(server));
  initI18nMiddleware(server);
  server.use(isoReactRenderMiddleware(server));

  // security headers
  const { noSecurityHeadersRoutes } = server.config.server;
  server.use(
    htmlOnlyMiddleware({
      postFunc: async (ctx: Context, _: Next) => {
        if (isPrefixMatched(noSecurityHeadersRoutes, ctx.path)) {
          return;
        }
        await helmet()(ctx, () => Promise.resolve(null));
      },
    })
  );
  const cspConfig = server.config.csp;
  if (cspConfig) {
    server.use(
      htmlOnlyMiddleware({
        preFunc: async (ctx) => {
          ctx.state.nonce = uuidv4();
        },
        postFunc: async (ctx) => {
          if (isPrefixMatched(noSecurityHeadersRoutes, ctx.path)) {
            return;
          }
          await csp({
            policy: {
              ...cspConfig,
              "script-src": [
                ...cspConfig["script-src"],
                (c: Context) => {
                  return `'nonce-${c.state.nonce}'`;
                },
              ],
            },
          })(ctx, () => null);
        },
      })
    );
  }
}

function htmlOnlyMiddleware({
  preFunc = () => null,
  postFunc = () => null,
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
