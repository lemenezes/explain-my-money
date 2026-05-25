module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        premium: {
          100: "#e0e7ef",
          200: "#b6c2d9",
          300: "#8c9fc3",
          400: "#627cab",
          500: "#395994",
          600: "#2d4776",
          700: "#223558",
          800: "#16233a",
          900: "#0b111c"
        }
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "2rem"
      },
      boxShadow: {
        premium: "0 4px 32px 0 rgba(39, 44, 49, 0.12)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
