/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#D4EDDA',
      },
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
  daisyui: {
    themes: [
      {
        kisaan: {
          "primary": "#4ade80",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#bbf7d0",
          "success": "#22c55e",
          "warning": "#facc15",
          "error": "#f87171",
        },
      },
      "light",
      "dark",
      "cupcake",
    ],
    darkTheme: "kisaan",
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
    defaultTheme: "kisaan",
  },
}