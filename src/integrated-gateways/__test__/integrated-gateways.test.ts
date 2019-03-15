import test from "ava";
import { IntegratedGateways } from "../integrated-gateways";

test("IntegratedGateways", async t => {
  const g = new IntegratedGateways({
    project: "string",
    server: {
      host: "string",
      port: "string",
      staticDir: "string",
      delayInitMiddleware: true,
      cookie: {
        secrets: ["Array<string>"]
      },
      noCsrfRoutes: {},
      noSecurityHeadersRoutes: {}
    },
    gateways: {
      logger: {
        enabled: true,
        baseDir: "string",
        topicName: "string",
        level: "debug"
      }
    },
    csp: {},
    analytics: {},
    session: {}
  });
  t.truthy(g.logger);
  if (g.logger) {
    g.logger.info("log an info", { meta: { why: { a: { b: "c" } } } });
  }
});
