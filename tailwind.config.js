/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 1: "#91C8E4", 2: "#F6F4EB" },
      },
      shadow: {
        primary: { 1: " 0 4px 8px rgba(0, 0, 0, 0.1)" },
      },
    },
  },
  plugins: [],
};
