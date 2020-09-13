#!/usr/bin/env node

const yaml = require("js-yaml");
const fs = require("fs");

function run(dir: string) {
  const dirs = fs.readdirSync(dir);
  for (const d of dirs) {
    // Get document, or throw exception on error
    try {
      const path = `${dir}/${d}`;
      const doc = yaml.safeLoad(fs.readFileSync(path, "utf8"));
      let sorted = yaml.dump(doc, {
        sortKeys: true,
        flowLevel: -1,
        lineWidth: 999999,
      });
      sorted = sorted.replace(/\n/g, "\n\n");
      fs.writeFileSync(path, sorted);
      console.log(`✅ ${path}`);
    } catch (e) {
      console.log(e);
    }
  }
}

run(process.argv[2]);
