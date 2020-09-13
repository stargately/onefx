import fs from "fs";
import { initServerI18n } from "../iso-i18n";
import { Server } from "../server";
import { Context, Next } from "../types";

const i18n = require("koa-i18n");
const locale = require("koa-locale");
const jsYaml = require("js-yaml");

function prioritize(supportedLocales: Array<string>, langCode: string): void {
  supportedLocales.sort((a: string, b: string) => {
    if (a === langCode) {
      return -1;
    }
    return b === langCode ? 1 : 0;
  });
}

export function initI18nMiddleware(server: Server): void {
  locale(server.app);
  let directory = "./translations";

  const preferredDir = `./${server.config.project}-translations`;
  // tslint:disable-next-line
  if (fs.existsSync(preferredDir)) {
    directory = preferredDir;
  }

  // tslint:disable-next-line:non-literal-fs-path
  const filenames = fs.readdirSync(directory) || [];
  const supportedLocales = filenames.map((f) =>
    f.split(".").slice(0, -1).join(".")
  );
  prioritize(supportedLocales, "en");

  server.logger.info(
    `load translations [${supportedLocales}] from ${directory}`
  );

  server.use(
    i18n(server.app, {
      directory,
      locales: supportedLocales,
      modes: ["cookie", "query", "header"],
      extension: ".yaml",
      parse(data: string): Record<string, unknown> {
        return jsYaml.safeLoad(data);
      },
      dump(data: string): Record<string, unknown> {
        return jsYaml.safeDump(data);
      },
    })
  );
  server.use(async (ctx: Context, next: Next) => {
    const l = ctx.request?.query?.locale;
    if (l && supportedLocales.indexOf(l) !== -1) {
      ctx.cookies.set("locale", ctx.request.query.locale, {
        maxAge: 14 * 24 * 3600 * 1000,
      });
      ctx.i18n.setLocale(l);
    }
    initServerI18n(ctx);
    await next();
  });
}
