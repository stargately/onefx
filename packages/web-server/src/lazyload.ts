// @ts-ignore
import loadScript from "load-script";

let loaded = false;

export function lazyLoad(script: string, cb: () => void): void {
  if (loaded) {
    cb();
    return;
  }

  loadScript(script, () => {
    loaded = true;
    cb();
  });
}
