const keyWords = ["none", "self", "unsafe-inline", "unsafe-eval"];

// convert "self" => "'self'"
export default function (str) {
  return keyWords.includes(str) ? `'${str}'` : str;
}
