"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.lazyLoad = lazyLoad;

var _loadScript = _interopRequireDefault(require("load-script"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// @ts-ignore
let loaded = false;

function lazyLoad(script, cb) {
  if (loaded) {
    cb();
    return;
  }

  (0, _loadScript.default)(script, () => {
    loaded = true;
    cb();
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sYXp5bG9hZC50cyJdLCJuYW1lcyI6WyJsb2FkZWQiLCJsYXp5TG9hZCIsInNjcmlwdCIsImNiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFEQTtBQUdBLElBQUlBLE1BQU0sR0FBRyxLQUFiOztBQUVPLFNBQVNDLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQWtDQyxFQUFsQyxFQUFzRDtBQUMzRCxNQUFJSCxNQUFKLEVBQVk7QUFDVkcsSUFBQUEsRUFBRTtBQUNGO0FBQ0Q7O0FBRUQsMkJBQVdELE1BQVgsRUFBbUIsTUFBTTtBQUN2QkYsSUFBQUEsTUFBTSxHQUFHLElBQVQ7QUFDQUcsSUFBQUEsRUFBRTtBQUNILEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1pZ25vcmVcbmltcG9ydCBsb2FkU2NyaXB0IGZyb20gXCJsb2FkLXNjcmlwdFwiO1xuXG5sZXQgbG9hZGVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXp5TG9hZChzY3JpcHQ6IHN0cmluZywgY2I6IEZ1bmN0aW9uKTogdm9pZCB7XG4gIGlmIChsb2FkZWQpIHtcbiAgICBjYigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvYWRTY3JpcHQoc2NyaXB0LCAoKSA9PiB7XG4gICAgbG9hZGVkID0gdHJ1ZTtcbiAgICBjYigpO1xuICB9KTtcbn1cbiJdfQ==
