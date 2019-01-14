// @flow
import document from 'global/document';
import StyletronClient from 'styletron-client';
import {render} from 'inferno';
import window from 'global/window';
import JSONGlobals from 'safe-json-globals/get';

import {initAssetURL} from '../../asset-url';
import {initClientI18n} from '../../iso-i18n';
import {configureStore} from './configure-store';
import {RootBrowser} from './root-browser';
import {noopReducer} from './root-reducer';
import type {TReducer} from './configure-store';

type RenderOpts = {
  reducer: TReducer<*, *>,
  vDom: any,
}

export function clientRender({reducer = noopReducer, vDom}: RenderOpts) {
  const store = configureStore(JSONGlobals('state'), reducer);
  // $FlowFixMe
  const {translations, manifest, csrfToken} = store.getState().base;
  window.csrfToken = csrfToken;

  initClientI18n(translations);
  initAssetURL(manifest);
  const stylesheets = document.getElementsByClassName('styletron-global');
  const styletron = new StyletronClient(stylesheets, {prefix: '_'});

  render(
    <RootBrowser store={store} styletron={styletron}>
      {vDom}
    </RootBrowser>
    ,
    document.getElementById('root')
  );
}

