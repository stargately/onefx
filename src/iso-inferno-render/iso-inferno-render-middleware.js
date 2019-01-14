// @flow
import JsonGlobals from 'safe-json-globals';
import StyletronServer from 'styletron-server';
import {match} from 'inferno-router';
import {renderToString} from 'inferno-server';

import type {Server} from '../server';
import {initAssetURL} from '../asset-url';
import {initServerI18n} from '../iso-i18n';
import {configureStore} from './root/configure-store';
import {rootHtml} from './root/root-html';
import {RootServer} from './root/root-server';

export function isoInfernoRenderMiddleware(server: Server): any {
  return async(ctx, next) => {
    ctx.isoInfernoRender = ({vDom, reducer, clientScript}) => {
      const renderProps = match(vDom, ctx.url);
      if (renderProps.redirect) {
        return ctx.redirect(renderProps.redirect);
      }

      return html(ctx, renderProps, reducer, clientScript);
    };
    await next();
  };
}

function html(ctx, renderProps, reducer, clientScript): string {
  initServerI18n(ctx);
  const state = ctx.getState();
  const jsonGlobals = JsonGlobals({state});
  initAssetURL(state.base.manifest);
  const store = configureStore(state, reducer);
  const styletron = new StyletronServer({prefix: '_'});

  const reactMarkup = renderToString(
    <RootServer store={store} renderProps={renderProps} styletron={styletron}/>
  );
  return rootHtml({styletron, jsonGlobals, reactMarkup, clientScript, nonce: ctx.state.nonce});
}
