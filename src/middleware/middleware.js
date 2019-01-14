// @flow
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import config from 'config';
import uuid from 'uuid/v4';

import type {Server} from '../server';
import {isoReactRenderMiddleware} from '../iso-react-render/iso-react-render-middleware';
import csp from './csp/csp';
import {viewBaseState} from './view-base-state';
import {initI18nMiddleware} from './i18n-middleware';
import {staticServe} from './static-serve';
import {csrfMiddleware, isPrefixMatched} from './csrf-middleware';
import {cookieSessionMiddleware} from './cookie-session-middleware';
import {uncaughtErrorMiddleware} from './uncaught-error-middleware';

export function initMiddleware(server: Server) {
  server.use(uncaughtErrorMiddleware(server));

  // Static file serving
  const staticDir = server.config && server.config.server && server.config.server.staticDir || 'dist';
  server.all('serve-static', '/*', staticServe(staticDir));

  server.use(bodyParser());
  server.use(cookieSessionMiddleware(server));

  server.use(csrfMiddleware(server));
  server.use(viewBaseState(server));
  initI18nMiddleware(server);
  server.use(isoReactRenderMiddleware(server));

  // security headers
  const {noSecurityHeadersRoutes} = server.config.server;
  server.use(htmlOnlyMiddleware({
    postFunc: async ctx => {
      if (isPrefixMatched(noSecurityHeadersRoutes, ctx.path)) {
        return;
      }
      await helmet()(ctx, () => null);
    },
  }));
  const cspConfig = config.csp;
  if (cspConfig) {
    server.use(htmlOnlyMiddleware({
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
            'script-src': [
              ...cspConfig['script-src'],
              ctx => {
                return `'nonce-${ ctx.state.nonce }'`;
              },
            ],
          },
        })(ctx, () => null);
      }
    }));
  }
}

function htmlOnlyMiddleware({preFunc = () => null, postFunc = () => null}) {
  return async (ctx, next) => {
    await preFunc(ctx, next);
    await next();
    if (ctx.response.type === 'text/html') {
      await postFunc(ctx, next);
    }
  };
}
