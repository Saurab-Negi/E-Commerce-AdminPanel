/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        'customBtn': '0 4px 8px 0 rgba(65 65 65 / 20%), 0 6px 20px 0 rgb(105 105 105 / 19%);',
      },
    },
  },
  plugins: [],
}

