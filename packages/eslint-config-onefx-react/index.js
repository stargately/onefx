module.exports = {
  extends: ["plugin:react/recommended"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        name: "antd",
        message: "import antd/lib/* instead.",
      },
      {
        name: "styletron-react",
        message: "import onefx/lib/styletron-react instead.",
      },
    ],
  },
};
