import React from "react";
import { themeDecorator } from "onefx-common-components/lib/storybook-utils";
import { EmailField } from "./email-password-identity-provider/view/email-field";

export const Standard: React.FC = () => (
  <EmailField error={"error message"} defaultValue={"yo"} />
);

export default {
  component: EmailField,
  decorators: [themeDecorator()],
  title: "onefx-auth-provider|SignIn"
};
