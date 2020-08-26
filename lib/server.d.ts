/// <reference types="node" />
import http from "http";
import Koa from "koa";
import Router from "koa-router";
import { IntegratedGateways } from "./integrated-gateways/integrated-gateways";
import { Logger } from "./integrated-gateways/logger";
import { Middleware } from "./types";
export declare type Config = {
  project: string;
  server: {
    host: string;
    port: string;
    staticDir: string;
    routePrefix?: string;
    cdnBase?: string;
    delayInitMiddleware: boolean;
    cookie: {
      secrets: Array<string>;
    };
    noSecurityHeadersRoutes: {
      [prefix: string]: boolean;
    };
    noCsrfRoutes: {
      [prefix: string]: boolean;
    };
  };
  gateways: {
    logger: {
      enabled: boolean;
      baseDir: string;
      topicName: string;
      level: "debug" | "info" | "warn" | "error";
    };
  };
  csp: {
    [key: string]: Array<string>;
  };
  analytics: {
    [key: string]: string;
  };
  session: {};
};
declare type SetRoute = (
  name: string,
  route: string | RegExp,
  ...handler: Array<Middleware>
) => void;
export declare class Server {
  app: Koa;
  gateways: IntegratedGateways;
  logger: Logger;
  config: Config;
  httpServer?: http.Server;
  router: Router;
  processTitle: string;
  all: SetRoute;
  get: SetRoute;
  post: SetRoute;
  put: SetRoute;
  head: SetRoute;
  delete: SetRoute;
  options: SetRoute;
  trace: SetRoute;
  copy: SetRoute;
  lock: SetRoute;
  constructor(config: Config);
  initMiddleware(): void;
  initRouter(): void;
  use(...args: any): void;
  listen(port: number, done?: ListenDone): http.Server;
  close(done?: CloseDone): void;
}
declare type ListenDone = (server: Server) => void;
declare type CloseDone = () => void;
export {};
