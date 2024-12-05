/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1a1b1e",
        primary: {
          light: "#22d3ee",
          DEFAULT: "#0891b2",
          dark: "#0e7490",
        },
        secondary: {
          light: "#818cf8",
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
        },
        accent: {
          light: "#a78bfa",
          DEFAULT: "#7c3aed",
          dark: "#6d28d9",
        },
      },
    },
  },
  plugins: [],
};
