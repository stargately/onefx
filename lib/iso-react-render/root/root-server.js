"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.RootServer = RootServer;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _styletronReact = require("styletron-react");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// @ts-ignore
function RootServer({
  store,
  styletron,
  location,
  context,
  children,
  routePrefix,
}) {
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
        _reactRouter.StaticRouter,
        {
          location: location,
          context: context,
          basename: routePrefix,
        },
        children
      )
    )
  );
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pc28tcmVhY3QtcmVuZGVyL3Jvb3Qvcm9vdC1zZXJ2ZXIudHN4Il0sIm5hbWVzIjpbIlJvb3RTZXJ2ZXIiLCJzdG9yZSIsInN0eWxldHJvbiIsImxvY2F0aW9uIiwiY29udGV4dCIsImNoaWxkcmVuIiwicm91dGVQcmVmaXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFHQTs7OztBQURBO0FBY08sU0FBU0EsVUFBVCxDQUFvQjtBQUN6QkMsRUFBQUEsS0FEeUI7QUFFekJDLEVBQUFBLFNBRnlCO0FBR3pCQyxFQUFBQSxRQUh5QjtBQUl6QkMsRUFBQUEsT0FKeUI7QUFLekJDLEVBQUFBLFFBTHlCO0FBTXpCQyxFQUFBQTtBQU55QixDQUFwQixFQU9nQjtBQUNyQixzQkFDRSw2QkFBQyx3QkFBRDtBQUFtQixJQUFBLEtBQUssRUFBRUo7QUFBMUIsa0JBQ0UsNkJBQUMsb0JBQUQ7QUFBVSxJQUFBLEtBQUssRUFBRUQ7QUFBakIsa0JBQ0UsNkJBQUMseUJBQUQ7QUFDRSxJQUFBLFFBQVEsRUFBRUUsUUFEWjtBQUVFLElBQUEsT0FBTyxFQUFFQyxPQUZYO0FBR0UsSUFBQSxRQUFRLEVBQUVFO0FBSFosS0FLR0QsUUFMSCxDQURGLENBREYsQ0FERjtBQWFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcInJlZHV4XCI7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyBQcm92aWRlciBhcyBTdHlsZXRyb25Qcm92aWRlciB9IGZyb20gXCJzdHlsZXRyb24tcmVhY3RcIjtcbmltcG9ydCB7IFZpZXdTdGF0ZSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBzdG9yZTogU3RvcmU8Vmlld1N0YXRlPjtcbiAgY2hpbGRyZW46IEpTWC5FbGVtZW50O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgc3R5bGV0cm9uOiBhbnk7XG4gIGxvY2F0aW9uOiBzdHJpbmc7XG4gIGNvbnRleHQ6IG9iamVjdDtcbiAgcm91dGVQcmVmaXg6IHN0cmluZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBSb290U2VydmVyKHtcbiAgc3RvcmUsXG4gIHN0eWxldHJvbixcbiAgbG9jYXRpb24sXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuLFxuICByb3V0ZVByZWZpeFxufTogUHJvcHMpOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiAoXG4gICAgPFN0eWxldHJvblByb3ZpZGVyIHZhbHVlPXtzdHlsZXRyb259PlxuICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgIDxTdGF0aWNSb3V0ZXJcbiAgICAgICAgICBsb2NhdGlvbj17bG9jYXRpb259XG4gICAgICAgICAgY29udGV4dD17Y29udGV4dH1cbiAgICAgICAgICBiYXNlbmFtZT17cm91dGVQcmVmaXh9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgPC9Qcm92aWRlcj5cbiAgICA8L1N0eWxldHJvblByb3ZpZGVyPlxuICApO1xufVxuIl19
