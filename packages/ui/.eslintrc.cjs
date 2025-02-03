/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "vitest"],
  settings: {
    react: {
      version: "detect",
    },
    tailwindcss: {
      callees: ["twMerge", "createTheme"],
      classRegex: "^(class(Name)|theme)?$",
    },
  },
  ignorePatterns: ["dist"],
  rules: {
    "no-undef": "off",
    "no-unused-vars": "off",
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "tailwindcss/classnames-order": "off",
    "tailwindcss/enforces-shorthand": "off",
  },
};
