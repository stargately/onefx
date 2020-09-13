import { Config } from "../server";
import { Logger, createLogger } from "./logger";

export class IntegratedGateways {
  public logger: Logger;

  public config: Config;

  constructor(cfg: Config) {
    this.config = cfg;

    this.logger = createLogger(this.config.gateways.logger);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public close(): void {}
}
