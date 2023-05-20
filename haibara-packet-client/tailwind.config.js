/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    textColor: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      ...colors,
      white: '#ffffffcc',
    },
    borderColor: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      ...colors,
    },
    backgroundColor: {
      darkMode: '#141414',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      ...colors,
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      roboto: ['Roboto', 'san-serif'],
      poppins: ['Poppins', 'sans-serif'],
      publicSans: ['"Public Sans"', 'sans-serif'],
      ...defaultTheme.fontFamily,
    },
    extend: {},
  },
  plugins: [],
};
