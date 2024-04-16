/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html", "./src/web/**/*.{tsx, jsx, html}"],
  theme: {
    colors: {
      dark: "#000517",
      p100: "#1f2f3e",
      p80: "#3e5e7c",
      g100: "#ff7849",
      g90: "#D1D1D1",
      g70: "#f5f6fa",
      c100: "#ebc600",
      n70: "#7e84a3",
    },
    fontFamily: {
      sans: ["Source Sans 3", "sans-serif"],
    },
    extend: {
      fontSize: {
        ss: "0.625rem",
      },
    },
  },
  plugins: [],
};
