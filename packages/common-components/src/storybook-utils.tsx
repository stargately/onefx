import { styled } from "onefx/lib/styletron-react";
import React from "react";
import "./antd.less";
import { Story } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { Theme, ThemeProvider } from "onefx/lib/styletron-react";
import { THEME } from "onefx/lib/styletron-react/theme-provider";
import { Client as StyletronClient } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { Provider } from "react-redux";
import { configureStore } from "onefx/lib/iso-react-render/root/configure-store";

const styletron = new StyletronClient({ prefix: "_" });

const light: Theme = {
  colors: {
    primary: "#6161e8",
    secondary: "#ffffff",

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

export const WrapThemeProvider: React.FC = ({ children }) => {
  return (
    <StyletronProvider value={styletron}>
      <ThemeProvider light={light} setTheme={() => null}>
        {children}
      </ThemeProvider>
    </StyletronProvider>
  );
};

export const themeDecorator = () =>
  function Inner(story: Story): JSX.Element {
    return (
      <Provider store={configureStore({ base: {} })}>
        <WrapThemeProvider>
          <Overlay>
            <MobileContent>
              <BrowserRouter>{React.createElement(story)}</BrowserRouter>
            </MobileContent>
          </Overlay>
        </WrapThemeProvider>
      </Provider>
    );
  };

const MobileContent = styled("div", () => ({
  width: "360px",
  height: "600px"
}));

const Overlay = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "700px",
  backgroundColor: $theme.colors.black10
}));
