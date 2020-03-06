import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Store } from "redux";
// @ts-ignore
import { Provider as StyletronProvider } from "styletron-react";
import { ViewState } from "../../types";

type Props = {
  store: Store<ViewState>;
  children: JSX.Element;
  // tslint:disable-next-line
  styletron: any;
  routePrefix: string;
};

export function RootBrowser({
  store,
  children,
  styletron,
  routePrefix
}: Props): JSX.Element {
  return (
    <StyletronProvider value={styletron}>
      <Provider store={store}>
        <BrowserRouter basename={routePrefix}>{children}</BrowserRouter>
      </Provider>
    </StyletronProvider>
  );
}
