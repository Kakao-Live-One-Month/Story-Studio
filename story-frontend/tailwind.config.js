/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}",],
  theme: {

    extend: {
      screens: {
        'sm': '10px',   // 작은 화면 크기
        'md': '768px',   // 중간 화면 크기
        'lg': '1280px',  // 큰 화면 크기
        'xl': '1360px',  // 매우 큰 화면 크기
        '2xl': '1536px', // 특히 큰 화면 크기
        '3xl': '1920px', //아주 큰 화면 크기
      }
    },
  },
  variants: {},
  plugins: [],
}

