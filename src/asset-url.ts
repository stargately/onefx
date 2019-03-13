import { Dict } from "./types";

let m: Dict;

export function initAssetURL(manifest: Dict = {}): void {
  m = manifest;
}

export function assetURL(filename: string): string {
  const manifestFile = m[filename];
  if (manifestFile) {
    return `/${manifestFile}`;
  }

  return filename;
}
