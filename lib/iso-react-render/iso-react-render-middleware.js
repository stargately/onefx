"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.isoReactRenderMiddleware = isoReactRenderMiddleware;

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _safeJsonGlobals = _interopRequireDefault(require("safe-json-globals"));

var _styletronEngineAtomic = require("styletron-engine-atomic");

var _assetUrl = require("../asset-url");

var _isoI18n = require("../iso-i18n");

var _configureStore = require("./root/configure-store");

var _rootHtml = require("./root/root-html");

var _rootServer = require("./root/root-server");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// @ts-ignore
// @ts-ignore
function isoReactRenderMiddleware(server) {
  return async (ctx, next) => {
    ctx.isoReactRender = ({ VDom, reducer, clientScript }) => {
      const state = ctx.getState();
      const jsonGlobals = (0, _safeJsonGlobals.default)({
        state,
      });
      const routePrefix = server.config.server.routePrefix || "";
      const cdnBase = server.config.server.cdnBase || "";
      (0, _assetUrl.initAssetURL)(state.base.manifest, routePrefix, cdnBase);
      const store = (0, _configureStore.configureStore)(state, reducer);
      const styletron = new _styletronEngineAtomic.Server({
        prefix: "_",
      });
      const context = {
        url: undefined,
        statusCode: undefined,
        status: undefined,
      };
      (0, _isoI18n.initClientI18n)(ctx.state.view.base.translations);
      const reactMarkup = (0, _server.renderToString)(
        /*#__PURE__*/ _react.default.createElement(
          _rootServer.RootServer,
          {
            store: store,
            location: ctx.url,
            context: context,
            styletron: styletron,
            routePrefix: routePrefix,
          },
          VDom
        )
      ); // This will contain the URL to redirect to if <Redirect> was used

      if (context.url) {
        // @ts-ignore
        return ctx.redirect(context.url);
      }

      if (context.statusCode) {
        // @ts-ignore
        ctx.status = context.statusCode;
      } else if (context.status) {
        // @ts-ignore
        ctx.status = context.status;
      }

      return (0, _rootHtml.rootHtml)({
        styletron,
        jsonGlobals,
        reactMarkup,
        clientScript,
      });
    };

    await next();
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pc28tcmVhY3QtcmVuZGVyL2lzby1yZWFjdC1yZW5kZXItbWlkZGxld2FyZS50c3giXSwibmFtZXMiOlsiaXNvUmVhY3RSZW5kZXJNaWRkbGV3YXJlIiwic2VydmVyIiwiY3R4IiwibmV4dCIsImlzb1JlYWN0UmVuZGVyIiwiVkRvbSIsInJlZHVjZXIiLCJjbGllbnRTY3JpcHQiLCJzdGF0ZSIsImdldFN0YXRlIiwianNvbkdsb2JhbHMiLCJyb3V0ZVByZWZpeCIsImNvbmZpZyIsImNkbkJhc2UiLCJiYXNlIiwibWFuaWZlc3QiLCJzdG9yZSIsInN0eWxldHJvbiIsIlN0eWxldHJvblNlcnZlciIsInByZWZpeCIsImNvbnRleHQiLCJ1cmwiLCJ1bmRlZmluZWQiLCJzdGF0dXNDb2RlIiwic3RhdHVzIiwidmlldyIsInRyYW5zbGF0aW9ucyIsInJlYWN0TWFya3VwIiwicmVkaXJlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7OztBQVZBO0FBRUE7QUFVTyxTQUFTQSx3QkFBVCxDQUFrQ0MsTUFBbEMsRUFBOEQ7QUFDbkUsU0FBTyxPQUFPQyxHQUFQLEVBQXFCQyxJQUFyQixLQUF3QztBQUM3Q0QsSUFBQUEsR0FBRyxDQUFDRSxjQUFKLEdBQXFCLENBQUM7QUFBRUMsTUFBQUEsSUFBRjtBQUFRQyxNQUFBQSxPQUFSO0FBQWlCQyxNQUFBQTtBQUFqQixLQUFELEtBQTZDO0FBQ2hFLFlBQU1DLEtBQUssR0FBR04sR0FBRyxDQUFDTyxRQUFKLEVBQWQ7QUFRQSxZQUFNQyxXQUFXLEdBQUcsOEJBQVk7QUFBRUYsUUFBQUE7QUFBRixPQUFaLENBQXBCO0FBQ0EsWUFBTUcsV0FBVyxHQUFHVixNQUFNLENBQUNXLE1BQVAsQ0FBY1gsTUFBZCxDQUFxQlUsV0FBckIsSUFBb0MsRUFBeEQ7QUFDQSxZQUFNRSxPQUFPLEdBQUdaLE1BQU0sQ0FBQ1csTUFBUCxDQUFjWCxNQUFkLENBQXFCWSxPQUFyQixJQUFnQyxFQUFoRDtBQUNBLGtDQUFhTCxLQUFLLENBQUNNLElBQU4sQ0FBV0MsUUFBeEIsRUFBa0NKLFdBQWxDLEVBQStDRSxPQUEvQztBQUNBLFlBQU1HLEtBQUssR0FBRyxvQ0FBZVIsS0FBZixFQUFzQkYsT0FBdEIsQ0FBZDtBQUNBLFlBQU1XLFNBQVMsR0FBRyxJQUFJQyw2QkFBSixDQUFvQjtBQUFFQyxRQUFBQSxNQUFNLEVBQUU7QUFBVixPQUFwQixDQUFsQjtBQUVBLFlBQU1DLE9BQU8sR0FBRztBQUNkQyxRQUFBQSxHQUFHLEVBQUVDLFNBRFM7QUFFZEMsUUFBQUEsVUFBVSxFQUFFRCxTQUZFO0FBR2RFLFFBQUFBLE1BQU0sRUFBRUY7QUFITSxPQUFoQjtBQUtBLG1DQUFlcEIsR0FBRyxDQUFDTSxLQUFKLENBQVVpQixJQUFWLENBQWVYLElBQWYsQ0FBb0JZLFlBQW5DO0FBQ0EsWUFBTUMsV0FBVyxHQUFHLDBDQUNsQiw2QkFBQyxzQkFBRDtBQUNFLFFBQUEsS0FBSyxFQUFFWCxLQURUO0FBRUUsUUFBQSxRQUFRLEVBQUVkLEdBQUcsQ0FBQ21CLEdBRmhCO0FBR0UsUUFBQSxPQUFPLEVBQUVELE9BSFg7QUFJRSxRQUFBLFNBQVMsRUFBRUgsU0FKYjtBQUtFLFFBQUEsV0FBVyxFQUFFTjtBQUxmLFNBT0dOLElBUEgsQ0FEa0IsQ0FBcEIsQ0F0QmdFLENBa0NoRTs7QUFDQSxVQUFJZSxPQUFPLENBQUNDLEdBQVosRUFBaUI7QUFDZjtBQUNBLGVBQU9uQixHQUFHLENBQUMwQixRQUFKLENBQWFSLE9BQU8sQ0FBQ0MsR0FBckIsQ0FBUDtBQUNEOztBQUNELFVBQUlELE9BQU8sQ0FBQ0csVUFBWixFQUF3QjtBQUN0QjtBQUNBckIsUUFBQUEsR0FBRyxDQUFDc0IsTUFBSixHQUFhSixPQUFPLENBQUNHLFVBQXJCO0FBQ0QsT0FIRCxNQUdPLElBQUlILE9BQU8sQ0FBQ0ksTUFBWixFQUFvQjtBQUN6QjtBQUNBdEIsUUFBQUEsR0FBRyxDQUFDc0IsTUFBSixHQUFhSixPQUFPLENBQUNJLE1BQXJCO0FBQ0Q7O0FBRUQsYUFBTyx3QkFBUztBQUFFUCxRQUFBQSxTQUFGO0FBQWFQLFFBQUFBLFdBQWI7QUFBMEJpQixRQUFBQSxXQUExQjtBQUF1Q3BCLFFBQUFBO0FBQXZDLE9BQVQsQ0FBUDtBQUNELEtBaEREOztBQWlEQSxVQUFNSixJQUFJLEVBQVY7QUFDRCxHQW5ERDtBQW9ERCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIjtcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBKc29uR2xvYmFscyBmcm9tIFwic2FmZS1qc29uLWdsb2JhbHNcIjtcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB7IFNlcnZlciBhcyBTdHlsZXRyb25TZXJ2ZXIgfSBmcm9tIFwic3R5bGV0cm9uLWVuZ2luZS1hdG9taWNcIjtcbmltcG9ydCB7IGluaXRBc3NldFVSTCB9IGZyb20gXCIuLi9hc3NldC11cmxcIjtcbmltcG9ydCB7IGluaXRDbGllbnRJMThuIH0gZnJvbSBcIi4uL2lzby1pMThuXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBNaWRkbGV3YXJlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVTdG9yZSB9IGZyb20gXCIuL3Jvb3QvY29uZmlndXJlLXN0b3JlXCI7XG5pbXBvcnQgeyByb290SHRtbCB9IGZyb20gXCIuL3Jvb3Qvcm9vdC1odG1sXCI7XG5pbXBvcnQgeyBSb290U2VydmVyIH0gZnJvbSBcIi4vcm9vdC9yb290LXNlcnZlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNvUmVhY3RSZW5kZXJNaWRkbGV3YXJlKHNlcnZlcjogU2VydmVyKTogTWlkZGxld2FyZSB7XG4gIHJldHVybiBhc3luYyAoY3R4OiBDb250ZXh0LCBuZXh0OiBGdW5jdGlvbikgPT4ge1xuICAgIGN0eC5pc29SZWFjdFJlbmRlciA9ICh7IFZEb20sIHJlZHVjZXIsIGNsaWVudFNjcmlwdCB9KTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gY3R4LmdldFN0YXRlKCkgYXMge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJvdXRlUHJlZml4OiBzdHJpbmc7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgY29uc3QganNvbkdsb2JhbHMgPSBKc29uR2xvYmFscyh7IHN0YXRlIH0pO1xuICAgICAgY29uc3Qgcm91dGVQcmVmaXggPSBzZXJ2ZXIuY29uZmlnLnNlcnZlci5yb3V0ZVByZWZpeCB8fCBcIlwiO1xuICAgICAgY29uc3QgY2RuQmFzZSA9IHNlcnZlci5jb25maWcuc2VydmVyLmNkbkJhc2UgfHwgXCJcIjtcbiAgICAgIGluaXRBc3NldFVSTChzdGF0ZS5iYXNlLm1hbmlmZXN0LCByb3V0ZVByZWZpeCwgY2RuQmFzZSk7XG4gICAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHN0YXRlLCByZWR1Y2VyKTtcbiAgICAgIGNvbnN0IHN0eWxldHJvbiA9IG5ldyBTdHlsZXRyb25TZXJ2ZXIoeyBwcmVmaXg6IFwiX1wiIH0pO1xuXG4gICAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICB1cmw6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhdHVzQ29kZTogdW5kZWZpbmVkLFxuICAgICAgICBzdGF0dXM6IHVuZGVmaW5lZFxuICAgICAgfTtcbiAgICAgIGluaXRDbGllbnRJMThuKGN0eC5zdGF0ZS52aWV3LmJhc2UudHJhbnNsYXRpb25zKTtcbiAgICAgIGNvbnN0IHJlYWN0TWFya3VwID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxSb290U2VydmVyXG4gICAgICAgICAgc3RvcmU9e3N0b3JlfVxuICAgICAgICAgIGxvY2F0aW9uPXtjdHgudXJsfVxuICAgICAgICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgICAgICAgc3R5bGV0cm9uPXtzdHlsZXRyb259XG4gICAgICAgICAgcm91dGVQcmVmaXg9e3JvdXRlUHJlZml4fVxuICAgICAgICA+XG4gICAgICAgICAge1ZEb219XG4gICAgICAgIDwvUm9vdFNlcnZlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIFRoaXMgd2lsbCBjb250YWluIHRoZSBVUkwgdG8gcmVkaXJlY3QgdG8gaWYgPFJlZGlyZWN0PiB3YXMgdXNlZFxuICAgICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGN0eC5yZWRpcmVjdChjb250ZXh0LnVybCk7XG4gICAgICB9XG4gICAgICBpZiAoY29udGV4dC5zdGF0dXNDb2RlKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY3R4LnN0YXR1cyA9IGNvbnRleHQuc3RhdHVzQ29kZTtcbiAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5zdGF0dXMpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjdHguc3RhdHVzID0gY29udGV4dC5zdGF0dXM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb290SHRtbCh7IHN0eWxldHJvbiwganNvbkdsb2JhbHMsIHJlYWN0TWFya3VwLCBjbGllbnRTY3JpcHQgfSk7XG4gICAgfTtcbiAgICBhd2FpdCBuZXh0KCk7XG4gIH07XG59XG4iXX0=
