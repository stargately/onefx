import dotty from "dottie";
import fs from "fs";
// @ts-ignore
import i18n from "koa-i18n";
// @ts-ignore
import locale from "koa-locale";
import { initServerI18n } from "../iso-i18n";
import { Server } from "../server";
import { Context, Next } from "../types";

function prioritize(supportedLocales: Array<string>, langCode: string): void {
  supportedLocales.sort((a: string, b: string) => {
    return a === langCode ? -1 : b === langCode ? 1 : 0;
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
  const supportedLocales = filenames.map(f =>
    f
      .split(".")
      .slice(0, -1)
      .join(".")
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
      parse(data: string): object {
        return require("js-yaml").safeLoad(data);
      },
      dump(data: string): object {
        return require("js-yaml").safeDump(data);
      }
    })
  );
  server.use(async (ctx: Context, next: Next) => {
    const locale = String(dotty.get(ctx, "request.query.locale"));
    if (locale && supportedLocales.indexOf(locale) !== -1) {
      ctx.cookies.set("locale", ctx.request.query.locale, {
        maxAge: 14 * 24 * 3600 * 1000
      });
      ctx.i18n.setLocale(locale);
    }
    initServerI18n(ctx);
    await next();
  });
}
