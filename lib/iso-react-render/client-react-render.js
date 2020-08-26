"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.clientReactRender = clientReactRender;
exports.STYLETRON_GLOBAL = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _get = _interopRequireDefault(require("safe-json-globals/get"));

var _styletronEngineAtomic = require("styletron-engine-atomic");

var _assetUrl = require("../asset-url");

var _isoI18n = require("../iso-i18n");

var _configureStore = require("./root/configure-store");

var _rootBrowser = require("./root/root-browser");

var _rootReducer = require("./root/root-reducer");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// @ts-ignore
// @ts-ignore
const STYLETRON_GLOBAL = "styletron-global";
exports.STYLETRON_GLOBAL = STYLETRON_GLOBAL;

function clientReactRender({ reducer = _rootReducer.noopReducer, VDom }) {
  const store = (0, _configureStore.configureStore)(
    (0, _get.default)("state"),
    reducer
  );
  const {
    translations,
    manifest,
    routePrefix,
    cdnBase,
  } = store.getState().base;
  (0, _isoI18n.initClientI18n)(translations);
  (0, _assetUrl.initAssetURL)(manifest, routePrefix, cdnBase);
  const stylesheets = document.getElementsByClassName(STYLETRON_GLOBAL);
  const styletron = new _styletronEngineAtomic.Client({
    hydrate: stylesheets,
    prefix: "_",
  });
  (0, _reactDom.render)(
    /*#__PURE__*/ _react.default.createElement(
      _rootBrowser.RootBrowser,
      {
        store: store,
        styletron: styletron,
        routePrefix: routePrefix,
      },
      VDom
    ),
    document.getElementById("root")
  );
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pc28tcmVhY3QtcmVuZGVyL2NsaWVudC1yZWFjdC1yZW5kZXIudHN4Il0sIm5hbWVzIjpbIlNUWUxFVFJPTl9HTE9CQUwiLCJjbGllbnRSZWFjdFJlbmRlciIsInJlZHVjZXIiLCJub29wUmVkdWNlciIsIlZEb20iLCJzdG9yZSIsInRyYW5zbGF0aW9ucyIsIm1hbmlmZXN0Iiwicm91dGVQcmVmaXgiLCJjZG5CYXNlIiwiZ2V0U3RhdGUiLCJiYXNlIiwic3R5bGVzaGVldHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzdHlsZXRyb24iLCJTdHlsZXRyb25DbGllbnQiLCJoeWRyYXRlIiwicHJlZml4IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFSQTtBQUVBO0FBUU8sTUFBTUEsZ0JBQWdCLEdBQUcsa0JBQXpCOzs7QUFPQSxTQUFTQyxpQkFBVCxDQUEyQjtBQUFFQyxFQUFBQSxPQUFPLEdBQUdDLHdCQUFaO0FBQXlCQyxFQUFBQTtBQUF6QixDQUEzQixFQUF3RTtBQUM3RSxRQUFNQyxLQUFLLEdBQUcsb0NBQWUsa0JBQVksT0FBWixDQUFmLEVBQXFDSCxPQUFyQyxDQUFkO0FBQ0EsUUFBTTtBQUNKSSxJQUFBQSxZQURJO0FBRUpDLElBQUFBLFFBRkk7QUFHSkMsSUFBQUEsV0FISTtBQUlKQyxJQUFBQTtBQUpJLE1BS0ZKLEtBQUssQ0FBQ0ssUUFBTixHQUFpQkMsSUFMckI7QUFPQSwrQkFBZUwsWUFBZjtBQUNBLDhCQUFhQyxRQUFiLEVBQXVCQyxXQUF2QixFQUFvQ0MsT0FBcEM7QUFDQSxRQUFNRyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0NkLGdCQUFoQyxDQUFwQjtBQUNBLFFBQU1lLFNBQVMsR0FBRyxJQUFJQyw2QkFBSixDQUFvQjtBQUFFQyxJQUFBQSxPQUFPLEVBQUVMLFdBQVg7QUFBd0JNLElBQUFBLE1BQU0sRUFBRTtBQUFoQyxHQUFwQixDQUFsQjtBQUVBLHNDQUNFLDZCQUFDLHdCQUFEO0FBQWEsSUFBQSxLQUFLLEVBQUViLEtBQXBCO0FBQTJCLElBQUEsU0FBUyxFQUFFVSxTQUF0QztBQUFpRCxJQUFBLFdBQVcsRUFBRVA7QUFBOUQsS0FDR0osSUFESCxDQURGLEVBSUVTLFFBQVEsQ0FBQ00sY0FBVCxDQUF3QixNQUF4QixDQUpGO0FBTUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBSZWR1Y2VyIH0gZnJvbSBcInJlZHV4XCI7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgSlNPTkdsb2JhbHMgZnJvbSBcInNhZmUtanNvbi1nbG9iYWxzL2dldFwiO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgQ2xpZW50IGFzIFN0eWxldHJvbkNsaWVudCB9IGZyb20gXCJzdHlsZXRyb24tZW5naW5lLWF0b21pY1wiO1xuaW1wb3J0IHsgaW5pdEFzc2V0VVJMIH0gZnJvbSBcIi4uL2Fzc2V0LXVybFwiO1xuaW1wb3J0IHsgaW5pdENsaWVudEkxOG4gfSBmcm9tIFwiLi4vaXNvLWkxOG5cIjtcbmltcG9ydCB7IGNvbmZpZ3VyZVN0b3JlIH0gZnJvbSBcIi4vcm9vdC9jb25maWd1cmUtc3RvcmVcIjtcbmltcG9ydCB7IFJvb3RCcm93c2VyIH0gZnJvbSBcIi4vcm9vdC9yb290LWJyb3dzZXJcIjtcbmltcG9ydCB7IG5vb3BSZWR1Y2VyIH0gZnJvbSBcIi4vcm9vdC9yb290LXJlZHVjZXJcIjtcblxuZXhwb3J0IGNvbnN0IFNUWUxFVFJPTl9HTE9CQUwgPSBcInN0eWxldHJvbi1nbG9iYWxcIjtcblxudHlwZSBPcHRzID0ge1xuICByZWR1Y2VyOiBSZWR1Y2VyO1xuICBWRG9tOiBKU1guRWxlbWVudDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGllbnRSZWFjdFJlbmRlcih7IHJlZHVjZXIgPSBub29wUmVkdWNlciwgVkRvbSB9OiBPcHRzKTogdm9pZCB7XG4gIGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoSlNPTkdsb2JhbHMoXCJzdGF0ZVwiKSwgcmVkdWNlcik7XG4gIGNvbnN0IHtcbiAgICB0cmFuc2xhdGlvbnMsXG4gICAgbWFuaWZlc3QsXG4gICAgcm91dGVQcmVmaXgsXG4gICAgY2RuQmFzZVxuICB9ID0gc3RvcmUuZ2V0U3RhdGUoKS5iYXNlO1xuXG4gIGluaXRDbGllbnRJMThuKHRyYW5zbGF0aW9ucyk7XG4gIGluaXRBc3NldFVSTChtYW5pZmVzdCwgcm91dGVQcmVmaXgsIGNkbkJhc2UpO1xuICBjb25zdCBzdHlsZXNoZWV0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoU1RZTEVUUk9OX0dMT0JBTCk7XG4gIGNvbnN0IHN0eWxldHJvbiA9IG5ldyBTdHlsZXRyb25DbGllbnQoeyBoeWRyYXRlOiBzdHlsZXNoZWV0cywgcHJlZml4OiBcIl9cIiB9KTtcblxuICByZW5kZXIoXG4gICAgPFJvb3RCcm93c2VyIHN0b3JlPXtzdG9yZX0gc3R5bGV0cm9uPXtzdHlsZXRyb259IHJvdXRlUHJlZml4PXtyb3V0ZVByZWZpeH0+XG4gICAgICB7VkRvbX1cbiAgICA8L1Jvb3RCcm93c2VyPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgKTtcbn1cbiJdfQ==
