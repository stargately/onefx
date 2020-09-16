module.exports = {
  extends: ["plugin:react/recommended"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        name: "antd",
        message: "import antd/lib/* instead.",
      }
    ],
    "react/prop-types": 0
  },
};
