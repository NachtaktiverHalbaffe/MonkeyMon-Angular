/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
    "./src/app/components/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        selected: "#D97706",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
