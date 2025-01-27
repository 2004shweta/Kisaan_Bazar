/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'soft-beige-gradient': 'linear-gradient(to right, #f5f3e7, #e8e1d2)',
        'warm-gray-gradient': 'linear-gradient(to right, #d7d2cb, #a2a69c)'
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [
    require('daisyui'),
    // require('@tailwindcss/forms')
  ],
}