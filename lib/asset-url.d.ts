import { Dict } from "./types";
export declare function initAssetURL(
  manifest?: Dict,
  routePrefix?: string,
  cdnBase?: string
): void;
export declare function assetURL(filename: string): string;
