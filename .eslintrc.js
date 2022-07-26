module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
  },
  plugins: [],
};

module.exports.plugins.push("only-error");

