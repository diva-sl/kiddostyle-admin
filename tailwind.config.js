/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b31f56",
        background: "#faf8ff",
        surface: "#faf8ff",
        "on-surface": "#131b2e",
        "on-surface-variant": "#584045",
      }
    },
  },
  plugins: [],
}
