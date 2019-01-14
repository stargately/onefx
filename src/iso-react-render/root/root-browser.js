// @flow

import {Provider as StyletronProvider} from 'styletron-react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

export function RootBrowser({store, children, styletron}: any) {
  return (
    <StyletronProvider value={styletron}>
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    </StyletronProvider>
  );
}
