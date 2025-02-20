/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon-purple-3': '0 0px 220px -5px #8300E0', 
        'neon-dk-purple-1': '0 0px 220px 0px #826AED', 
        'neon-purple-2': '0 0px 220px 5px #8300E0', 
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

