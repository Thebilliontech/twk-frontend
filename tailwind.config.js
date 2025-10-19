/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: "#5EEAD4", // mint
        primary: "#0F172A", // slate-900
        card: "#0B1220",
        glass: "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1rem",
      }
    },
  },
  plugins: [],
}
