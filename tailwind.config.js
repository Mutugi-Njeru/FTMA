/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#bab600',
        customBrown: '#3b2b1f',
        customBrownLight:'#5a3d2a',
        customBaked: '#73b5cd',
        customDisabled: '#d1cc80'
      },
    },
  },
  plugins: [],
}