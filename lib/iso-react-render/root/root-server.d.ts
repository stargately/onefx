import { Store } from "redux";
import { ViewState } from "../../types";
declare type Props = {
  store: Store<ViewState>;
  children: JSX.Element;
  styletron: any;
  location: string;
  context: object;
  routePrefix: string;
};
export declare function RootServer({
  store,
  styletron,
  location,
  context,
  children,
  routePrefix,
}: Props): JSX.Element;
export {};
