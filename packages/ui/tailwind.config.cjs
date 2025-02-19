const flowbiteReact = require("./src/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [flowbiteReact],
};
