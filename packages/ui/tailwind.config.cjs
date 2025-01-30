const { theme } = require("./src/tailwind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: theme,
  },
  plugins: [],
};
