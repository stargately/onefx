// @flow
import console from 'global/console';
import winston from 'winston';
import process from 'global/process';

export type Logger = {
  debug: (name: string, meta: Object) => void,
  info: (name: string, meta: Object) => void,
  warn: (name: string, meta: Object) => void,
  error: (name: string, meta: Object) => void
}

export type LoggerConfig = {
  level: 'debug' | 'info' | 'warn' | 'error',
}

const defaultCfg: LoggerConfig = {
  level: 'info',
};

export let logger = {
  ...console,
  debug: console.log,
};

const myFormat = winston.format.printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

export function createLogger(cfg: LoggerConfig): Logger {
  const c = {
    ...defaultCfg,
    ...cfg,
  };

  const transports = [
    new (winston.transports.Console)({
      ...(process.env.NODE_ENV !== 'production' ?
        {
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            myFormat,
          ),
        } : {}),
    }),
  ];

  logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.label({label: 'server'}),
      winston.format.json(),
      winston.format.timestamp(),
    ),
    level: c.level,
    transports,
  });
  return logger;
}

