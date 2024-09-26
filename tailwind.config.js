/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
            primary: "#FB005D",
        },
        fontFamily: {
            'zona-regular': ['ZonaPro-Regular', 'sans-serif'],
            'zona-semibold': ['ZonaPro-SemiBold', 'sans-serif'],
            'zona-bold': ['ZonaPro-Bold', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }