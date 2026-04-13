import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        freshRed: '#D32F2F', 
        iceWhite: '#F5F7FA', 
        deepBottle: '#1A1A1A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)'],
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
export default config;
