import { Context, Dict } from "./types";

const baseLang = "en";

type Translate = (msgKey: string, data?: Dict) => string;

export let t: Translate = (msgKey: string, _?: Dict) => msgKey;

function getStr(translations: Dict, msgKey: string, data?: Dict): string {
  let unformatedMsg = translations[msgKey] || msgKey;
  if (unformatedMsg === "null") {
    unformatedMsg = "";
  }
  return formatString(unformatedMsg, data);
}

export function initServerI18n(ctx: Context): void {
  const locale = ctx.i18n.getLocale();
  const translations = ctx.i18n.locales[locale];
  const baseTranslations = ctx.i18n.locales[baseLang];
  Object.keys(baseTranslations).forEach(key => {
    translations[key] = translations[key] || baseTranslations[key];
  });
  ctx.setState("base.translations", translations);
  ctx.setState("base.locale", locale);

  t = (msgKey, data) => getStr(translations, msgKey, data);

  ctx.t = t;
}

export function initClientI18n(translations: Dict): void {
  t = (msgKey: string, data?: Dict) => getStr(translations, msgKey, data);
}

function formatString(str: string, data?: Dict): string {
  if (!data) {
    return str;
  }

  let processed = str;
  Object.keys(data).forEach(key => {
    processed = processed.replace(`\${${key}}`, data[key]);
  });

  return processed;
}
