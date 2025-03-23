/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./popup.tsx"],
  theme: {
    extend: {
      colors: {
        violet: {
          50: "#f5f3ff",
          700: "#5b21b6"
        }
      }
    }
  },
  plugins: []
}
