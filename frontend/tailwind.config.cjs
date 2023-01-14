/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pallete-purple": {
          50: "#eeefff",
          100: "#e1e2fe",
          200: "#c8c9fd",
          300: "#a8a7fa",
          400: "#8d83f6",
          500: "#806aef",
          600: "#6e49e2",
          700: "#5f3bc7",
          800: "#4e32a1",
          900: "#412f80",
        },
      },
    },
  },
  plugins: [],
};
