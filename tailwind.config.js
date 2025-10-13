/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220", // page bg (black)
        ink2: "#0f172a", // section bg (very dark blue)
        mint: "#64ffda", // accent color (blueish green)
        slate1: "#8892b0", // secondary text (light blueish gray)
        slate2: "#a8b2d1", // lighter secondary text (lighter blueish gray)
      },
    },
  },
  plugins: [],
};
