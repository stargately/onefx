// @flow
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Provider as StyletronProvider} from 'styletron-react';

export function RootServer({store, styletron, location, context, children}: any) {
  return (
    <StyletronProvider value={styletron}>
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          {children}
        </StaticRouter>
      </Provider>
    </StyletronProvider>
  );
}
