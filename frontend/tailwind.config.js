/** @type {import('tailwindcss').Config} */
// @eslint-ignore
module.exports = {
  content: [
    // './index.html', './pages/*.html', './pages/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/**/*.{js,jsx,ts,tsx}',
    './src/layout/**/*.{js,jsx,ts,tsx}',
    '*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
  },
  // purge: ['./src/**/*.js|.ts|.jsx|.tsx'],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
