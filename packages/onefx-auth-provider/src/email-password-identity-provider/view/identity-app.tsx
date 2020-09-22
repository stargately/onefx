import { t } from "onefx/lib/iso-i18n";
import { Route, Switch } from "onefx/lib/react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import React, { useEffect } from "react";
import { Flex } from "onefx-common-components/lib/lib/flex";
import { NotFound } from "onefx-common-components/lib/lib/not-found";
import { ContentPadding } from "onefx-common-components/lib/lib/style-padding";
import { ForgotPassword } from "./forgot-password";
import { ResetPasswordContainer } from "./reset-password";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

const initGoogleAnalytics = require("../../../common/google-analytics");

type Props = {
  googleTid?: string;
};

export const IdentityApp = ({ googleTid }: Props): JSX.Element => {
  useEffect(() => {
    if (googleTid) {
      initGoogleAnalytics({ tid: googleTid });
    }
  }, [googleTid]);
  return (
    <div>
      <Route path="/email-token/*">
        <EmailTokenInvalid />
      </Route>
      <Switch>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/email-token/*">
          <ForgotPassword />
        </Route>
        <Route exact path="/settings/reset-password">
          <ResetPasswordContainer />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

function EmailTokenInvalid(): JSX.Element {
  return (
    <Alert>
      <ContentPadding>
        <Flex>{t("auth/forgot_password.email_token_failure")}</Flex>
      </ContentPadding>
    </Alert>
  );
}

const Alert = styled("div", ({ $theme }) => ({
  padding: `${$theme.sizing[3]} 0`,
  backgroundColor: $theme.colors.error,
  color: $theme.colors.white
}));
