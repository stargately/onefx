import { Context, Dict } from "./types";

export let t = (msgKey: string, _: Dict) => {
  return msgKey;
};

function getStr(localTranslations: Dict, msgKey: string, data: Dict, enTranslations: Dict): string {
  let unformatedMsg = localTranslations[msgKey];
  if(unformatedMsg == undefined || unformatedMsg == null){
    if(enTranslations){
      unformatedMsg = enTranslations[msgKey];
    } else {
      unformatedMsg = msgKey;
    }
  }
  if (unformatedMsg === "null") {
    unformatedMsg = "";
  }
  return formatString(unformatedMsg, data);
}

export function initServerI18n(ctx: Context): void {
  const locale = ctx.i18n.getLocale();
  const translations = ctx.i18n.locales[locale];
  const translationsdefault = ctx.i18n.locales['en'];

  const totalTranslations = {
    'local': translations,
    'en': translationsdefault
  }
  ctx.setState("base.translations", totalTranslations);
  ctx.setState("base.locale", locale);

  t = (msgKey, data) => getStr(translations, msgKey, data, translationsdefault);

  ctx.t = t;
}

export function initClientI18n(translations: Dict): void {
  t = (msgKey: string, data: Dict) => getStr(translations.local, msgKey, data, translations.en);
}

function formatString(str: string, data: Dict): string {
  if (!data) {
    return str;
  }

  let processed = str;
  Object.keys(data).forEach(key => {
    processed = str.replace(`\${${key}}`, data[key]);
  });

  return processed;
}
