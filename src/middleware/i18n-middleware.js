import fs from 'fs';
import dotty from 'dotty';
import i18n from 'koa-i18n';
import locale from 'koa-locale';
import {initServerI18n} from '../iso-i18n';

export function initI18nMiddleware(server) {
  locale(server.app);
  let directory = './translations';

  const preferredDir = `./${server.config.project}-translations`;
  if (fs.existsSync(preferredDir)) {
    directory = preferredDir;
  }

  const filenames = fs.readdirSync(directory) || [];
  const supportedLocales = filenames.map(f => f.split('.').slice(0, -1).join('.'));

  server.logger.info(`load translations [${supportedLocales}] from ${directory}`);

  server.use(i18n(server.app, {
    directory,
    locales: supportedLocales,
    modes: [
      'cookie',
      'query',
      'header',
    ],
    extension: '.yaml',
    parse(data) {
      return require('js-yaml').safeLoad(data);
    },
    dump(data) {
      return require('js-yaml').safeDump(data);
    },
  }));
  server.use(async(ctx, next) => {
    const locale = String(dotty.get(ctx, 'request.query.locale')).toLowerCase();
    if (locale && supportedLocales.indexOf(locale) !== -1) {
      ctx.cookies.set(
        'locale',
        ctx.request.query.locale.toLowerCase(),
        {
          maxAge: 14 * 24 * 3600 * 1000,
        },
      );
      ctx.i18n.setLocale(locale);
    }
    initServerI18n(ctx);
    await next();
  });
}
