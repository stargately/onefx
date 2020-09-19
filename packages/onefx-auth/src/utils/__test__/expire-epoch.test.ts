import test from "ava";
import { getExpireEpochDays } from "../expire-epoch";

test("getExpireEpochDays", async t => {
  const days = getExpireEpochDays(1) + 1 - new Date().getTime();
  t.truthy(days >= 86400000);
});
