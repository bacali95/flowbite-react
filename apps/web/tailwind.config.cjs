const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["variant", "&:is(.dark *)&:not(.light *)"],
  content: [
    "./app/**/*.{js,jsx,md,mdx,ts,tsx}",
    "./components/**/*.{js,jsx,md,mdx,ts,tsx}",
    "./data/**/*.{js,jsx,ts,tsx}",
    "./examples/**/*.{js,jsx,ts,tsx}",
    ".flowbite-react/class-list.json",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E7F2F6",
          100: "#CFE5ED",
          200: "#B7D8E3",
          300: "#9FCBDA",
          400: "#87BFD1",
          500: "#3E98B5",
          600: "#268BAC",
          700: "#0E7EA3",
          800: "#0A5872",
          900: "#084C62",
        },
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        "lg-light": "0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)",
      },
    },
    fontFamily: {
      sans: ["var(--font-inter)"],
    },
  },
  plugins: [flowbiteReact],
};
