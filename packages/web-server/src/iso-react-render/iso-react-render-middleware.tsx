import React from "react";
import { renderToString } from "react-dom/server";
import { Server as StyletronServer } from "styletron-engine-atomic";
import { initAssetURL } from "../asset-url";
import { initClientI18n } from "../iso-i18n";
import { Server } from "../server";
import { Context, Middleware } from "../types";
import { configureStore } from "./root/configure-store";
import { rootHtml } from "./root/root-html";
import { RootServer } from "./root/root-server";

const JsonGlobals = require("safe-json-globals");

export function isoReactRenderMiddleware(server: Server): Middleware {
  return async (ctx: Context, next: () => void) => {
    ctx.isoReactRender = ({ VDom, reducer, clientScript }): string => {
      const state = ctx.getState() as {
        base: {
          manifest: {
            [key: string]: string;
          };
          routePrefix: string;
        };
      };
      const jsonGlobals = JsonGlobals({ state });
      const routePrefix = server.config.server.routePrefix || "";
      const cdnBase = server.config.server.cdnBase || "";
      initAssetURL(state.base.manifest, routePrefix, cdnBase);
      const store = configureStore(state, reducer);
      const styletron = new StyletronServer({ prefix: "_" });

      const context = {
        url: undefined,
        statusCode: undefined,
        status: undefined,
      };
      initClientI18n(ctx.state.view.base.translations);
      const reactMarkup = renderToString(
        <RootServer
          store={store}
          location={ctx.url}
          context={context}
          styletron={styletron}
          routePrefix={routePrefix}
        >
          {VDom}
        </RootServer>
      );

      // This will contain the URL to redirect to if <Redirect> was used
      if (context.url) {
        // @ts-ignore
        return ctx.redirect(context.url);
      }
      if (context.statusCode) {
        // @ts-ignore
        ctx.status = context.statusCode;
      } else if (context.status) {
        // @ts-ignore
        ctx.status = context.status;
      }

      return rootHtml({ styletron, jsonGlobals, reactMarkup, clientScript });
    };
    await next();
  };
}
