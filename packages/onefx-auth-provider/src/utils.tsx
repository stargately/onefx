import { styled, Theme, ThemeProvider } from "onefx/lib/styletron-react";
import { THEME } from "onefx/lib/styletron-react/theme-provider";
import React from "react";
import { Client as StyletronClient } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";

const styletron = new StyletronClient({ prefix: "_" });

const light: Theme = {
  colors: {
    primary: "#00b4a0",
    secondary: "#0C8DE4",

    black: "#000000",
    black95: "#050505",
    black80: "#999999",
    black60: "#CCCCCC",
    black40: "#E5E5E5",
    black20: "#F0F0F0",
    black10: "#F7F7F7",

    text01: "#333333",
    white: "#fff",
    textReverse: "#fff",

    error: "#E54937", //	Error
    success: "#07A35A", //	Success
    warning: "#FFA000", //	Warning
    information: "#5aaafa", //	Information

    nav01: "#3C3C4D",
    nav02: "#20232a",
    nav03: "#151d27"
  },
  sizing: THEME.sizing
};

// tslint:disable-next-line:no-any
export const themeDecorator = () => (story: any) => {
  return (
    <StyletronProvider value={styletron}>
      <ThemeProvider light={light} setTheme={() => null}>
        {React.createElement(story)}
      </ThemeProvider>
    </StyletronProvider>
  );
};

export const MobileContent = styled("div", () => ({
  maxWidth: "575px"
}));
