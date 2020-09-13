import stringify from "json-stringify-safe";
import winston from "winston";

export type Meta = {
  meta: Record<string, unknown>;
};

export type Logger = {
  debug(name: string, meta?: Meta): void;
  info(name: string, meta?: Meta): void;
  warn(name: string, meta?: Meta): void;
  error(name: string, meta?: Meta): void;
};

export type LoggerConfig = {
  level: "debug" | "info" | "warn" | "error";
};

const defaultCfg: LoggerConfig = {
  level: "info",
};

// eslint-disable-next-line import/no-mutable-exports
export let logger = {
  ...console,
  // tslint:disable-next-line:no-console
  debug: console.log,
} as Logger;

const myFormat = winston.format.printf((info) => {
  const { timestamp, label, level, message, meta } = info;
  let metaStr = "";
  if (meta) {
    metaStr = ` - ${stringify(meta)}`;
  }
  return `${timestamp} [${label}] ${level}: ${message}${metaStr}`;
});

export function createLogger(cfg: LoggerConfig): Logger {
  const c = {
    ...defaultCfg,
    ...cfg,
  };

  const transports = [
    new winston.transports.Console({
      ...(process.env.NODE_ENV !== "production"
        ? {
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
              myFormat
            ),
          }
        : {}),
    }),
  ];

  logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.label({ label: "server" }),
      winston.format.json(),
      winston.format.timestamp()
    ),
    level: c.level,
    transports,
  });
  return logger;
}
