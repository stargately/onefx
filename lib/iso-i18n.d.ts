import { Context, Dict } from "./types";
declare type Translate = (msgKey: string, data?: Dict) => string;
export declare let t: Translate;
export declare function initServerI18n(ctx: Context): void;
export declare function initClientI18n(translations: Dict): void;
export {};
