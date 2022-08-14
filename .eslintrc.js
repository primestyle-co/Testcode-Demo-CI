module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    // "@vue/typescript/recommended",
    "@vue/prettier",
    // "@vue/prettier/@typescript-eslint",
    // "@typescript-eslint",
    // "@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended"
    // "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    // project: ['./tsconfig.json']
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/multi-word-component-names": "off"
  },
  plugins: [],
};

module.exports.plugins.push("only-error");

