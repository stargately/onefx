// @flow
import document from 'global/document';
import {Client as StyletronClient} from 'styletron-engine-atomic';
import {render} from 'react-dom';
import JSONGlobals from 'safe-json-globals/get';
import {initAssetURL} from '../asset-url';
import {initClientI18n} from '../iso-i18n';
import {configureStore} from './root/configure-store';
import {RootBrowser} from './root/root-browser';
import {noopReducer} from './root/root-reducer';

export const STYLETRON_GLOBAL = 'styletron-global';

export function clientReactRender({reducer = noopReducer, VDom}) {
  const store = configureStore(JSONGlobals('state'), reducer);
  const {translations, manifest} = store.getState().base;

  initClientI18n(translations);
  initAssetURL(manifest);
  const stylesheets = document.getElementsByClassName(STYLETRON_GLOBAL);
  const styletron = new StyletronClient({hydrate: stylesheets, prefix: '_'});

  render(
    <RootBrowser store={store} styletron={styletron}>
      {VDom}
    </RootBrowser>
    ,
    document.getElementById('root')
  );
}

