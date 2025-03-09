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
        customDisabled: '#d1cc80',
        customVeryLightBrown: "#EED9C4",
        oldGod: "#B9B43",
        lemonGinger: "#A19E3B",
        brownYellow: "#C3B00A",
        butterScotch: "#FCB040",
        taupe: "#413324",
        skyBlue: "#94C9E2",
        mediumElectricBlue: "#00599A",
        iceberg: "#DFEFF6",
        snowDrift: "#F6FAF9"

      },
    },
  },
  plugins: [],
}