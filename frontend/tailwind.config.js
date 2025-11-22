/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#e2e8f0",
        accent: "#38bdf8", // bright cyan for highlights
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
