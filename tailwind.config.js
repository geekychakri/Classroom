module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1024px" },
      sm: { max: "767px" },
      tabPort: {
        raw: "(min-device-width: 48em) and (max-device-width: 64em) and (orientation: portrait)",
      },
      tabProPort: {
        raw: "(min-device-width: 64em) and (max-device-width: 85.375em) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      tabProLand: {
        raw: "(min-device-width: 64em) and (max-device-width: 85.375em) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      tabLand: {
        raw: "(min-device-width: 64em) and (max-device-height: 48em) and (orientation: landscape) ",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
