/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#91C8E4",
          2: "#F6F4EB",
          3: "#ffd700",
          4: "#b99d75",
          5: "#61ce70",
          6: "#040404",
        },
      },
      shadow: {
        custom:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      fontSize: {
        xs: "0.75rem", // You can adjust the value as needed
      },
      height: {
        custom: "95%",
      },
      width: {
        custom: "95%",
      },
    },
    keyframes: {
      translate: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0%)" },
      },

      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
    },
    animation: {
      translateX: "translateX 1s ease-in-out",
      fadeIn: "fadeIn 1s ease-in-out",
    },
  },
  plugins: [],
};
