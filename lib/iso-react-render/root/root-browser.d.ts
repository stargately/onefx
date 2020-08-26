import { Store } from "redux";
import { ViewState } from "../../types";
declare type Props = {
  store: Store<ViewState>;
  children: JSX.Element;
  styletron: any;
  routePrefix: string;
};
export declare function RootBrowser({
  store,
  children,
  styletron,
  routePrefix,
}: Props): JSX.Element;
export {};
