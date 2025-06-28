/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Existing extended utilities
      boxShadow: {
        // faint glow
        'neon-emerald-3': '0 0 110px -25px #00C17C',
        // solid outline glow
        'neon-dk-emerald-1': '0 0 110px 0px #006F52',
        // stronger bloom
        'neon-emerald-2': '0 0 110px -25px #00C17C',
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
        
      breathe: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.2)' },
      },
      },
      animation: {
        slideFromLine: 'slideFromLine 0.6s ease-out forwards',
      },
      animation: {
        breathe: 'breathe 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
