import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        freshRed: {
          DEFAULT: '#D32F2F',
          dark: '#A12323',
          light: '#FF5252'
        },
        deepDark: '#0A0A0A',
        iceGray: '#F8FAFC'
      },
      fontFamily: {
        display: ['var(--font-cormorant)'],
        sans: ['var(--font-inter)']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
