import { Dict } from "./types";

let m: Dict = {};
let prefix: string = "";
let cdnBaseUrl: string = "";

export function initAssetURL(
  manifest: Dict = {},
  routePrefix: string = "",
  cdnBase: string = ""
): void {
  m = manifest || {};
  if (routePrefix) {
    prefix = routePrefix.endsWith("/") ? routePrefix : `${routePrefix}/`;
  }
  if (cdnBase) {
    cdnBaseUrl = cdnBase.endsWith("/") ? cdnBase : `${cdnBase}/`;
  }
}

export function assetURL(filename: string): string {
  const manifestFile = m[filename];
  if (cdnBaseUrl) {
    if (manifestFile) {
      return `${cdnBaseUrl || ""}${prefix || ""}${manifestFile}`;
    }

    return `${cdnBaseUrl || ""}${prefix || ""}${filename}`;
  }

  if (manifestFile) {
    return `${prefix || ""}${manifestFile}`;
  }

  return `${prefix || ""}${filename}`;
}
