import { styled } from "onefx/lib/styletron-react";

export const TextInput = styled(
  "input",
  (props: { error?: string; color?: string; $theme: any }) => {
    return {
      color: `${props.color || props.$theme.colors.text01} !important`,
      borderRadius: "0px !important",
      backgroundColor: `${props.$theme.colors.white} !important`,
      position: "relative",
      display: "block !important",
      width: "100% !important",
      border: `1px solid ${
        props.error ? props.$theme.colors.error : props.$theme.colors.black20
      }`,
      ":focus": {
        border: `1px solid ${
          props.error ? props.$theme.colors.error : props.$theme.colors.primary
        }`
      },
      lineHeight: "24px !important",
      padding: "11px !important",
      outline: "none",
      transition: "all 200ms ease",
      boxSizing: "border-box",
      backgroundClip: "padding-box"
    };
  }
);
