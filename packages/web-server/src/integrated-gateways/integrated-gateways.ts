import { Config } from "../server";
import { Logger } from "./logger";
import { createLogger } from "./logger";

export class IntegratedGateways {
  public logger: Logger;
  public config: Config;

  constructor(cfg: Config) {
    this.config = cfg;

    this.logger = createLogger(this.config.gateways.logger);
  }

  // tslint:disable-next-line:no-empty
  public close(): void {}
}
