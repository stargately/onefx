import React from "react";
import { themeDecorator } from "onefx-common-components/lib/storybook-utils";
import { SignIn } from "./email-password-identity-provider/view/sign-in";

export const Standard: React.FC = () => <SignIn />;

export default {
  component: SignIn,
  decorators: [themeDecorator()],
  title: "onefx-auth-provider|SignIn"
};
