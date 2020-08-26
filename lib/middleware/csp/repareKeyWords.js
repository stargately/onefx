"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = _default;
const keyWords = ["none", "self", "unsafe-inline", "unsafe-eval"]; // 修复字符串self的书写问题 "self" => "'self'"

function _default(str) {
  return keyWords.includes(str) ? `'${str}'` : str;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL2NzcC9yZXBhcmVLZXlXb3Jkcy5qcyJdLCJuYW1lcyI6WyJrZXlXb3JkcyIsInN0ciIsImluY2x1ZGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNQSxRQUFRLEdBQUcsQ0FDZixNQURlLEVBRWYsTUFGZSxFQUdmLGVBSGUsRUFJZixhQUplLENBQWpCLEMsQ0FPQTs7QUFDZSxrQkFBU0MsR0FBVCxFQUFjO0FBQzNCLFNBQU9ELFFBQVEsQ0FBQ0UsUUFBVCxDQUFrQkQsR0FBbEIsSUFBMEIsSUFBR0EsR0FBSSxHQUFqQyxHQUFzQ0EsR0FBN0M7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGtleVdvcmRzID0gW1xuICAnbm9uZScsXG4gICdzZWxmJyxcbiAgJ3Vuc2FmZS1pbmxpbmUnLFxuICAndW5zYWZlLWV2YWwnLFxuXTtcblxuLy8g5L+u5aSN5a2X56ym5Liyc2VsZueahOS5puWGmemXrumimCBcInNlbGZcIiA9PiBcIidzZWxmJ1wiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdHIpIHtcbiAgcmV0dXJuIGtleVdvcmRzLmluY2x1ZGVzKHN0cikgPyBgJyR7c3RyfSdgIDogc3RyO1xufVxuIl19
