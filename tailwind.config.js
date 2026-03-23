/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
    "./src/shared/**/*.{js,jsx,ts,tsx}",
    "./src/providers/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#0f172a",
        },
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};
