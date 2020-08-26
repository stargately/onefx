import { Config } from "../server";
import { Logger } from "./logger";
export declare class IntegratedGateways {
  logger: Logger;
  config: Config;
  constructor(cfg: Config);
  close(): void;
}
