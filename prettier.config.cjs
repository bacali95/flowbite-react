/** @type {import('prettier').Config} */
module.exports = {
  plugins: ["prettier-plugin-packagejson", "@ianvs/prettier-plugin-sort-imports"],
  printWidth: 120,
  // sort-imports
  importOrder: [
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "^~/(?!.*\.(?:css|module\.css)$).*",
    "^[.]",
    "",
    "^[.](?!.*\\.(?:css|module\\.css)$).*$",
    ".*\\.css$",
  ],
};
