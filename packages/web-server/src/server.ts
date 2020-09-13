import http from "http";
import Koa from "koa";
import Router from "koa-router";
import methods from "methods";
import { hostname } from "os";
import session from "koa-session";
import { IntegratedGateways } from "./integrated-gateways/integrated-gateways";
import { Logger } from "./integrated-gateways/logger";
import { initMiddleware } from "./middleware";
import { Middleware } from "./types";

export type Config = {
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
  session: Partial<session.opts>;
};

type SetRoute = (
  name: string,
  route: string | RegExp,
  ...handler: Array<Middleware>
) => void;

export class Server {
  public app: Koa;

  public gateways: IntegratedGateways;

  public logger: Logger;

  public config: Config;

  public httpServer?: http.Server;

  public router: Router;

  public processTitle: string;

  public all: SetRoute;

  public get: SetRoute;

  public post: SetRoute;

  public put: SetRoute;

  public head: SetRoute;

  public delete: SetRoute;

  public options: SetRoute;

  public trace: SetRoute;

  public copy: SetRoute;

  public lock: SetRoute;

  constructor(config: Config) {
    this.config = config;
    this.gateways = new IntegratedGateways(config);
    this.processTitle = `nodejs-${config.project}-on-${hostname()}`;
    this.app = new Koa();
    this.logger = this.gateways.logger;
    this.initRouter();

    this.app.keys = config.server.cookie.secrets;
    if (!this.config.server.delayInitMiddleware) {
      initMiddleware(this);
    }
  }

  public initMiddleware(): void {
    initMiddleware(this);
  }

  public initRouter(): void {
    const router = new Router();
    const setRouterOnVerb = (verb: string) => {
      // @ts-ignore
      this[verb] = (...argu) => {
        const args = [...argu];

        let koaRoute = args.shift();
        if (typeof args[0] === "string") {
          koaRoute = args.shift();
        }
        let { routePrefix } = this.config.server;
        if (routePrefix) {
          if (routePrefix[routePrefix.length - 1] !== "/") {
            routePrefix = `${routePrefix}/`;
          }
          if (koaRoute[0] === "/") {
            koaRoute = koaRoute.substr(1);
          }
          koaRoute = `${routePrefix}${koaRoute}`;
        }
        args.unshift(koaRoute);
        // @ts-ignore
        return router[verb](...args);
      };
    };

    methods.forEach(setRouterOnVerb);
    setRouterOnVerb("all");

    this.router = router;
    this.app.use(router.routes());
  }

  // tslint:disable-next-line
  public use(...args: any): void {
    if (typeof args[0] === "function") {
      // default route to '/'
      args.unshift("/");
    }
    this.router.use(...args);
  }

  public listen(
    port: number,
    done: ListenDone = (_: Server) => null
  ): http.Server {
    this.httpServer = this.app.listen(port, () => {
      this.logger.info(
        `${this.processTitle} listening on http://localhost:${port}`
      );
      return done(this);
    });
    return this.httpServer;
  }

  public close(done: CloseDone = () => null): void {
    this.gateways.close();
    if (this.httpServer) {
      this.httpServer.close(done);
    }
  }
}

type ListenDone = (server: Server) => void;
type CloseDone = () => void;
