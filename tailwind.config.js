/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        '100': '35rem',
        'medium-screen': '80vh',
        'loading-screen': "150vh"
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundColor: {
        'loading': "rgba(0, 0, 0, 0.12)",
      }
    },
  },
  plugins: [],
}
