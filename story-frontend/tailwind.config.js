/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        'lg': '2000px',
        // => @media (min-width: 992px) { ... }
      },
      boxShadow: {
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)',
        'inner-darksm': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        'lg-dark': '0 2px 4px -3px rgba(0, 0, 0, 0.1), 0 3px 3px -2px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        'gowun-batang': ['Gowun Batang', 'sans-serif'],
        'gaegu':['Gaegu', 'sans-serif'],
      },
      keyframes:{
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '70%': { transform: 'translateY(-5%)' },
        },
      },
      animation: {
        bounce: 'bounce 2s infinite',
      },
    },
  },
  variants: {},
  plugins: [],
}

