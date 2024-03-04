/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        customRed: 'rgb(229, 9, 20)',
      }
    },
    backgroundImage: {
      'bg_img': 'url("assets/front_image1.jpg")',
      
    }
  },
  plugins: [require('tailwind-scrollbar-hide'),require("tw-elements/dist/plugin.cjs"),require("daisyui")],
  darkMode: "class"
}

