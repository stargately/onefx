import Helmet from 'react-helmet';

import {assetURL} from '../../asset-url';
import {STYLETRON_GLOBAL} from '../client-react-render';

export function rootHtml({styletron, jsonGlobals, reactMarkup, clientScript, nonce = ''}) {
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
    ${loadDeferredStyles(`
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
     `, nonce)}
  </head>
  <body>
    <div id='root'>${reactMarkup}</div>
    ${clientScript ?
    `<script type="text/javascript" crossorigin="" src="${assetURL(clientScript)}"></script>` :
    ''
}
  </body>
</html>
`;
}

function loadDeferredStyles(stylesElements, nonce) {
  return `
    <noscript id="deferred-styles">
    ${stylesElements}
    </noscript>
    <script${nonce && ` nonce="${nonce}"`}>
      var loadDeferredStyles = function() {
        var addStylesNode = document.getElementById("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement)
        addStylesNode.parentElement.removeChild(addStylesNode);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
          webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
      else window.addEventListener('load', loadDeferredStyles);
    </script>
  `;
}
