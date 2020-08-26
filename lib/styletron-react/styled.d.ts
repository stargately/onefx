import React from "react";
import { StyletronComponent } from "styletron-react";
import { StyleObject } from "styletron-standard";
import { Theme } from "./theme-types";
export interface StyledFn {
  <
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    P extends object
  >(
    component: C,
    style: (
      props: P & {
        $theme: Theme;
      }
    ) => StyleObject
  ): StyletronComponent<
    Pick<
      React.ComponentProps<C>,
      Exclude<
        keyof React.ComponentProps<C>,
        {
          className: string;
        }
      >
    > &
      P
  >;
  <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
    component: C,
    style: StyleObject
  ): StyletronComponent<
    Pick<
      React.ComponentProps<C>,
      Exclude<
        keyof React.ComponentProps<C>,
        {
          className: string;
        }
      >
    >
  >;
}
export declare const styled: StyledFn;
