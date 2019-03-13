import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { Store } from "redux";
// @ts-ignore
import { Provider as StyletronProvider } from "styletron-react";
import { State } from "../../types";

type Props = {
  store: Store<State>;
  children: JSX.Element;
  // tslint:disable-next-line
  styletron: any;
  location: string;
  context: object;
};

export function RootServer({
  store,
  styletron,
  location,
  context,
  children
}: Props): JSX.Element {
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
