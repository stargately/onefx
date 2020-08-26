export declare type Meta = {
  meta: object;
};
export declare type Logger = {
  debug(name: string, meta?: Meta): void;
  info(name: string, meta?: Meta): void;
  warn(name: string, meta?: Meta): void;
  error(name: string, meta?: Meta): void;
};
export declare type LoggerConfig = {
  level: "debug" | "info" | "warn" | "error";
};
export declare let logger: Logger;
export declare function createLogger(cfg: LoggerConfig): Logger;
