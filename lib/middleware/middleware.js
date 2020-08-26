"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.initMiddleware = initMiddleware;

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaHelmet = _interopRequireDefault(require("koa-helmet"));

var _uuid = require("uuid");

var _isoReactRenderMiddleware = require("../iso-react-render/iso-react-render-middleware");

var _cookieSessionMiddleware = require("./cookie-session-middleware");

var _csp = _interopRequireDefault(require("./csp/csp"));

var _csrfMiddleware = require("./csrf-middleware");

var _i18nMiddleware = require("./i18n-middleware");

var _staticServe = require("./static-serve");

var _uncaughtErrorMiddleware = require("./uncaught-error-middleware");

var _viewBaseState = require("./view-base-state");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// @ts-ignore
function initMiddleware(server) {
  server.use((0, _uncaughtErrorMiddleware.uncaughtErrorMiddleware)(server)); // Static file serving

  const staticDir =
    (server.config && server.config.server && server.config.server.staticDir) ||
    "dist";
  server.all(
    "serve-static",
    "/(.*)",
    (0, _staticServe.staticServe)(staticDir, {
      routePrefix: server.config.server.routePrefix,
    })
  );
  server.use((0, _koaBodyparser.default)());
  server.use((0, _cookieSessionMiddleware.cookieSessionMiddleware)(server));
  server.use((0, _csrfMiddleware.csrfMiddleware)(server));
  server.use((0, _viewBaseState.viewBaseState)(server));
  (0, _i18nMiddleware.initI18nMiddleware)(server);
  server.use((0, _isoReactRenderMiddleware.isoReactRenderMiddleware)(server)); // security headers

  const { noSecurityHeadersRoutes } = server.config.server; // @ts-ignore

  server.use(
    htmlOnlyMiddleware({
      postFunc: async (ctx, _) => {
        if (
          (0, _csrfMiddleware.isPrefixMatched)(
            noSecurityHeadersRoutes,
            ctx.path
          )
        ) {
          return;
        }

        await (0, _koaHelmet.default)()(ctx, () => Promise.resolve(null));
      },
    })
  );
  const cspConfig = server.config.csp;

  if (cspConfig) {
    server.use(
      htmlOnlyMiddleware({
        preFunc: async (ctx) => {
          ctx.state.nonce = (0, _uuid.v4)();
        },
        postFunc: async (ctx) => {
          if (
            (0, _csrfMiddleware.isPrefixMatched)(
              noSecurityHeadersRoutes,
              ctx.path
            )
          ) {
            return;
          }

          await (0, _csp.default)({
            policy: {
              ...cspConfig,
              "script-src": [
                ...cspConfig["script-src"],
                (ctx) => {
                  return `'nonce-${ctx.state.nonce}'`;
                },
              ],
            },
          })(ctx, () => null);
        },
      })
    );
  }
}

