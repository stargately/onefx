export function uncaughtErrorMiddleware(server) {
  return async(ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (ctx.message) {
        throw err;
      }
      ctx.status = err.status || 500;
      ctx.body = 'internal server error';
      server.logger.error(`internal server error: ${err.stack}`);
    }
  };
}
