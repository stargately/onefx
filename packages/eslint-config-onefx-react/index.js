module.exports = {
  extends: ["plugin:react/recommended", "prettier/react"],
  plugins: ["graphql", "react-hooks"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        name: "antd",
        message: "import antd/lib/* instead."
      }
    ],
    "react/prop-types": 0,
    "react/jsx-curly-brace-presence": 2
  }
};
