/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Existing extended utilities
      boxShadow: {
        'neon-purple-3': '0 0px 220px -5px #8300E0', 
        'neon-dk-purple-1': '0 0px 220px 0px #826AED', 
        'neon-purple-2': '0 0px 220px 5px #8300E0', 
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },

      keyframes: {
        slideFromLine: {
          '0%': {
            transform: 'translateY(100%)', 
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        slideFromLine: 'slideFromLine 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
