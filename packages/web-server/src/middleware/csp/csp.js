import effectiveAttrValidator from "./effectiveAttrValidator";
import filterEffectiveAttr, { effectiveAttr } from "./filterEffectiveAttr";
import repareKeyWords from "./repareKeyWords";
import * as log from "./log";

function generateSubPolicyStr(policy) {
  return policy.map(repareKeyWords).join(" ");
}

const defaultParams = {
  enableWarn: true,
  policy: {
    "default-src": ["self"],
  },
};

function validatorPolicy(policy) {
  if (Object.keys(policy).length === 0) {
    log.warn("⚠️CSP CONFIG WARNING: Empty Policy");
  }

  effectiveAttrValidator(policy, effectiveAttr, (invalidAttrs) => {
    log.warn(
      `⚠️CSP CONFIG WARNING: Invalid Policy Name[${invalidAttrs.join(", ")}]`
    );
  });
}

/**
 * @desc Content-Security-Policy
 *
 * @param customPolicy {Object} exp. { 'img-src': ['self'] };
 */
export default function ({ enableWarn = true, policy = {} } = defaultParams) {
  return async (ctx, next) => {
    // Warn invalid Policy Setting
    if (enableWarn) {
      validatorPolicy(policy);
    }

    // generate http header string
    const policyStr = filterEffectiveAttr(policy, ctx)
      .map(generateSubPolicyStr)
      .join(";");

    ctx.set("Content-Security-Policy", policyStr);
    await next();
  };
}
