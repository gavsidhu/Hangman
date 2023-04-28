/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Permanent Marker", 'sans-serif'],
        normal: ["Open Sans", 'sans-serif']
      },
    },
  },
  plugins: [],
}

