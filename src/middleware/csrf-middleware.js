import CSRF from 'koa-csrf';
import dotty from 'dotty';

export function csrfMiddleware(server) {
  const csrf = new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    disableQuery: false,
  });
  const noCsrfRoutes = dotty.get(server, 'config.server.noCsrfRoutes') || {};

  return async (ctx, next) => {
    if (isPrefixMatched(noCsrfRoutes, ctx.path)) {
      return await next();
    }
    await csrf(ctx, next);
  };
}

export function isPrefixMatched(prefixes, target) {
  for (const prefix in prefixes) {
    if (prefixes.hasOwnProperty(prefix)
      && String(target).startsWith(prefix)
      && prefixes[prefix]
    ) {
      return true;
    }
  }
  return false;
}
