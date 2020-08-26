"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.rootHtml = rootHtml;

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _assetUrl = require("../../asset-url");

var _clientReactRender = require("../client-react-render");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function rootHtml({ styletron, jsonGlobals, reactMarkup, clientScript }) {
  const stylesheets = styletron.getStylesheetsHtml(
    _clientReactRender.STYLETRON_GLOBAL
  );

  const head = _reactHelmet.default.rewind();

  return `<!DOCType html>
<html ${head.htmlAttributes.toString()}>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()} 
    ${head.link.toString()}
    ${head.style.toString()}
    <style>body{margin:0}</style>
    ${stylesheets}
    ${jsonGlobals}
    ${head.script.toString()}
  </head>
  <body>
    <div id='root'>${reactMarkup}</div>
    ${
      clientScript
        ? `<script type="text/javascript" crossorigin="" src="${(0,
          _assetUrl.assetURL)(clientScript)}"></script>`
        : ""
    }
  </body>
</html>
`;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pc28tcmVhY3QtcmVuZGVyL3Jvb3Qvcm9vdC1odG1sLnRzIl0sIm5hbWVzIjpbInJvb3RIdG1sIiwic3R5bGV0cm9uIiwianNvbkdsb2JhbHMiLCJyZWFjdE1hcmt1cCIsImNsaWVudFNjcmlwdCIsInN0eWxlc2hlZXRzIiwiZ2V0U3R5bGVzaGVldHNIdG1sIiwiU1RZTEVUUk9OX0dMT0JBTCIsImhlYWQiLCJIZWxtZXQiLCJyZXdpbmQiLCJodG1sQXR0cmlidXRlcyIsInRvU3RyaW5nIiwidGl0bGUiLCJtZXRhIiwibGluayIsInN0eWxlIiwic2NyaXB0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFXTyxTQUFTQSxRQUFULENBQWtCO0FBQ3ZCQyxFQUFBQSxTQUR1QjtBQUV2QkMsRUFBQUEsV0FGdUI7QUFHdkJDLEVBQUFBLFdBSHVCO0FBSXZCQyxFQUFBQTtBQUp1QixDQUFsQixFQUtVO0FBQ2YsUUFBTUMsV0FBVyxHQUFHSixTQUFTLENBQUNLLGtCQUFWLENBQTZCQyxtQ0FBN0IsQ0FBcEI7O0FBQ0EsUUFBTUMsSUFBSSxHQUFHQyxxQkFBT0MsTUFBUCxFQUFiOztBQUVBLFNBQVE7UUFDRkYsSUFBSSxDQUFDRyxjQUFMLENBQW9CQyxRQUFwQixFQUErQjs7TUFFakNKLElBQUksQ0FBQ0ssS0FBTCxDQUFXRCxRQUFYLEVBQXNCO01BQ3RCSixJQUFJLENBQUNNLElBQUwsQ0FBVUYsUUFBVixFQUFxQjtNQUNyQkosSUFBSSxDQUFDTyxJQUFMLENBQVVILFFBQVYsRUFBcUI7TUFDckJKLElBQUksQ0FBQ1EsS0FBTCxDQUFXSixRQUFYLEVBQXNCOztNQUV0QlAsV0FBWTtNQUNaSCxXQUFZO01BQ1pNLElBQUksQ0FBQ1MsTUFBTCxDQUFZTCxRQUFaLEVBQXVCOzs7cUJBR1JULFdBQVk7TUFFM0JDLFlBQVksR0FDUCxzREFBcUQsd0JBQ3BEQSxZQURvRCxDQUVwRCxhQUhNLEdBSVIsRUFDTDs7O0NBcEJIO0FBd0JEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlbG1ldCBmcm9tIFwicmVhY3QtaGVsbWV0XCI7XG5pbXBvcnQgeyBhc3NldFVSTCB9IGZyb20gXCIuLi8uLi9hc3NldC11cmxcIjtcbmltcG9ydCB7IFNUWUxFVFJPTl9HTE9CQUwgfSBmcm9tIFwiLi4vY2xpZW50LXJlYWN0LXJlbmRlclwiO1xuXG50eXBlIE9wdHMgPSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgc3R5bGV0cm9uOiBhbnk7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAganNvbkdsb2JhbHM6IGFueTtcbiAgcmVhY3RNYXJrdXA6IHN0cmluZztcbiAgY2xpZW50U2NyaXB0OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcm9vdEh0bWwoe1xuICBzdHlsZXRyb24sXG4gIGpzb25HbG9iYWxzLFxuICByZWFjdE1hcmt1cCxcbiAgY2xpZW50U2NyaXB0XG59OiBPcHRzKTogc3RyaW5nIHtcbiAgY29uc3Qgc3R5bGVzaGVldHMgPSBzdHlsZXRyb24uZ2V0U3R5bGVzaGVldHNIdG1sKFNUWUxFVFJPTl9HTE9CQUwpO1xuICBjb25zdCBoZWFkID0gSGVsbWV0LnJld2luZCgpO1xuXG4gIHJldHVybiBgPCFET0NUeXBlIGh0bWw+XG48aHRtbCAke2hlYWQuaHRtbEF0dHJpYnV0ZXMudG9TdHJpbmcoKX0+XG4gIDxoZWFkPlxuICAgICR7aGVhZC50aXRsZS50b1N0cmluZygpfVxuICAgICR7aGVhZC5tZXRhLnRvU3RyaW5nKCl9IFxuICAgICR7aGVhZC5saW5rLnRvU3RyaW5nKCl9XG4gICAgJHtoZWFkLnN0eWxlLnRvU3RyaW5nKCl9XG4gICAgPHN0eWxlPmJvZHl7bWFyZ2luOjB9PC9zdHlsZT5cbiAgICAke3N0eWxlc2hlZXRzfVxuICAgICR7anNvbkdsb2JhbHN9XG4gICAgJHtoZWFkLnNjcmlwdC50b1N0cmluZygpfVxuICA8L2hlYWQ+XG4gIDxib2R5PlxuICAgIDxkaXYgaWQ9J3Jvb3QnPiR7cmVhY3RNYXJrdXB9PC9kaXY+XG4gICAgJHtcbiAgICAgIGNsaWVudFNjcmlwdFxuICAgICAgICA/IGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBjcm9zc29yaWdpbj1cIlwiIHNyYz1cIiR7YXNzZXRVUkwoXG4gICAgICAgICAgICBjbGllbnRTY3JpcHRcbiAgICAgICAgICApfVwiPjwvc2NyaXB0PmBcbiAgICAgICAgOiBcIlwiXG4gICAgfVxuICA8L2JvZHk+XG48L2h0bWw+XG5gO1xufVxuIl19
