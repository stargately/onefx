// @flow
import config from 'config';
import dotty from 'dotty';

import type {Config} from '../server';
import type {Logger} from './logger';
import {createLogger} from './logger';

export class IntegratedGateways {
  logger: Logger;
  config: Config;

  constructor(cfg: Config) {
    this.config = config;

    if (dotty.get(cfg, 'gateways.logger.enabled')) {
      this.initLogger();
    }
  }

  initLogger() {
    this.logger = createLogger(this.config.gateways.logger);
  }

  close() {
  }
}
