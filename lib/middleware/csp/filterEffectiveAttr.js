"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = _default;
exports.effectiveAttr = void 0;
// 有效的安全策略命名
const effectiveAttr = [
  "default-src",
  "child-src",
  "connect-src",
  "font-src",
  "frame-src",
  "img-src",
  "manifest-src",
  "media-src",
  "object-src",
  "script-src",
  "style-src",
  "worker-src",
  "block-all-mixed-content",
];
/**
 * @desc 过滤无效安全策略并格式化
 *       有效策略命名参照 effectiveAttr
 *
 * @return {Array} exp. [['default-src', 'self'], ['img-src', 'self']]
 */

exports.effectiveAttr = effectiveAttr;

function _default(policy, ctx) {
  return effectiveAttr
    .filter((attr) => Boolean(policy[attr]))
    .map((attr) => [
      attr,
      ...policy[attr].map((item) => {
        if (typeof item === "function") {
          return item(ctx);
        }

        return item;
      }),
    ]);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL2NzcC9maWx0ZXJFZmZlY3RpdmVBdHRyLmpzIl0sIm5hbWVzIjpbImVmZmVjdGl2ZUF0dHIiLCJwb2xpY3kiLCJjdHgiLCJmaWx0ZXIiLCJhdHRyIiwiQm9vbGVhbiIsIm1hcCIsIml0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNPLE1BQU1BLGFBQWEsR0FBRyxDQUMzQixhQUQyQixFQUUzQixXQUYyQixFQUczQixhQUgyQixFQUkzQixVQUoyQixFQUszQixXQUwyQixFQU0zQixTQU4yQixFQU8zQixjQVAyQixFQVEzQixXQVIyQixFQVMzQixZQVQyQixFQVUzQixZQVYyQixFQVczQixXQVgyQixFQVkzQixZQVoyQixFQWEzQix5QkFiMkIsQ0FBdEI7QUFnQlA7Ozs7Ozs7OztBQU1lLGtCQUFTQyxNQUFULEVBQWlCQyxHQUFqQixFQUFzQjtBQUNuQyxTQUFPRixhQUFhLENBQUNHLE1BQWQsQ0FBcUJDLElBQUksSUFBSUMsT0FBTyxDQUFDSixNQUFNLENBQUNHLElBQUQsQ0FBUCxDQUFwQyxFQUNKRSxHQURJLENBQ0FGLElBQUksSUFBSSxDQUFDQSxJQUFELEVBQU8sR0FBR0gsTUFBTSxDQUFDRyxJQUFELENBQU4sQ0FBYUUsR0FBYixDQUFpQkMsSUFBSSxJQUFJO0FBQzlDLFFBQUksT0FBT0EsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QixhQUFPQSxJQUFJLENBQUNMLEdBQUQsQ0FBWDtBQUNEOztBQUNELFdBQU9LLElBQVA7QUFDRCxHQUxzQixDQUFWLENBRFIsQ0FBUDtBQU9EIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5pyJ5pWI55qE5a6J5YWo562W55Wl5ZG95ZCNXG5leHBvcnQgY29uc3QgZWZmZWN0aXZlQXR0ciA9IFtcbiAgJ2RlZmF1bHQtc3JjJyxcbiAgJ2NoaWxkLXNyYycsXG4gICdjb25uZWN0LXNyYycsXG4gICdmb250LXNyYycsXG4gICdmcmFtZS1zcmMnLFxuICAnaW1nLXNyYycsXG4gICdtYW5pZmVzdC1zcmMnLFxuICAnbWVkaWEtc3JjJyxcbiAgJ29iamVjdC1zcmMnLFxuICAnc2NyaXB0LXNyYycsXG4gICdzdHlsZS1zcmMnLFxuICAnd29ya2VyLXNyYycsXG4gICdibG9jay1hbGwtbWl4ZWQtY29udGVudCcsXG5dO1xuXG4vKipcbiAqIEBkZXNjIOi/h+a7pOaXoOaViOWuieWFqOetlueVpeW5tuagvOW8j+WMllxuICogICAgICAg5pyJ5pWI562W55Wl5ZG95ZCN5Y+C54WnIGVmZmVjdGl2ZUF0dHJcbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gZXhwLiBbWydkZWZhdWx0LXNyYycsICdzZWxmJ10sIFsnaW1nLXNyYycsICdzZWxmJ11dXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBvbGljeSwgY3R4KSB7XG4gIHJldHVybiBlZmZlY3RpdmVBdHRyLmZpbHRlcihhdHRyID0+IEJvb2xlYW4ocG9saWN5W2F0dHJdKSlcbiAgICAubWFwKGF0dHIgPT4gW2F0dHIsIC4uLnBvbGljeVthdHRyXS5tYXAoaXRlbSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0oY3R4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pXSk7XG59XG4iXX0=
