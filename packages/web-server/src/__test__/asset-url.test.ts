import test from "ava";
import { assetURL, initAssetURL } from "../asset-url";

test("no manifest, routePrefix, no cdnBase", (t) => {
  initAssetURL({}, "/foo/bar");
  t.deepEqual(assetURL("do.png"), "/foo/bar/do.png");
});

test("routePrefix, cdnBase", (t) => {
  initAssetURL({ "main.js": "main-123.js" }, "/v2", "https://onefx.js.org/");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/v2/main-123.js");

  initAssetURL({ "main.js": "main-123.js" }, "/v2", "https://onefx.js.org");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/v2/main-123.js");

  initAssetURL({ "main.js": "main-123.js" }, "v2", "https://onefx.js.org/");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/v2/main-123.js");

  initAssetURL({ "main.js": "main-123.js" }, "v2", "https://onefx.js.org");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/v2/main-123.js");

  initAssetURL({ "main.js": "main-123.js" }, "v2/", "https://onefx.js.org/");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/v2/main-123.js");

  initAssetURL({ "main.js": "main-123.js" }, "v2/", "https://onefx.js.org");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/v2/main-123.js");

  initAssetURL({ "main.js": "main-123.js" }, "/v2/", "https://onefx.js.org/");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/v2/main-123.js");

  initAssetURL({ "main.js": "main-123.js" }, "/v2/", "https://onefx.js.org");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/v2/main-123.js");
});

test("no routePrefix, cdnBase", (t) => {
  initAssetURL({ "main.js": "main-123.js" }, "", "https://onefx.js.org/");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/main-123.js");

  initAssetURL({ "main.js": "main-123.js" }, "", "https://onefx.js.org");
  t.deepEqual(assetURL("main.js"), "https://onefx.js.org/main-123.js");
});

test("no routePrefix, no cdnBase", (t) => {
  initAssetURL({ "main.js": "main-123.js" });
  t.deepEqual(assetURL("main.js"), "/main-123.js");
});

test("no manifest, no routePrefix, no cdnBase", (t) => {
  initAssetURL({});
  t.deepEqual(assetURL("do.png"), "/do.png");
});
