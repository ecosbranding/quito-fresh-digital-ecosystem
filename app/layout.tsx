import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  style: ['italic', 'normal'],
  variable: '--font-cormorant' 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="bg-iceGray antialiased">{children}</body>
    </html>
  );
}