function htmlOnlyMiddleware({ preFunc = () => null, postFunc = () => null }) {
  return async (ctx, next) => {
    await preFunc(ctx, next);
    await next();

    if (ctx.response.type === "text/html") {
      await postFunc(ctx, next);
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL21pZGRsZXdhcmUudHMiXSwibmFtZXMiOlsiaW5pdE1pZGRsZXdhcmUiLCJzZXJ2ZXIiLCJ1c2UiLCJzdGF0aWNEaXIiLCJjb25maWciLCJhbGwiLCJyb3V0ZVByZWZpeCIsIm5vU2VjdXJpdHlIZWFkZXJzUm91dGVzIiwiaHRtbE9ubHlNaWRkbGV3YXJlIiwicG9zdEZ1bmMiLCJjdHgiLCJfIiwicGF0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY3NwQ29uZmlnIiwiY3NwIiwicHJlRnVuYyIsInN0YXRlIiwibm9uY2UiLCJwb2xpY3kiLCJuZXh0IiwicmVzcG9uc2UiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFOQTtBQVFPLFNBQVNBLGNBQVQsQ0FBd0JDLE1BQXhCLEVBQThDO0FBQ25EQSxFQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBVyxzREFBd0JELE1BQXhCLENBQVgsRUFEbUQsQ0FHbkQ7O0FBQ0EsUUFBTUUsU0FBUyxHQUNaRixNQUFNLENBQUNHLE1BQVAsSUFBaUJILE1BQU0sQ0FBQ0csTUFBUCxDQUFjSCxNQUEvQixJQUF5Q0EsTUFBTSxDQUFDRyxNQUFQLENBQWNILE1BQWQsQ0FBcUJFLFNBQS9ELElBQ0EsTUFGRjtBQUdBRixFQUFBQSxNQUFNLENBQUNJLEdBQVAsQ0FDRSxjQURGLEVBRUUsT0FGRixFQUdFLDhCQUFZRixTQUFaLEVBQXVCO0FBQ3JCRyxJQUFBQSxXQUFXLEVBQUVMLE1BQU0sQ0FBQ0csTUFBUCxDQUFjSCxNQUFkLENBQXFCSztBQURiLEdBQXZCLENBSEY7QUFRQUwsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVcsNkJBQVg7QUFDQUQsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVcsc0RBQXdCRCxNQUF4QixDQUFYO0FBRUFBLEVBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXLG9DQUFlRCxNQUFmLENBQVg7QUFDQUEsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVcsa0NBQWNELE1BQWQsQ0FBWDtBQUNBLDBDQUFtQkEsTUFBbkI7QUFDQUEsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVcsd0RBQXlCRCxNQUF6QixDQUFYLEVBckJtRCxDQXVCbkQ7O0FBQ0EsUUFBTTtBQUFFTSxJQUFBQTtBQUFGLE1BQThCTixNQUFNLENBQUNHLE1BQVAsQ0FBY0gsTUFBbEQsQ0F4Qm1ELENBeUJuRDs7QUFDQUEsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQ0VNLGtCQUFrQixDQUFDO0FBQ2pCQyxJQUFBQSxRQUFRLEVBQUUsT0FBT0MsR0FBUCxFQUFxQkMsQ0FBckIsS0FBaUM7QUFDekMsVUFBSSxxQ0FBZ0JKLHVCQUFoQixFQUF5Q0csR0FBRyxDQUFDRSxJQUE3QyxDQUFKLEVBQXdEO0FBQ3REO0FBQ0Q7O0FBQ0QsWUFBTSwwQkFBU0YsR0FBVCxFQUFjLE1BQU1HLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixJQUFoQixDQUFwQixDQUFOO0FBQ0Q7QUFOZ0IsR0FBRCxDQURwQjtBQVVBLFFBQU1DLFNBQVMsR0FBR2QsTUFBTSxDQUFDRyxNQUFQLENBQWNZLEdBQWhDOztBQUNBLE1BQUlELFNBQUosRUFBZTtBQUNiZCxJQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FDRU0sa0JBQWtCLENBQUM7QUFDakJTLE1BQUFBLE9BQU8sRUFBRSxNQUFPUCxHQUFQLElBQWU7QUFDdEJBLFFBQUFBLEdBQUcsQ0FBQ1EsS0FBSixDQUFVQyxLQUFWLEdBQWtCLGVBQWxCO0FBQ0QsT0FIZ0I7QUFJakJWLE1BQUFBLFFBQVEsRUFBRSxNQUFPQyxHQUFQLElBQWU7QUFDdkIsWUFBSSxxQ0FBZ0JILHVCQUFoQixFQUF5Q0csR0FBRyxDQUFDRSxJQUE3QyxDQUFKLEVBQXdEO0FBQ3REO0FBQ0Q7O0FBQ0QsY0FBTSxrQkFBSTtBQUNSUSxVQUFBQSxNQUFNLEVBQUUsRUFDTixHQUFHTCxTQURHO0FBRU4sMEJBQWMsQ0FDWixHQUFHQSxTQUFTLENBQUMsWUFBRCxDQURBLEVBRVhMLEdBQUQsSUFBa0I7QUFDaEIscUJBQVEsVUFBU0EsR0FBRyxDQUFDUSxLQUFKLENBQVVDLEtBQU0sR0FBakM7QUFDRCxhQUpXO0FBRlI7QUFEQSxTQUFKLEVBVUhULEdBVkcsRUFVRSxNQUFNLElBVlIsQ0FBTjtBQVdEO0FBbkJnQixLQUFELENBRHBCO0FBdUJEO0FBQ0Y7O0FBRUQsU0FBU0Ysa0JBQVQsQ0FBNEI7QUFDMUJTLEVBQUFBLE9BQU8sR0FBRyxNQUFNLElBRFU7QUFFMUJSLEVBQUFBLFFBQVEsR0FBRyxNQUFNO0FBRlMsQ0FBNUIsRUFNZTtBQUNiLFNBQU8sT0FBT0MsR0FBUCxFQUFxQlcsSUFBckIsS0FBb0M7QUFDekMsVUFBTUosT0FBTyxDQUFDUCxHQUFELEVBQU1XLElBQU4sQ0FBYjtBQUNBLFVBQU1BLElBQUksRUFBVjs7QUFDQSxRQUFJWCxHQUFHLENBQUNZLFFBQUosQ0FBYUMsSUFBYixLQUFzQixXQUExQixFQUF1QztBQUNyQyxZQUFNZCxRQUFRLENBQUNDLEdBQUQsRUFBTVcsSUFBTixDQUFkO0FBQ0Q7QUFDRixHQU5EO0FBT0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYm9keVBhcnNlciBmcm9tIFwia29hLWJvZHlwYXJzZXJcIjtcbmltcG9ydCBoZWxtZXQgZnJvbSBcImtvYS1oZWxtZXRcIjtcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgeyBpc29SZWFjdFJlbmRlck1pZGRsZXdhcmUgfSBmcm9tIFwiLi4vaXNvLXJlYWN0LXJlbmRlci9pc28tcmVhY3QtcmVuZGVyLW1pZGRsZXdhcmVcIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi9zZXJ2ZXJcIjtcbmltcG9ydCB7IENvbnRleHQsIE1pZGRsZXdhcmUsIE5leHQgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IGNvb2tpZVNlc3Npb25NaWRkbGV3YXJlIH0gZnJvbSBcIi4vY29va2llLXNlc3Npb24tbWlkZGxld2FyZVwiO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGNzcCBmcm9tIFwiLi9jc3AvY3NwXCI7XG5pbXBvcnQgeyBjc3JmTWlkZGxld2FyZSwgaXNQcmVmaXhNYXRjaGVkIH0gZnJvbSBcIi4vY3NyZi1taWRkbGV3YXJlXCI7XG5pbXBvcnQgeyBpbml0STE4bk1pZGRsZXdhcmUgfSBmcm9tIFwiLi9pMThuLW1pZGRsZXdhcmVcIjtcbmltcG9ydCB7IHN0YXRpY1NlcnZlIH0gZnJvbSBcIi4vc3RhdGljLXNlcnZlXCI7XG5pbXBvcnQgeyB1bmNhdWdodEVycm9yTWlkZGxld2FyZSB9IGZyb20gXCIuL3VuY2F1Z2h0LWVycm9yLW1pZGRsZXdhcmVcIjtcbmltcG9ydCB7IHZpZXdCYXNlU3RhdGUgfSBmcm9tIFwiLi92aWV3LWJhc2Utc3RhdGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRNaWRkbGV3YXJlKHNlcnZlcjogU2VydmVyKTogdm9pZCB7XG4gIHNlcnZlci51c2UodW5jYXVnaHRFcnJvck1pZGRsZXdhcmUoc2VydmVyKSk7XG5cbiAgLy8gU3RhdGljIGZpbGUgc2VydmluZ1xuICBjb25zdCBzdGF0aWNEaXIgPVxuICAgIChzZXJ2ZXIuY29uZmlnICYmIHNlcnZlci5jb25maWcuc2VydmVyICYmIHNlcnZlci5jb25maWcuc2VydmVyLnN0YXRpY0RpcikgfHxcbiAgICBcImRpc3RcIjtcbiAgc2VydmVyLmFsbChcbiAgICBcInNlcnZlLXN0YXRpY1wiLFxuICAgIFwiLyguKilcIixcbiAgICBzdGF0aWNTZXJ2ZShzdGF0aWNEaXIsIHtcbiAgICAgIHJvdXRlUHJlZml4OiBzZXJ2ZXIuY29uZmlnLnNlcnZlci5yb3V0ZVByZWZpeCxcbiAgICB9KVxuICApO1xuXG4gIHNlcnZlci51c2UoYm9keVBhcnNlcigpKTtcbiAgc2VydmVyLnVzZShjb29raWVTZXNzaW9uTWlkZGxld2FyZShzZXJ2ZXIpKTtcblxuICBzZXJ2ZXIudXNlKGNzcmZNaWRkbGV3YXJlKHNlcnZlcikpO1xuICBzZXJ2ZXIudXNlKHZpZXdCYXNlU3RhdGUoc2VydmVyKSk7XG4gIGluaXRJMThuTWlkZGxld2FyZShzZXJ2ZXIpO1xuICBzZXJ2ZXIudXNlKGlzb1JlYWN0UmVuZGVyTWlkZGxld2FyZShzZXJ2ZXIpKTtcblxuICAvLyBzZWN1cml0eSBoZWFkZXJzXG4gIGNvbnN0IHsgbm9TZWN1cml0eUhlYWRlcnNSb3V0ZXMgfSA9IHNlcnZlci5jb25maWcuc2VydmVyO1xuICAvLyBAdHMtaWdub3JlXG4gIHNlcnZlci51c2UoXG4gICAgaHRtbE9ubHlNaWRkbGV3YXJlKHtcbiAgICAgIHBvc3RGdW5jOiBhc3luYyAoY3R4OiBDb250ZXh0LCBfOiBOZXh0KSA9PiB7XG4gICAgICAgIGlmIChpc1ByZWZpeE1hdGNoZWQobm9TZWN1cml0eUhlYWRlcnNSb3V0ZXMsIGN0eC5wYXRoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBoZWxtZXQoKShjdHgsICgpID0+IFByb21pc2UucmVzb2x2ZShudWxsKSk7XG4gICAgICB9LFxuICAgIH0pXG4gICk7XG4gIGNvbnN0IGNzcENvbmZpZyA9IHNlcnZlci5jb25maWcuY3NwO1xuICBpZiAoY3NwQ29uZmlnKSB7XG4gICAgc2VydmVyLnVzZShcbiAgICAgIGh0bWxPbmx5TWlkZGxld2FyZSh7XG4gICAgICAgIHByZUZ1bmM6IGFzeW5jIChjdHgpID0+IHtcbiAgICAgICAgICBjdHguc3RhdGUubm9uY2UgPSB1dWlkdjQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdEZ1bmM6IGFzeW5jIChjdHgpID0+IHtcbiAgICAgICAgICBpZiAoaXNQcmVmaXhNYXRjaGVkKG5vU2VjdXJpdHlIZWFkZXJzUm91dGVzLCBjdHgucGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgY3NwKHtcbiAgICAgICAgICAgIHBvbGljeToge1xuICAgICAgICAgICAgICAuLi5jc3BDb25maWcsXG4gICAgICAgICAgICAgIFwic2NyaXB0LXNyY1wiOiBbXG4gICAgICAgICAgICAgICAgLi4uY3NwQ29uZmlnW1wic2NyaXB0LXNyY1wiXSxcbiAgICAgICAgICAgICAgICAoY3R4OiBDb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYCdub25jZS0ke2N0eC5zdGF0ZS5ub25jZX0nYDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KShjdHgsICgpID0+IG51bGwpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGh0bWxPbmx5TWlkZGxld2FyZSh7XG4gIHByZUZ1bmMgPSAoKSA9PiBudWxsLFxuICBwb3N0RnVuYyA9ICgpID0+IG51bGwsXG59OiB7XG4gIHByZUZ1bmM/OiBNaWRkbGV3YXJlO1xuICBwb3N0RnVuYz86IE1pZGRsZXdhcmU7XG59KTogTWlkZGxld2FyZSB7XG4gIHJldHVybiBhc3luYyAoY3R4OiBDb250ZXh0LCBuZXh0OiBOZXh0KSA9PiB7XG4gICAgYXdhaXQgcHJlRnVuYyhjdHgsIG5leHQpO1xuICAgIGF3YWl0IG5leHQoKTtcbiAgICBpZiAoY3R4LnJlc3BvbnNlLnR5cGUgPT09IFwidGV4dC9odG1sXCIpIHtcbiAgICAgIGF3YWl0IHBvc3RGdW5jKGN0eCwgbmV4dCk7XG4gICAgfVxuICB9O1xufVxuIl19
