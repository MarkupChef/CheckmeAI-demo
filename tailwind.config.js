/** @type {import('tailwindcss').Config} */

const colorsPalette = require('./colors');
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: 'var(--font-montserrat)',
      body: 'var(--font-montserrat)',
      secondary: ['Nunito Sans', 'Open Sans', 'Arial', 'Helvetica', 'sans-serif'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
    },
    extend: {
      colors: {
        primary: colorsPalette['orangered'],
        steelblue: colorsPalette['steelblue'],
        skyblue: colorsPalette['skyblue'],
        orangered: colorsPalette['orangered'],
        powderblue: colorsPalette['powderblue'],
        lime: colorsPalette['lime'],
        red: colorsPalette['red'],
        'light-orangered': colorsPalette['light-orangered'],
        'gray-10': colorsPalette['gray-10'],

        seagreen: {
          DEFAULT: colorsPalette['seagreen-900'],
          900: colorsPalette['seagreen-900'],
          800: colorsPalette['seagreen-800'],
          700: colorsPalette['seagreen-700'],
          600: colorsPalette['seagreen-600'],
          500: colorsPalette['seagreen-500'],
          400: colorsPalette['seagreen-400'],
          300: colorsPalette['seagreen-300'],
          200: colorsPalette['seagreen-200'],
          100: colorsPalette['seagreen-100'],
        },
        darkblue: {
          DEFAULT: colorsPalette['darkblue-500'],
          900: colorsPalette['darkblue-900'],
          800: colorsPalette['darkblue-800'],
          700: colorsPalette['darkblue-700'],
          600: colorsPalette['darkblue-600'],
          500: colorsPalette['darkblue-500'],
        },
        aqua: {
          light: colorsPalette['aqua-light'],
        },
      },
      textColor: {
        default: colorsPalette['darkblue-500'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(0, max-content))',
      },
      boxShadow: {
        'btn-active': '0px 0.2em 5px 0px rgba(0, 0, 0, 0.15) inset',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
};
