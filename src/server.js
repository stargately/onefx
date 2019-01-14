// @flow
import {hostname} from 'os';
import Koa from 'koa';
import methods from 'methods';
import Router from 'koa-router';
import type {Logger} from 'winston';

import {initMiddleware} from './middleware/index';
import {IntegratedGateways} from './integrated-gateways/integrated-gateways';

export type Config = {
  project: string,
  server: {
    host: string,
    port: string,
    staticDir: string,
    delayInitMiddleware: boolean,
    cookie: {
      secrets: Array<string>,
    },
  },
  gateways: {
    logger: {
      enabled: boolean,
      baseDir: string,
      topicName: string,
      level: 'debug' | 'info' | 'warn' | 'error'
    },
  }
}

export class Server {
  app: any;
  gateways: IntegratedGateways;
  logger: Logger;
  config: Config;
  httpServer: any;
  router: any;
  processTitle: string;

  // routes
  all: any;

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

  initMiddleware() {
    initMiddleware(this);
  }

  initRouter() {
    const router = new Router();
    const self = this;

    methods.forEach(setRouterOnVerb);
    setRouterOnVerb('all');

    function setRouterOnVerb(verb) {
      // $FlowFixMe
      self[verb] = function applyVerb() {
        const args = [].slice.call(arguments);

        let koaRoute = args.shift();
        if (typeof args[0] === 'string') {
          koaRoute = args.shift();
        }
        args.unshift(koaRoute);
        // $FlowFixMe
        return router[verb](...args);
      };
    }

    this.router = router;
    this.app.use(router.routes());
  }

  use(...args: any) {
    if (typeof args[0] === 'function') {
      // default route to '/'
      args.unshift('/');
    }
    this.router.use(...args);
  }

  listen(port: number, done: (server: any) => void = server => {
  }) {
    this.httpServer = this.app.listen(port, () => {
      this.logger.info(`${this.processTitle} listening on http://localhost:${port}`);
      return done(this);
    });
    return this.httpServer;
  }

  close(done: () => void = () => {
  }) {
    this.gateways.close();

    this.httpServer.close(done);
  }
}

