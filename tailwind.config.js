/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':'radial-gradient(circle, #f12711 0%,#f5af19 100%)'
      }
    },
  },
  plugins: [],
}

