import loadScript from 'load-script';
import window from 'global/window';

const web3CDN = 'https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js';
const d3Script = 'https://d3js.org/d3.v4.min.js';

let d3Loaded = false;
let web3 = null;

export function lazyLoadWeb3(cb) {
  if (web3 !== null) {
    return cb(web3);
  }
  loadScript(web3CDN, () => {
    // For now, the provider is left blank
    web3 = new window.Web3(new window.Web3.providers.HttpProvider(''));
    return cb(web3);
  });
}

export function lazyLoadD3(cb) {
  if (d3Loaded) {
    return cb(window.d3);
  }
  loadScript(d3Script, () => {
    d3Loaded = true;
    cb(window.d3);
  });
}
