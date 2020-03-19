import test from "ava";
import { assetURL, initAssetURL } from "../asset-url";

test("init asset url and get asset url", t => {
  initAssetURL({}, "/foo/bar");
  t.deepEqual(assetURL("do.png"), "/foo/bar/do.png");
});
