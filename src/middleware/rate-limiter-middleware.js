// @flow
import crypto from 'crypto';
import {RateLimit} from 'koa2-ratelimit';

export type RateLimiterOpts = {
  name: string,
  generateKey: (ctx: any) => string,
  interval: any,
  max: any,
};

export function createRateLimiter(server: any, opts: RateLimiterOpts) {
  return RateLimit.middleware({
    interval: opts.interval,
    max: opts.max,
    async keyGenerator(ctx) {
      const sha1 = crypto.createHash('sha1');
      sha1.update(opts.generateKey(ctx));
      const shorten = sha1.digest().toString('base64');
      const key = `${opts.limiterName || 'unnamed'}|${shorten}`;
      server.logger.debug(`ratelimit key ${key}`);
      return key;
    },
    async handler(ctx) {
      ctx.status = 429;
      ctx.body = {ok: false, error: {code: 'RATE_LIMIT', message: ctx.i18n.__('rate_limit')}};
    },
  });
}
