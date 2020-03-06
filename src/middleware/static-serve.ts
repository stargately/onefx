import assert from "assert";
import send from "koa-send";
import { resolve } from "path";
import { Context, Middleware } from "../types";

type StaticOpts = {
  index?: boolean | string;
  hidden?: boolean;
  routePrefix?: string;
};

type Opts = StaticOpts & {
  root?: string;
};

export function staticServe(root: string, staticOpts?: StaticOpts): Middleware {
  const opts = (staticOpts || {}) as Opts;

  assert(root, "root directory is required to serve files");

  // options
  opts.root = resolve(root);
  if (opts.index !== false) {
    opts.index = opts.index || "index.html";
  }
  opts.hidden = true;

  return async (ctx: Context, next: Function): Promise<void> => {
    let done = false;

    if (ctx.method === "HEAD" || ctx.method === "GET") {
      try {
        let filePath = ctx.path;
        if (staticOpts && staticOpts.routePrefix) {
          filePath = ctx.path.replace(
            new RegExp(`^${staticOpts.routePrefix}`),
            ""
          );
        }
        done = Boolean(await send(ctx, filePath, opts));
      } catch (err) {
        if (err.status !== 404) {
          throw err;
        }
      }
    }

    if (!done) {
      await next();
    }
  };
}
