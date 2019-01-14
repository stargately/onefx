/* eslint-disable func-style */
export let t = function dummy(key) {
  return key;
};

function getStr(translations, msgKey, data) {
  let unformatedMsg = translations[msgKey] || msgKey;
  if (unformatedMsg === 'null') {
    unformatedMsg = null;
  }
  return formatString(unformatedMsg, data);
}

export function initServerI18n(ctx) {
  const locale = ctx.i18n.getLocale();
  const translations = ctx.i18n.locales[locale];
  ctx.setState('base.translations', translations);
  ctx.setState('base.locale', locale);

  t = (msgKey, data) => getStr(translations, msgKey, data);

  ctx.t = t;
}

export function initClientI18n(translations) {
  t = (msgKey, data) => getStr(translations, msgKey, data);
}

function formatString(str, data) {
  if (!data) {
    return str;
  }

  Object.keys(data).forEach(key => {
    str = str.replace(`\${${key}}`, data[key]);
  });

  return str;
}
