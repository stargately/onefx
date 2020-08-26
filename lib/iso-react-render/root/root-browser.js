"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.RootBrowser = RootBrowser;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _styletronReact = require("styletron-react");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// @ts-ignore
function RootBrowser({ store, children, styletron, routePrefix }) {
  return /*#__PURE__*/ _react.default.createElement(
    _styletronReact.Provider,
    {
      value: styletron,
    },
    /*#__PURE__*/ _react.default.createElement(
      _reactRedux.Provider,
      {
        store: store,
      },
      /*#__PURE__*/ _react.default.createElement(
        _reactRouterDom.BrowserRouter,
        {
          basename: routePrefix,
        },
        children
      )
    )
  );
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pc28tcmVhY3QtcmVuZGVyL3Jvb3Qvcm9vdC1icm93c2VyLnRzeCJdLCJuYW1lcyI6WyJSb290QnJvd3NlciIsInN0b3JlIiwiY2hpbGRyZW4iLCJzdHlsZXRyb24iLCJyb3V0ZVByZWZpeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUdBOzs7O0FBREE7QUFZTyxTQUFTQSxXQUFULENBQXFCO0FBQzFCQyxFQUFBQSxLQUQwQjtBQUUxQkMsRUFBQUEsUUFGMEI7QUFHMUJDLEVBQUFBLFNBSDBCO0FBSTFCQyxFQUFBQTtBQUowQixDQUFyQixFQUtnQjtBQUNyQixzQkFDRSw2QkFBQyx3QkFBRDtBQUFtQixJQUFBLEtBQUssRUFBRUQ7QUFBMUIsa0JBQ0UsNkJBQUMsb0JBQUQ7QUFBVSxJQUFBLEtBQUssRUFBRUY7QUFBakIsa0JBQ0UsNkJBQUMsNkJBQUQ7QUFBZSxJQUFBLFFBQVEsRUFBRUc7QUFBekIsS0FBdUNGLFFBQXZDLENBREYsQ0FERixDQURGO0FBT0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJyZWR1eFwiO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgUHJvdmlkZXIgYXMgU3R5bGV0cm9uUHJvdmlkZXIgfSBmcm9tIFwic3R5bGV0cm9uLXJlYWN0XCI7XG5pbXBvcnQgeyBWaWV3U3RhdGUgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgc3RvcmU6IFN0b3JlPFZpZXdTdGF0ZT47XG4gIGNoaWxkcmVuOiBKU1guRWxlbWVudDtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHN0eWxldHJvbjogYW55O1xuICByb3V0ZVByZWZpeDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFJvb3RCcm93c2VyKHtcbiAgc3RvcmUsXG4gIGNoaWxkcmVuLFxuICBzdHlsZXRyb24sXG4gIHJvdXRlUHJlZml4XG59OiBQcm9wcyk6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIChcbiAgICA8U3R5bGV0cm9uUHJvdmlkZXIgdmFsdWU9e3N0eWxldHJvbn0+XG4gICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgPEJyb3dzZXJSb3V0ZXIgYmFzZW5hbWU9e3JvdXRlUHJlZml4fT57Y2hpbGRyZW59PC9Ccm93c2VyUm91dGVyPlxuICAgICAgPC9Qcm92aWRlcj5cbiAgICA8L1N0eWxldHJvblByb3ZpZGVyPlxuICApO1xufVxuIl19
