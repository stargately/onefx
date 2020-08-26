"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = _default;

var _effectiveAttrValidator = _interopRequireDefault(
  require("./effectiveAttrValidator")
);

var _filterEffectiveAttr = _interopRequireWildcard(
  require("./filterEffectiveAttr")
);

var _repareKeyWords = _interopRequireDefault(require("./repareKeyWords"));

var log = _interopRequireWildcard(require("./log"));

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @desc 生成一条策略的字符串
 *
 * @return {String} 'default-src self'
 */
function generateSubPolicyStr(policy) {
  return policy.map(_repareKeyWords.default).join(" ");
} // 默认配置-只允许该域名下内容

const defaultParams = {
  // 是否显示警告信息
  enableWarn: true,
  policy: {
    "default-src": ["self"],
  },
};

function validatorPolicy(policy) {
  if (Object.keys(policy).length === 0) {
    log.warn("⚠️CSP CONFIG WARNING: Empty Policy");
  }

  (0, _effectiveAttrValidator.default)(
    policy,
    _filterEffectiveAttr.effectiveAttr,
    (invalidAttrs) => {
      log.warn(
        `⚠️CSP CONFIG WARNING: Invalid Policy Name[${invalidAttrs.join(", ")}]`
      );
    }
  );
}
/**
 * @desc 设置响应头 Content-Security-Policy
 *
 * @param customPolicy {Object} 自定义安全策略 exp. { 'img-src': ['self'] };
 */

