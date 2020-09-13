import React from "react";
import { render } from "react-dom";
import { Reducer } from "redux";
import { initAssetURL } from "../asset-url";
import { initClientI18n } from "../iso-i18n";
import { configureStore } from "./root/configure-store";
import { RootBrowser } from "./root/root-browser";
import { noopReducer } from "./root/root-reducer";

const JSONGlobals = require("safe-json-globals/get");
const engine = require("styletron-engine-atomic");

const StyletronClient = engine.client;

export const STYLETRON_GLOBAL = "styletron-global";

type Opts = {
  reducer: Reducer;
  VDom: JSX.Element;
};

export function clientReactRender({ reducer = noopReducer, VDom }: Opts): void {
  const store = configureStore(JSONGlobals("state"), reducer);
  const {
    translations,
    manifest,
    routePrefix,
    cdnBase,
  } = store.getState().base;

  initClientI18n(translations);
  initAssetURL(manifest, routePrefix, cdnBase);
  const stylesheets = document.getElementsByClassName(STYLETRON_GLOBAL);
  const styletron = new StyletronClient({ hydrate: stylesheets, prefix: "_" });

  render(
    <RootBrowser store={store} styletron={styletron} routePrefix={routePrefix}>
      {VDom}
    </RootBrowser>,
    document.getElementById("root")
  );
}
