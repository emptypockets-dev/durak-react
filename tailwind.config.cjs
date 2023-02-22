/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Georgia", "sans-serif"],
    },
    extend: {
      fontSize: {
        "12xl": "12rem",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(to bottom, #f6e6b4 0%, #ed9017 100%)",
        "gold-gradient-reverse":
          "linear-gradient(to top, #ed9017 0%, #ed9017 100%)",
      },
      backgroundClip: {
        text: "text",
      },
      textColor: {
        transparent: "transparent",
        "gold-gradient": "transparent",
        "gold-gradient-reverse": "transparent",
      },
    },
  },
  variants: {
    backgroundImage: ["hover"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
