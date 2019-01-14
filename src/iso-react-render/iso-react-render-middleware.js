// @flow
import JsonGlobals from 'safe-json-globals';
import {Server as StyletronServer} from 'styletron-engine-atomic';
import {renderToString} from 'react-dom/server';

import type {Server} from '../server';
import {initAssetURL} from '../asset-url';
import {configureStore} from './root/configure-store';
import {rootHtml} from './root/root-html';
import {RootServer} from './root/root-server';

export function isoReactRenderMiddleware(server: Server): any {
  return async(ctx, next) => {
    ctx.isoReactRender = ({VDom, reducer, clientScript}) => {
      const state = ctx.getState();
      const jsonGlobals = JsonGlobals({state});
      initAssetURL(state.base.manifest);
      const store = configureStore(state, reducer);
      const styletron = new StyletronServer({prefix: '_'});

      const context = {};
      const reactMarkup = renderToString(
        <RootServer store={store} location={ctx.url} context={context} styletron={styletron}>
          {VDom}
        </RootServer>
      );

      // This will contain the URL to redirect to if <Redirect> was used
      if (context.url) {
        return ctx.redirect(context.url);
      }
      if (context.status) {
        ctx.status = context.status;
      }

      return rootHtml({styletron, jsonGlobals, reactMarkup, clientScript, nonce: ctx.state.nonce});
    };
    await next();
  };
}
