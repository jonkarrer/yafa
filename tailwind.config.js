/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html", "./src/web/**/*.{tsx, jsx, html}"],
  theme: {
    screens: {
      "tab-sm": "673px",
      "tab-md": "752px",
      "tab-lg": "832px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1512px",
      "4xl": "1920px",
    },
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
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      fontSize: {
        ss: "0.625rem",
      },
    },
  },
  plugins: [],
};
