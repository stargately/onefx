"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.styled = void 0;

var _react = _interopRequireDefault(require("react"));

var _styletronReact = require("styletron-react");

var _styletronStandard = require("styletron-standard");

var _themeProvider = require("./theme-provider");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

const wrapper = (StyledComponent) =>
  function withThemeHOC(props) {
    return /*#__PURE__*/ _react.default.createElement(
      _themeProvider.Consumer,
      null,
      ($theme) =>
        /*#__PURE__*/ _react.default.createElement(
          StyledComponent,
          _extends({}, props, {
            $theme: $theme,
          })
        )
    );
  };

const styled = (0, _styletronReact.createStyled)({
  wrapper,
  getInitialStyle: _styletronStandard.getInitialStyle,
  driver: _styletronStandard.driver,
});
exports.styled = styled;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXRyb24tcmVhY3Qvc3R5bGVkLnRzeCJdLCJuYW1lcyI6WyJ3cmFwcGVyIiwiU3R5bGVkQ29tcG9uZW50Iiwid2l0aFRoZW1lSE9DIiwicHJvcHMiLCIkdGhlbWUiLCJzdHlsZWQiLCJnZXRJbml0aWFsU3R5bGUiLCJkcml2ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFLQTs7QUFDQTs7Ozs7O0FBR0EsTUFBTUEsT0FBeUIsR0FBSUMsZUFBRCxJQUNoQyxTQUFTQyxZQUFULENBQXNCQyxLQUF0QixFQUE2QjtBQUMzQixzQkFDRSw2QkFBQyx1QkFBRCxRQUNJQyxNQUFELGlCQUFZLDZCQUFDLGVBQUQsZUFBcUJELEtBQXJCO0FBQTRCLElBQUEsTUFBTSxFQUFFQztBQUFwQyxLQURmLENBREY7QUFLRCxDQVBIOztBQW1DTyxNQUFNQyxNQUFnQixHQUFHLGtDQUFhO0FBQzNDTCxFQUFBQSxPQUQyQztBQUUzQ00sRUFBQUEsZUFBZSxFQUFmQSxrQ0FGMkM7QUFHM0NDLEVBQUFBLE1BQU0sRUFBTkE7QUFIMkMsQ0FBYixDQUF6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZVN0eWxlZCxcbiAgU3R5bGV0cm9uQ29tcG9uZW50LFxuICBTdHlsZXRyb25XcmFwcGVyLFxufSBmcm9tIFwic3R5bGV0cm9uLXJlYWN0XCI7XG5pbXBvcnQgeyBkcml2ZXIsIGdldEluaXRpYWxTdHlsZSwgU3R5bGVPYmplY3QgfSBmcm9tIFwic3R5bGV0cm9uLXN0YW5kYXJkXCI7XG5pbXBvcnQgeyBDb25zdW1lciB9IGZyb20gXCIuL3RoZW1lLXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBUaGVtZSB9IGZyb20gXCIuL3RoZW1lLXR5cGVzXCI7XG5cbmNvbnN0IHdyYXBwZXI6IFN0eWxldHJvbldyYXBwZXIgPSAoU3R5bGVkQ29tcG9uZW50KSA9PlxuICBmdW5jdGlvbiB3aXRoVGhlbWVIT0MocHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnN1bWVyPlxuICAgICAgICB7KCR0aGVtZSkgPT4gPFN0eWxlZENvbXBvbmVudCB7Li4ucHJvcHN9ICR0aGVtZT17JHRoZW1lfSAvPn1cbiAgICAgIDwvQ29uc3VtZXI+XG4gICAgKTtcbiAgfTtcblxuZXhwb3J0IGludGVyZmFjZSBTdHlsZWRGbiB7XG4gIDxcbiAgICBDIGV4dGVuZHMga2V5b2YgSlNYLkludHJpbnNpY0VsZW1lbnRzIHwgUmVhY3QuQ29tcG9uZW50VHlwZTxhbnk+LFxuICAgIFAgZXh0ZW5kcyBvYmplY3RcbiAgPihcbiAgICBjb21wb25lbnQ6IEMsXG4gICAgc3R5bGU6IChwcm9wczogUCAmIHsgJHRoZW1lOiBUaGVtZSB9KSA9PiBTdHlsZU9iamVjdFxuICApOiBTdHlsZXRyb25Db21wb25lbnQ8XG4gICAgUGljazxcbiAgICAgIFJlYWN0LkNvbXBvbmVudFByb3BzPEM+LFxuICAgICAgRXhjbHVkZTxrZXlvZiBSZWFjdC5Db21wb25lbnRQcm9wczxDPiwgeyBjbGFzc05hbWU6IHN0cmluZyB9PlxuICAgID4gJlxuICAgICAgUFxuICA+O1xuXG4gIDxDIGV4dGVuZHMga2V5b2YgSlNYLkludHJpbnNpY0VsZW1lbnRzIHwgUmVhY3QuQ29tcG9uZW50VHlwZTxhbnk+PihcbiAgICBjb21wb25lbnQ6IEMsXG4gICAgc3R5bGU6IFN0eWxlT2JqZWN0XG4gICk6IFN0eWxldHJvbkNvbXBvbmVudDxcbiAgICBQaWNrPFxuICAgICAgUmVhY3QuQ29tcG9uZW50UHJvcHM8Qz4sXG4gICAgICBFeGNsdWRlPGtleW9mIFJlYWN0LkNvbXBvbmVudFByb3BzPEM+LCB7IGNsYXNzTmFtZTogc3RyaW5nIH0+XG4gICAgPlxuICA+O1xufVxuXG5leHBvcnQgY29uc3Qgc3R5bGVkOiBTdHlsZWRGbiA9IGNyZWF0ZVN0eWxlZCh7XG4gIHdyYXBwZXIsXG4gIGdldEluaXRpYWxTdHlsZSxcbiAgZHJpdmVyLFxufSk7XG4iXX0=
