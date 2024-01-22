/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        // => @media (min-width: 992px) { ... }
      },
      boxShadow: {
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)',
        'lg-dark': '0 2px 4px -3px rgba(0, 0, 0, 0.1), 0 3px 3px -2px rgba(0, 0, 0, 0.5)'
      },
      fontFamily: {
        'gowun-batang': ['Gowun Batang', 'sans-serif'],
        'gaegu':['Gaegu', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
}

