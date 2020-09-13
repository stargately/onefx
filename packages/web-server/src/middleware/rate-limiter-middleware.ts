import crypto from "crypto";
// @ts-ignore
import { RateLimit } from "koa2-ratelimit";
import { Server } from "../server";
import { Context, Middleware } from "../types";

export type RateLimiterOpts = {
  name: string;
  generateKey(ctx: Context): string;
  interval: number; // ms
  max: number;
};

export function createRateLimiter(
  server: Server,
  opts: RateLimiterOpts
): Middleware {
  return RateLimit.middleware({
    interval: opts.interval,
    max: opts.max,
    async keyGenerator(ctx: Context): Promise<string> {
      const sha1 = crypto.createHash("sha1");
      sha1.update(opts.generateKey(ctx));
      const shorten = sha1.digest().toString("base64");
      const key = `${opts.name || "unnamed"}|${shorten}`;
      server.logger.debug(`ratelimit key ${key}`);
      return key;
    },
    async handler(ctx: Context): Promise<void> {
      ctx.status = 429;
      ctx.body = {
        ok: false,
        error: { code: "RATE_LIMIT", message: ctx.i18n.__("rate_limit") },
      };
    },
  });
}
