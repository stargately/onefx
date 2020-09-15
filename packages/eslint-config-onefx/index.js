module.exports = {
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
  },
  rules: {
    "global-require": [0],
    "import/no-extraneous-dependencies": 0,
    "no-use-before-define": [0],
    "@typescript-eslint/no-use-before-define": [1],
    "@typescript-eslint/no-var-requires": 0,
    curly: ["error", "all"],
    "max-classes-per-file": 0,
    "no-param-reassign": 0,
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabelStatement",
      "WithStatement",
    ],
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "class-methods-use-this": 0,
    "@typescript-eslint/ban-ts-comment": 0,
  },
  overrides: [
    {
      files: "*.js",
      rules: {
        "@typescript-eslint/explicit-function-return-type": 0,
      },
    },
    {
      files: "*.ts",
      parser: "@typescript-eslint/parser",
    },
  ],
};
