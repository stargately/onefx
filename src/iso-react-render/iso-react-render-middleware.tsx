import React from "react";
import { renderToString } from "react-dom/server";
// @ts-ignore
import JsonGlobals from "safe-json-globals";
// @ts-ignore
import { Server as StyletronServer } from "styletron-engine-atomic";
import { initAssetURL } from "../asset-url";
import { initClientI18n } from "../iso-i18n";
import { Server } from "../server";
import { Context, Middleware } from "../types";
import { configureStore } from "./root/configure-store";
import { rootHtml } from "./root/root-html";
import { RootServer } from "./root/root-server";

export function isoReactRenderMiddleware(_: Server): Middleware {
  return async (ctx: Context, next: Function) => {
    ctx.isoReactRender = ({ VDom, reducer, clientScript }): string => {
      const state = ctx.getState() as {
        base: {
          manifest: {
            [key: string]: string;
          };
        };
      };
      const jsonGlobals = JsonGlobals({ state });
      initAssetURL(state.base.manifest);
      const store = configureStore(state, reducer);
      const styletron = new StyletronServer({ prefix: "_" });

      const context = {
        url: undefined,
        statusCode: undefined,
        status: undefined
      };
      initClientI18n(ctx.state.view.base.translations);
      const reactMarkup = renderToString(
        <RootServer
          store={store}
          location={ctx.url}
          context={context}
          styletron={styletron}
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
