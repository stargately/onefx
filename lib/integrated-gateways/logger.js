"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createLogger = createLogger;
exports.logger = void 0;

var _jsonStringifySafe = _interopRequireDefault(require("json-stringify-safe"));

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const defaultCfg = {
  level: "info",
}; // tslint:disable-next-line:no-object-literal-type-assertion

let logger = {
  ...console,
  // tslint:disable-next-line:no-console
  debug: console.log,
};
exports.logger = logger;

const myFormat = _winston.default.format.printf((info) => {
  const { timestamp, label, level, message, meta } = info;
  let metaStr = "";

  if (meta) {
    metaStr = ` - ${(0, _jsonStringifySafe.default)(meta)}`;
  }

  return `${timestamp} [${label}] ${level}: ${message}${metaStr}`;
});

function createLogger(cfg) {
  const c = { ...defaultCfg, ...cfg };
  const transports = [
    new _winston.default.transports.Console({
      ...(process.env.NODE_ENV !== "production"
        ? {
            format: _winston.default.format.combine(
              _winston.default.format.colorize(),
              _winston.default.format.simple(),
              myFormat
            ),
          }
        : {}),
    }),
  ];
  exports.logger = logger = _winston.default.createLogger({
    format: _winston.default.format.combine(
      _winston.default.format.label({
        label: "server",
      }),
      _winston.default.format.json(),
      _winston.default.format.timestamp()
    ),
    level: c.level,
    transports,
  });
  return logger;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlZ3JhdGVkLWdhdGV3YXlzL2xvZ2dlci50cyJdLCJuYW1lcyI6WyJkZWZhdWx0Q2ZnIiwibGV2ZWwiLCJsb2dnZXIiLCJjb25zb2xlIiwiZGVidWciLCJsb2ciLCJteUZvcm1hdCIsIndpbnN0b24iLCJmb3JtYXQiLCJwcmludGYiLCJpbmZvIiwidGltZXN0YW1wIiwibGFiZWwiLCJtZXNzYWdlIiwibWV0YSIsIm1ldGFTdHIiLCJjcmVhdGVMb2dnZXIiLCJjZmciLCJjIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJjb21iaW5lIiwiY29sb3JpemUiLCJzaW1wbGUiLCJqc29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBaUJBLE1BQU1BLFVBQXdCLEdBQUc7QUFDL0JDLEVBQUFBLEtBQUssRUFBRTtBQUR3QixDQUFqQyxDLENBSUE7O0FBQ08sSUFBSUMsTUFBTSxHQUFHLEVBQ2xCLEdBQUdDLE9BRGU7QUFFbEI7QUFDQUMsRUFBQUEsS0FBSyxFQUFFRCxPQUFPLENBQUNFO0FBSEcsQ0FBYjs7O0FBTVAsTUFBTUMsUUFBUSxHQUFHQyxpQkFBUUMsTUFBUixDQUFlQyxNQUFmLENBQXNCQyxJQUFJLElBQUk7QUFDN0MsUUFBTTtBQUFFQyxJQUFBQSxTQUFGO0FBQWFDLElBQUFBLEtBQWI7QUFBb0JYLElBQUFBLEtBQXBCO0FBQTJCWSxJQUFBQSxPQUEzQjtBQUFvQ0MsSUFBQUE7QUFBcEMsTUFBNkNKLElBQW5EO0FBQ0EsTUFBSUssT0FBTyxHQUFHLEVBQWQ7O0FBQ0EsTUFBSUQsSUFBSixFQUFVO0FBQ1JDLElBQUFBLE9BQU8sR0FBSSxNQUFLLGdDQUFVRCxJQUFWLENBQWdCLEVBQWhDO0FBQ0Q7O0FBQ0QsU0FBUSxHQUFFSCxTQUFVLEtBQUlDLEtBQU0sS0FBSVgsS0FBTSxLQUFJWSxPQUFRLEdBQUVFLE9BQVEsRUFBOUQ7QUFDRCxDQVBnQixDQUFqQjs7QUFTTyxTQUFTQyxZQUFULENBQXNCQyxHQUF0QixFQUFpRDtBQUN0RCxRQUFNQyxDQUFDLEdBQUcsRUFDUixHQUFHbEIsVUFESztBQUVSLE9BQUdpQjtBQUZLLEdBQVY7QUFLQSxRQUFNRSxVQUFVLEdBQUcsQ0FDakIsSUFBSVosaUJBQVFZLFVBQVIsQ0FBbUJDLE9BQXZCLENBQStCLEVBQzdCLElBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXpCLEdBQ0E7QUFDRWYsTUFBQUEsTUFBTSxFQUFFRCxpQkFBUUMsTUFBUixDQUFlZ0IsT0FBZixDQUNOakIsaUJBQVFDLE1BQVIsQ0FBZWlCLFFBQWYsRUFETSxFQUVObEIsaUJBQVFDLE1BQVIsQ0FBZWtCLE1BQWYsRUFGTSxFQUdOcEIsUUFITTtBQURWLEtBREEsR0FRQSxFQVJKO0FBRDZCLEdBQS9CLENBRGlCLENBQW5CO0FBY0EsbUJBQUFKLE1BQU0sR0FBR0ssaUJBQVFTLFlBQVIsQ0FBcUI7QUFDNUJSLElBQUFBLE1BQU0sRUFBRUQsaUJBQVFDLE1BQVIsQ0FBZWdCLE9BQWYsQ0FDTmpCLGlCQUFRQyxNQUFSLENBQWVJLEtBQWYsQ0FBcUI7QUFBRUEsTUFBQUEsS0FBSyxFQUFFO0FBQVQsS0FBckIsQ0FETSxFQUVOTCxpQkFBUUMsTUFBUixDQUFlbUIsSUFBZixFQUZNLEVBR05wQixpQkFBUUMsTUFBUixDQUFlRyxTQUFmLEVBSE0sQ0FEb0I7QUFNNUJWLElBQUFBLEtBQUssRUFBRWlCLENBQUMsQ0FBQ2pCLEtBTm1CO0FBTzVCa0IsSUFBQUE7QUFQNEIsR0FBckIsQ0FBVDtBQVNBLFNBQU9qQixNQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3RyaW5naWZ5IGZyb20gXCJqc29uLXN0cmluZ2lmeS1zYWZlXCI7XG5pbXBvcnQgd2luc3RvbiBmcm9tIFwid2luc3RvblwiO1xuXG5leHBvcnQgdHlwZSBNZXRhID0ge1xuICBtZXRhOiBvYmplY3Q7XG59O1xuXG5leHBvcnQgdHlwZSBMb2dnZXIgPSB7XG4gIGRlYnVnKG5hbWU6IHN0cmluZywgbWV0YT86IE1ldGEpOiB2b2lkO1xuICBpbmZvKG5hbWU6IHN0cmluZywgbWV0YT86IE1ldGEpOiB2b2lkO1xuICB3YXJuKG5hbWU6IHN0cmluZywgbWV0YT86IE1ldGEpOiB2b2lkO1xuICBlcnJvcihuYW1lOiBzdHJpbmcsIG1ldGE/OiBNZXRhKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIExvZ2dlckNvbmZpZyA9IHtcbiAgbGV2ZWw6IFwiZGVidWdcIiB8IFwiaW5mb1wiIHwgXCJ3YXJuXCIgfCBcImVycm9yXCI7XG59O1xuXG5jb25zdCBkZWZhdWx0Q2ZnOiBMb2dnZXJDb25maWcgPSB7XG4gIGxldmVsOiBcImluZm9cIlxufTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW9iamVjdC1saXRlcmFsLXR5cGUtYXNzZXJ0aW9uXG5leHBvcnQgbGV0IGxvZ2dlciA9IHtcbiAgLi4uY29uc29sZSxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgZGVidWc6IGNvbnNvbGUubG9nXG59IGFzIExvZ2dlcjtcblxuY29uc3QgbXlGb3JtYXQgPSB3aW5zdG9uLmZvcm1hdC5wcmludGYoaW5mbyA9PiB7XG4gIGNvbnN0IHsgdGltZXN0YW1wLCBsYWJlbCwgbGV2ZWwsIG1lc3NhZ2UsIG1ldGEgfSA9IGluZm87XG4gIGxldCBtZXRhU3RyID0gXCJcIjtcbiAgaWYgKG1ldGEpIHtcbiAgICBtZXRhU3RyID0gYCAtICR7c3RyaW5naWZ5KG1ldGEpfWA7XG4gIH1cbiAgcmV0dXJuIGAke3RpbWVzdGFtcH0gWyR7bGFiZWx9XSAke2xldmVsfTogJHttZXNzYWdlfSR7bWV0YVN0cn1gO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIoY2ZnOiBMb2dnZXJDb25maWcpOiBMb2dnZXIge1xuICBjb25zdCBjID0ge1xuICAgIC4uLmRlZmF1bHRDZmcsXG4gICAgLi4uY2ZnXG4gIH07XG5cbiAgY29uc3QgdHJhbnNwb3J0cyA9IFtcbiAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIlxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKCksXG4gICAgICAgICAgICAgIG15Rm9ybWF0XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9KVxuICAgIH0pXG4gIF07XG5cbiAgbG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgIHdpbnN0b24uZm9ybWF0LmxhYmVsKHsgbGFiZWw6IFwic2VydmVyXCIgfSksXG4gICAgICB3aW5zdG9uLmZvcm1hdC5qc29uKCksXG4gICAgICB3aW5zdG9uLmZvcm1hdC50aW1lc3RhbXAoKVxuICAgICksXG4gICAgbGV2ZWw6IGMubGV2ZWwsXG4gICAgdHJhbnNwb3J0c1xuICB9KTtcbiAgcmV0dXJuIGxvZ2dlcjtcbn1cbiJdfQ==
