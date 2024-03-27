/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        selected: "#D97706",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
