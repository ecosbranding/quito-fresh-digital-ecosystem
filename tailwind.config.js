/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        freshRed: '#D32F2F',
        deepDark: '#0A0A0A',
      },
      fontFamily: {
        display: ['serif'],
        sans: ['sans-serif'],
      },
    },
  },
  plugins: [],
}
