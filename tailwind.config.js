/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        white: "4px 4px 10px rgba(118, 117, 120, 0.38)", // White shadow
      },
    },
  },
  plugins: [],
};
