import { assetURL } from "onefx/lib/asset-url";
import { t } from "onefx/lib/iso-i18n";
import { Helmet } from "onefx/lib/react-helmet";
import { styled } from "onefx/lib/styletron-react";
import React from "react";
import { fullOnPalm } from "@/style-media";
import { ContentPadding } from "@/style-padding";
import { Flex } from "./flex";

type Props = {
  bar: string;
  title: string;
  info: string;
};

const Image = styled("img", {
  maxWidth: "160px",
  ...fullOnPalm
});

const ErrorPageInner = ({ bar, title, info }: Props): JSX.Element => {
  return (
    <ContentPadding>
      <Helmet title={`${bar} - ${t("topbar.brand")}`} />
      <Flex center>
        <Image src={assetURL("favicon.svg")} />
        <Flex column margin="8px">
          <h1>{title}</h1>
          <div>{info}</div>
        </Flex>
      </Flex>
    </ContentPadding>
  );
};

const ErrorPage = React.memo(ErrorPageInner);

export { ErrorPage };
