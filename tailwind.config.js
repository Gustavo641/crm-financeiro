/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        secondary: '#14B8A6',
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
        neutral: '#6B7280',
      },
    },
  },
  plugins: [],
};
