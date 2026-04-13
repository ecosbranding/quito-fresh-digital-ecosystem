import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  style: ['italic', 'normal'],
  variable: '--font-cormorant' 
});

export const metadata = {
  title: 'Quito Fresh | La Frescura de Tenerlo Todo',
  description: 'Jugos premium prensados en frío para un estilo de vida de élite.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased selection:bg-freshRed selection:text-white">
        {children}
      </body>
    </html>
  );
}
