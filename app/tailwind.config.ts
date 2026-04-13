// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        freshRed: '#D32F2F', // Vitalidad
        iceWhite: '#F5F7FA', // Pureza
        deepBottle: '#1A1A1A', // Lujo
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
