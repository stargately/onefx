import { Dict } from "./types";

let m: Dict = {};
let prefix: string = "";

export function initAssetURL(manifest: Dict = {}, routePrefix: string): void {
  m = manifest || {};
  prefix = routePrefix;
}

export function assetURL(filename: string): string {
  const manifestFile = m[filename];
  if (manifestFile) {
    return `${prefix}/${manifestFile}`;
  }

  return `${prefix}/filename`;
}
