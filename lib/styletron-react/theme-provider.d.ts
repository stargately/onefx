import React from "react";
import { Theme } from "./theme-types";
export declare type ThemeCode = "light" | "dark";
export declare const THEME: {
  colors: {
    primary: string;
    secondary: string;
    black: string;
    black10: string;
    black20: string;
    black40: string;
    black60: string;
    black80: string;
    black95: string;
    text01: string;
    textReverse: string;
    white: string;
    error: string;
    success: string;
    warning: string;
    information: string;
    nav01: string;
    nav02: string;
    nav03: string;
  };
  sizing: string[];
};
declare const Consumer: React.Consumer<Theme>;
export declare const defaultThemeCode: any;
declare type Props = {
  light?: Theme;
  dark?: Theme;
  themeCode?: ThemeCode;
  children?: React.ReactNode;
  setTheme?(t: ThemeCode): void;
};
export declare const ThemeProvider: ({
  light,
  dark,
  children,
  themeCode,
  setTheme,
}: Props) => JSX.Element;
export { Consumer };
