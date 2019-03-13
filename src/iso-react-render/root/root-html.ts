import Helmet from "react-helmet";
import { assetURL } from "../../asset-url";
import { STYLETRON_GLOBAL } from "../client-react-render";

type Opts = {
  // tslint:disable-next-line:no-any
  styletron: any;
  // tslint:disable-next-line:no-any
  jsonGlobals: any;
  reactMarkup: string;
  clientScript: string;
};

export function rootHtml({
  styletron,
  jsonGlobals,
  reactMarkup,
  clientScript
}: Opts): string {
  const stylesheets = styletron.getStylesheetsHtml(STYLETRON_GLOBAL);
  const head = Helmet.rewind();

  return `<!DOCType html>
<html ${head.htmlAttributes.toString()}>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()} 
    ${head.link.toString()}
    ${head.style.toString()}
    <style>body{margin:0}</style>
    ${stylesheets}
    ${jsonGlobals}
    ${head.script.toString()}
  </head>
  <body>
    <div id='root'>${reactMarkup}</div>
    ${
      clientScript
        ? `<script type="text/javascript" crossorigin="" src="${assetURL(
            clientScript
          )}"></script>`
        : ""
    }
  </body>
</html>
`;
}
