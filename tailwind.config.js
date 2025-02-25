/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: 'smooth',
      },
      // Ensure content doesn't shift during scrolling
      scrollPadding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
      },
    },
  },
  plugins: [],
};
