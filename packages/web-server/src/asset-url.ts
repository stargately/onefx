import { Dict } from "./types";

let m: Dict = {};
let urlBase = "";

export function initAssetURL(
  manifest: Dict = {},
  routePrefix = "",
  cdnBase = ""
): void {
  m = manifest || {};
  const segments = [];
  if (cdnBase) {
    let bs = cdnBase;
    if (bs.endsWith("/")) {
      bs = bs.substring(0, bs.length - 1);
    }
    segments.push(bs);
  } else {
    segments.push("");
  }
  if (routePrefix) {
    segments.push(...routePrefix.split("/").filter((s) => s));
  }
  urlBase = segments.join("/");
}

export function assetURL(filename: string): string {
  const manifestFile = m[filename];
  if (manifestFile) {
    return `${urlBase || ""}/${manifestFile}`;
  }

  return `${urlBase || ""}/${filename}`;
}
