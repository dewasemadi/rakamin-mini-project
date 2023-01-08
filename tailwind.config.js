/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#01959F',
          surface: '#F7FEFF',
          border: '#4DB5BC',
          dark: '#007c85',
        },
        secondary: {
          DEFAULT: '#FA9810',
          surface: '#FFFCF5',
          border: '#FEEABC',
        },
        danger: {
          DEFAULT: '#E11428',
          surface: '#FFFAFA',
          border: '#F5B1B7',
          dark: '#c91022',
        },
        success: {
          DEFAULT: '#43936C',
          surface: '#F8FBF9',
          border: '#B8DBCA',
        },
        neutral: {
          20: '#FAFAFA',
          30: '#EDEDED',
          40: '#E0E0E0',
          70: '#757575',
          90: '#404040',
          100: '#1D1F20',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '1rem',
          xl: '1rem',
          '2xl': '1rem',
        },
      },
    },
  },
  plugins: [],
}
