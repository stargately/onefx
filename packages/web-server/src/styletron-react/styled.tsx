/* tslint:disable:no-any */
import React, { PropsWithChildren } from "react";
import {
  createStyled,
  StyletronComponent,
  StyletronWrapper,
} from "styletron-react";
import { driver, getInitialStyle, StyleObject } from "styletron-standard";
import { Consumer } from "./theme-provider";
import { Theme } from "./theme-types";

const wrapper: StyletronWrapper = (StyledComponent) =>
  function withThemeHOC(props: PropsWithChildren<any>): JSX.Element {
    return (
      <Consumer>
        {($theme) => <StyledComponent {...props} $theme={$theme} />}
      </Consumer>
    );
  };

export interface StyledFn {
  <
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    P extends object
  >(
    component: C,
    style: (props: P & { 
      [keys: string]: boolean | number | string;
      $theme: Theme;
    }) => StyleObject
  ): StyletronComponent<
    Pick<
      React.ComponentProps<C>,
      Exclude<keyof React.ComponentProps<C>, { className: string }>
    > &
     P | Record<string, boolean | number | string>
  >;

  <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
    component: C,
    style: StyleObject
  ): StyletronComponent<
    Pick<
      React.ComponentProps<C>,
      Exclude<keyof React.ComponentProps<C>, { className: string }>
    >
  >;
}

export const styled: StyledFn = createStyled({
  wrapper,
  getInitialStyle,
  driver,
});
