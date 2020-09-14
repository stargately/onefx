import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import { Store } from "redux";
// @ts-ignore
import { Provider as StyletronProvider } from "styletron-react";
import { ViewState } from "../../types";

type Props = {
  store: Store<ViewState>;
  children: JSX.Element;
  // tslint:disable-next-line
  styletron: any;
  location: string;
  context: Record<string, unknown>;
  routePrefix: string;
};

export function RootServer({
  store,
  styletron,
  location,
  context,
  children,
  routePrefix,
}: Props): JSX.Element {
  return (
    <StyletronProvider value={styletron}>
      <Provider store={store}>
        <StaticRouter
          location={location}
          context={context}
          basename={routePrefix}
        >
          {children}
        </StaticRouter>
      </Provider>
    </StyletronProvider>
  );
}