function _default({ enableWarn = true, policy = {} } = defaultParams) {
  return async (ctx, next) => {
    // Warn invalid Policy Setting
    if (enableWarn) {
      validatorPolicy(policy);
    } // generate http header string

    const policyStr = (0, _filterEffectiveAttr.default)(policy, ctx)
      .map(generateSubPolicyStr)
      .join(";");
    ctx.set("Content-Security-Policy", policyStr);
    await next();
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL2NzcC9jc3AuanMiXSwibmFtZXMiOlsiZ2VuZXJhdGVTdWJQb2xpY3lTdHIiLCJwb2xpY3kiLCJtYXAiLCJyZXBhcmVLZXlXb3JkcyIsImpvaW4iLCJkZWZhdWx0UGFyYW1zIiwiZW5hYmxlV2FybiIsInZhbGlkYXRvclBvbGljeSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJsb2ciLCJ3YXJuIiwiZWZmZWN0aXZlQXR0ciIsImludmFsaWRBdHRycyIsImN0eCIsIm5leHQiLCJwb2xpY3lTdHIiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7QUFLQSxTQUFTQSxvQkFBVCxDQUE4QkMsTUFBOUIsRUFBc0M7QUFDcEMsU0FBT0EsTUFBTSxDQUFDQyxHQUFQLENBQVdDLHVCQUFYLEVBQTJCQyxJQUEzQixDQUFnQyxHQUFoQyxDQUFQO0FBQ0QsQyxDQUVEOzs7QUFDQSxNQUFNQyxhQUFhLEdBQUc7QUFDcEI7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLElBRlE7QUFHcEJMLEVBQUFBLE1BQU0sRUFBRTtBQUNOLG1CQUFlLENBQUMsTUFBRDtBQURUO0FBSFksQ0FBdEI7O0FBUUEsU0FBU00sZUFBVCxDQUF5Qk4sTUFBekIsRUFBaUM7QUFDL0IsTUFBSU8sTUFBTSxDQUFDQyxJQUFQLENBQVlSLE1BQVosRUFBb0JTLE1BQXBCLEtBQStCLENBQW5DLEVBQXNDO0FBQ3BDQyxJQUFBQSxHQUFHLENBQUNDLElBQUosQ0FBUyxvQ0FBVDtBQUNEOztBQUVELHVDQUF1QlgsTUFBdkIsRUFBK0JZLGtDQUEvQixFQUE4Q0MsWUFBWSxJQUFJO0FBQzVESCxJQUFBQSxHQUFHLENBQUNDLElBQUosQ0FBVSw2Q0FBNENFLFlBQVksQ0FBQ1YsSUFBYixDQUFrQixJQUFsQixDQUF3QixHQUE5RTtBQUNELEdBRkQ7QUFHRDtBQUVEOzs7Ozs7O0FBS2Usa0JBQVM7QUFBQ0UsRUFBQUEsVUFBVSxHQUFHLElBQWQ7QUFBb0JMLEVBQUFBLE1BQU0sR0FBRztBQUE3QixJQUFtQ0ksYUFBNUMsRUFBMkQ7QUFDeEUsU0FBTyxPQUFNVSxHQUFOLEVBQVdDLElBQVgsS0FBb0I7QUFDekI7QUFDQSxRQUFJVixVQUFKLEVBQWdCO0FBQ2RDLE1BQUFBLGVBQWUsQ0FBQ04sTUFBRCxDQUFmO0FBQ0QsS0FKd0IsQ0FNekI7OztBQUNBLFVBQU1nQixTQUFTLEdBQUcsa0NBQW9CaEIsTUFBcEIsRUFBNEJjLEdBQTVCLEVBQ2ZiLEdBRGUsQ0FDWEYsb0JBRFcsRUFFZkksSUFGZSxDQUVWLEdBRlUsQ0FBbEI7QUFJQVcsSUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVEseUJBQVIsRUFBbUNELFNBQW5DO0FBQ0EsVUFBTUQsSUFBSSxFQUFWO0FBQ0QsR0FiRDtBQWNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVmZmVjdGl2ZUF0dHJWYWxpZGF0b3IgZnJvbSAnLi9lZmZlY3RpdmVBdHRyVmFsaWRhdG9yJztcbmltcG9ydCBmaWx0ZXJFZmZlY3RpdmVBdHRyLCB7ZWZmZWN0aXZlQXR0cn0gZnJvbSAnLi9maWx0ZXJFZmZlY3RpdmVBdHRyJztcbmltcG9ydCByZXBhcmVLZXlXb3JkcyBmcm9tICcuL3JlcGFyZUtleVdvcmRzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuL2xvZyc7XG5cbi8qKlxuICogQGRlc2Mg55Sf5oiQ5LiA5p2h562W55Wl55qE5a2X56ym5LiyXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSAnZGVmYXVsdC1zcmMgc2VsZidcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVTdWJQb2xpY3lTdHIocG9saWN5KSB7XG4gIHJldHVybiBwb2xpY3kubWFwKHJlcGFyZUtleVdvcmRzKS5qb2luKCcgJyk7XG59XG5cbi8vIOm7mOiupOmFjee9ri3lj6rlhYHorrjor6Xln5/lkI3kuIvlhoXlrrlcbmNvbnN0IGRlZmF1bHRQYXJhbXMgPSB7XG4gIC8vIOaYr+WQpuaYvuekuuitpuWRiuS/oeaBr1xuICBlbmFibGVXYXJuOiB0cnVlLFxuICBwb2xpY3k6IHtcbiAgICAnZGVmYXVsdC1zcmMnOiBbJ3NlbGYnXSxcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIHZhbGlkYXRvclBvbGljeShwb2xpY3kpIHtcbiAgaWYgKE9iamVjdC5rZXlzKHBvbGljeSkubGVuZ3RoID09PSAwKSB7XG4gICAgbG9nLndhcm4oJ+KaoO+4j0NTUCBDT05GSUcgV0FSTklORzogRW1wdHkgUG9saWN5Jyk7XG4gIH1cblxuICBlZmZlY3RpdmVBdHRyVmFsaWRhdG9yKHBvbGljeSwgZWZmZWN0aXZlQXR0ciwgaW52YWxpZEF0dHJzID0+IHtcbiAgICBsb2cud2Fybihg4pqg77iPQ1NQIENPTkZJRyBXQVJOSU5HOiBJbnZhbGlkIFBvbGljeSBOYW1lWyR7aW52YWxpZEF0dHJzLmpvaW4oJywgJyl9XWApO1xuICB9KTtcbn1cblxuLyoqXG4gKiBAZGVzYyDorr7nva7lk43lupTlpLQgQ29udGVudC1TZWN1cml0eS1Qb2xpY3lcbiAqXG4gKiBAcGFyYW0gY3VzdG9tUG9saWN5IHtPYmplY3R9IOiHquWumuS5ieWuieWFqOetlueVpSBleHAuIHsgJ2ltZy1zcmMnOiBbJ3NlbGYnXSB9O1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih7ZW5hYmxlV2FybiA9IHRydWUsIHBvbGljeSA9IHt9fSA9IGRlZmF1bHRQYXJhbXMpIHtcbiAgcmV0dXJuIGFzeW5jKGN0eCwgbmV4dCkgPT4ge1xuICAgIC8vIFdhcm4gaW52YWxpZCBQb2xpY3kgU2V0dGluZ1xuICAgIGlmIChlbmFibGVXYXJuKSB7XG4gICAgICB2YWxpZGF0b3JQb2xpY3kocG9saWN5KTtcbiAgICB9XG5cbiAgICAvLyBnZW5lcmF0ZSBodHRwIGhlYWRlciBzdHJpbmdcbiAgICBjb25zdCBwb2xpY3lTdHIgPSBmaWx0ZXJFZmZlY3RpdmVBdHRyKHBvbGljeSwgY3R4KVxuICAgICAgLm1hcChnZW5lcmF0ZVN1YlBvbGljeVN0cilcbiAgICAgIC5qb2luKCc7Jyk7XG5cbiAgICBjdHguc2V0KCdDb250ZW50LVNlY3VyaXR5LVBvbGljeScsIHBvbGljeVN0cik7XG4gICAgYXdhaXQgbmV4dCgpO1xuICB9O1xufVxuIl19
