// @ts-ignore
import window from "global/window";
import React, { useEffect } from "react";
import { Theme } from "./theme-types";

export type ThemeCode = "light" | "dark";

export const THEME = {
  colors: {
    primary: "var(--primary)",
    secondary: "var(--secondary)",

    black: "var(--black)",
    black10: "var(--black10)",
    black20: "var(--black20)",
    black40: "var(--black40)",
    black60: "var(--black60)",
    black80: "var(--black80)",
    black95: "var(--black95)",

    text01: "var(--text01)",
    textReverse: "var(--textReverse)",

    white: "var(--white)",

    error: "var(--error)",
    success: "var(--success)",
    warning: "var(--warning)",
    information: "var(--information)",

    nav01: "var(--nav01)",
    nav02: "var(--nav02)",
    nav03: "var(--nav03)",
  },
  sizing: ["2px", "6px", "10px", "16px", "24px", "32px"],
};

const { Provider, Consumer } = React.createContext<Theme>(THEME);

export const defaultThemeCode =
  window.document && window.document.documentElement.getAttribute("data-theme");

type Props = {
  light: Theme;
  dark?: Theme;
  themeCode?: ThemeCode;
  children: React.ReactNode;
  setTheme(t: ThemeCode): void;
};

export const ThemeProvider = ({
  light,
  dark,
  children,
  themeCode = defaultThemeCode === "dark" ? "dark" : "light",
  setTheme,
}: Props): JSX.Element => {
  let curTheme = light;
  if (themeCode === "dark" && dark) {
    curTheme = dark;
  }

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(({ matches }: { matches: boolean }) => {
        setTheme(matches ? "dark" : "light");
      });
  }, []);

  return <Provider value={curTheme}>{children}</Provider>;
};

export { Consumer };
