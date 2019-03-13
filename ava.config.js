export default {
  require: ["ts-node/register"],
  files: ["src/**/*.test.ts*", "src/*.test.ts*"],
  compileEnhancements: false,
  extensions: ["ts", "tsx"]
};
