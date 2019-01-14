// @flow
let _manifest: Object;

export function initAssetURL(manifest: Object = {}): void {
  _manifest = manifest;
}

export function assetURL(filename: string): string {
  const manifestFile = _manifest[filename];
  if (manifestFile) {
    return `/${manifestFile}`;
  }

  return filename;
}
