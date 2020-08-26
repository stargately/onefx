"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Consumer = exports.ThemeProvider = exports.defaultThemeCode = exports.THEME = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function () {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

const window = require("global/window");

const THEME = {
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
exports.THEME = THEME;

const { Provider, Consumer } = /*#__PURE__*/ _react.default.createContext(
  THEME
);

exports.Consumer = Consumer;
const defaultThemeCode =
  window.document && window.document.documentElement.getAttribute("data-theme");
exports.defaultThemeCode = defaultThemeCode;

const ThemeProvider = ({
  light = THEME,
  dark,
  children,
  themeCode = defaultThemeCode === "dark" ? "dark" : "light",
  setTheme = () => null,
}) => {
  let curTheme = light;

  if (themeCode === "dark" && dark) {
    curTheme = dark;
  }

  (0, _react.useEffect)(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(({ matches }) => {
        setTheme(matches ? "dark" : "light");
      });
  }, []);
  return /*#__PURE__*/ _react.default.createElement(
    Provider,
    {
      value: curTheme,
    },
    children
  );
};

exports.ThemeProvider = ThemeProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXRyb24tcmVhY3QvdGhlbWUtcHJvdmlkZXIudHN4Il0sIm5hbWVzIjpbIndpbmRvdyIsInJlcXVpcmUiLCJUSEVNRSIsImNvbG9ycyIsInByaW1hcnkiLCJzZWNvbmRhcnkiLCJibGFjayIsImJsYWNrMTAiLCJibGFjazIwIiwiYmxhY2s0MCIsImJsYWNrNjAiLCJibGFjazgwIiwiYmxhY2s5NSIsInRleHQwMSIsInRleHRSZXZlcnNlIiwid2hpdGUiLCJlcnJvciIsInN1Y2Nlc3MiLCJ3YXJuaW5nIiwiaW5mb3JtYXRpb24iLCJuYXYwMSIsIm5hdjAyIiwibmF2MDMiLCJzaXppbmciLCJQcm92aWRlciIsIkNvbnN1bWVyIiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwiZGVmYXVsdFRoZW1lQ29kZSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwiVGhlbWVQcm92aWRlciIsImxpZ2h0IiwiZGFyayIsImNoaWxkcmVuIiwidGhlbWVDb2RlIiwic2V0VGhlbWUiLCJjdXJUaGVtZSIsIm1hdGNoTWVkaWEiLCJhZGRMaXN0ZW5lciIsIm1hdGNoZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7O0FBRkEsTUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUF0Qjs7QUFPTyxNQUFNQyxLQUFLLEdBQUc7QUFDbkJDLEVBQUFBLE1BQU0sRUFBRTtBQUNOQyxJQUFBQSxPQUFPLEVBQUUsZ0JBREg7QUFFTkMsSUFBQUEsU0FBUyxFQUFFLGtCQUZMO0FBSU5DLElBQUFBLEtBQUssRUFBRSxjQUpEO0FBS05DLElBQUFBLE9BQU8sRUFBRSxnQkFMSDtBQU1OQyxJQUFBQSxPQUFPLEVBQUUsZ0JBTkg7QUFPTkMsSUFBQUEsT0FBTyxFQUFFLGdCQVBIO0FBUU5DLElBQUFBLE9BQU8sRUFBRSxnQkFSSDtBQVNOQyxJQUFBQSxPQUFPLEVBQUUsZ0JBVEg7QUFVTkMsSUFBQUEsT0FBTyxFQUFFLGdCQVZIO0FBWU5DLElBQUFBLE1BQU0sRUFBRSxlQVpGO0FBYU5DLElBQUFBLFdBQVcsRUFBRSxvQkFiUDtBQWVOQyxJQUFBQSxLQUFLLEVBQUUsY0FmRDtBQWlCTkMsSUFBQUEsS0FBSyxFQUFFLGNBakJEO0FBa0JOQyxJQUFBQSxPQUFPLEVBQUUsZ0JBbEJIO0FBbUJOQyxJQUFBQSxPQUFPLEVBQUUsZ0JBbkJIO0FBb0JOQyxJQUFBQSxXQUFXLEVBQUUsb0JBcEJQO0FBc0JOQyxJQUFBQSxLQUFLLEVBQUUsY0F0QkQ7QUF1Qk5DLElBQUFBLEtBQUssRUFBRSxjQXZCRDtBQXdCTkMsSUFBQUEsS0FBSyxFQUFFO0FBeEJELEdBRFc7QUEyQm5CQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLE1BQWYsRUFBdUIsTUFBdkIsRUFBK0IsTUFBL0IsRUFBdUMsTUFBdkM7QUEzQlcsQ0FBZDs7O0FBOEJQLE1BQU07QUFBRUMsRUFBQUEsUUFBRjtBQUFZQyxFQUFBQTtBQUFaLGlCQUF5QkMsZUFBTUMsYUFBTixDQUEyQnpCLEtBQTNCLENBQS9COzs7QUFFTyxNQUFNMEIsZ0JBQWdCLEdBQzNCNUIsTUFBTSxDQUFDNkIsUUFBUCxJQUFtQjdCLE1BQU0sQ0FBQzZCLFFBQVAsQ0FBZ0JDLGVBQWhCLENBQWdDQyxZQUFoQyxDQUE2QyxZQUE3QyxDQURkOzs7QUFXQSxNQUFNQyxhQUFhLEdBQUcsQ0FBQztBQUM1QkMsRUFBQUEsS0FBSyxHQUFHL0IsS0FEb0I7QUFFNUJnQyxFQUFBQSxJQUY0QjtBQUc1QkMsRUFBQUEsUUFINEI7QUFJNUJDLEVBQUFBLFNBQVMsR0FBR1IsZ0JBQWdCLEtBQUssTUFBckIsR0FBOEIsTUFBOUIsR0FBdUMsT0FKdkI7QUFLNUJTLEVBQUFBLFFBQVEsR0FBRyxNQUFNO0FBTFcsQ0FBRCxLQU1IO0FBQ3hCLE1BQUlDLFFBQVEsR0FBR0wsS0FBZjs7QUFDQSxNQUFJRyxTQUFTLEtBQUssTUFBZCxJQUF3QkYsSUFBNUIsRUFBa0M7QUFDaENJLElBQUFBLFFBQVEsR0FBR0osSUFBWDtBQUNEOztBQUVELHdCQUFVLE1BQU07QUFDZGxDLElBQUFBLE1BQU0sQ0FDSHVDLFVBREgsQ0FDYyw4QkFEZCxFQUVHQyxXQUZILENBRWUsQ0FBQztBQUFFQyxNQUFBQTtBQUFGLEtBQUQsS0FBdUM7QUFDbERKLE1BQUFBLFFBQVEsQ0FBQ0ksT0FBTyxHQUFHLE1BQUgsR0FBWSxPQUFwQixDQUFSO0FBQ0QsS0FKSDtBQUtELEdBTkQsRUFNRyxFQU5IO0FBUUEsc0JBQU8sNkJBQUMsUUFBRDtBQUFVLElBQUEsS0FBSyxFQUFFSDtBQUFqQixLQUE0QkgsUUFBNUIsQ0FBUDtBQUNELENBckJNIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2luZG93ID0gcmVxdWlyZShcImdsb2JhbC93aW5kb3dcIik7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRoZW1lIH0gZnJvbSBcIi4vdGhlbWUtdHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgVGhlbWVDb2RlID0gXCJsaWdodFwiIHwgXCJkYXJrXCI7XG5cbmV4cG9ydCBjb25zdCBUSEVNRSA9IHtcbiAgY29sb3JzOiB7XG4gICAgcHJpbWFyeTogXCJ2YXIoLS1wcmltYXJ5KVwiLFxuICAgIHNlY29uZGFyeTogXCJ2YXIoLS1zZWNvbmRhcnkpXCIsXG5cbiAgICBibGFjazogXCJ2YXIoLS1ibGFjaylcIixcbiAgICBibGFjazEwOiBcInZhcigtLWJsYWNrMTApXCIsXG4gICAgYmxhY2syMDogXCJ2YXIoLS1ibGFjazIwKVwiLFxuICAgIGJsYWNrNDA6IFwidmFyKC0tYmxhY2s0MClcIixcbiAgICBibGFjazYwOiBcInZhcigtLWJsYWNrNjApXCIsXG4gICAgYmxhY2s4MDogXCJ2YXIoLS1ibGFjazgwKVwiLFxuICAgIGJsYWNrOTU6IFwidmFyKC0tYmxhY2s5NSlcIixcblxuICAgIHRleHQwMTogXCJ2YXIoLS10ZXh0MDEpXCIsXG4gICAgdGV4dFJldmVyc2U6IFwidmFyKC0tdGV4dFJldmVyc2UpXCIsXG5cbiAgICB3aGl0ZTogXCJ2YXIoLS13aGl0ZSlcIixcblxuICAgIGVycm9yOiBcInZhcigtLWVycm9yKVwiLFxuICAgIHN1Y2Nlc3M6IFwidmFyKC0tc3VjY2VzcylcIixcbiAgICB3YXJuaW5nOiBcInZhcigtLXdhcm5pbmcpXCIsXG4gICAgaW5mb3JtYXRpb246IFwidmFyKC0taW5mb3JtYXRpb24pXCIsXG5cbiAgICBuYXYwMTogXCJ2YXIoLS1uYXYwMSlcIixcbiAgICBuYXYwMjogXCJ2YXIoLS1uYXYwMilcIixcbiAgICBuYXYwMzogXCJ2YXIoLS1uYXYwMylcIixcbiAgfSxcbiAgc2l6aW5nOiBbXCIycHhcIiwgXCI2cHhcIiwgXCIxMHB4XCIsIFwiMTZweFwiLCBcIjI0cHhcIiwgXCIzMnB4XCJdLFxufTtcblxuY29uc3QgeyBQcm92aWRlciwgQ29uc3VtZXIgfSA9IFJlYWN0LmNyZWF0ZUNvbnRleHQ8VGhlbWU+KFRIRU1FKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRUaGVtZUNvZGUgPVxuICB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRoZW1lXCIpO1xuXG50eXBlIFByb3BzID0ge1xuICBsaWdodD86IFRoZW1lO1xuICBkYXJrPzogVGhlbWU7XG4gIHRoZW1lQ29kZT86IFRoZW1lQ29kZTtcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIHNldFRoZW1lPyh0OiBUaGVtZUNvZGUpOiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IFRoZW1lUHJvdmlkZXIgPSAoe1xuICBsaWdodCA9IFRIRU1FLFxuICBkYXJrLFxuICBjaGlsZHJlbixcbiAgdGhlbWVDb2RlID0gZGVmYXVsdFRoZW1lQ29kZSA9PT0gXCJkYXJrXCIgPyBcImRhcmtcIiA6IFwibGlnaHRcIixcbiAgc2V0VGhlbWUgPSAoKSA9PiBudWxsLFxufTogUHJvcHMpOiBKU1guRWxlbWVudCA9PiB7XG4gIGxldCBjdXJUaGVtZSA9IGxpZ2h0O1xuICBpZiAodGhlbWVDb2RlID09PSBcImRhcmtcIiAmJiBkYXJrKSB7XG4gICAgY3VyVGhlbWUgPSBkYXJrO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3dcbiAgICAgIC5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKVxuICAgICAgLmFkZExpc3RlbmVyKCh7IG1hdGNoZXMgfTogeyBtYXRjaGVzOiBib29sZWFuIH0pID0+IHtcbiAgICAgICAgc2V0VGhlbWUobWF0Y2hlcyA/IFwiZGFya1wiIDogXCJsaWdodFwiKTtcbiAgICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIDxQcm92aWRlciB2YWx1ZT17Y3VyVGhlbWV9PntjaGlsZHJlbn08L1Byb3ZpZGVyPjtcbn07XG5cbmV4cG9ydCB7IENvbnN1bWVyIH07XG4iXX0=
