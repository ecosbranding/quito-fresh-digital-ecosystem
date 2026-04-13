"use client";
import { motion } from "framer-motion";
import { useCart } from "@/store/useCart";

export default function QuitoFreshPage() {
  const { toggleCart } = useCart();

  return (
    <main className="bg-iceWhite min-h-screen font-sans">
      <section className="h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl md:text-9xl font-display font-bold text-deepBottle"
        >
          Quito <span className="text-freshRed italic">Fresh</span>
        </motion.h1>
        <p className="mt-4 text-xl text-gray-600 font-light max-w-lg">
          La frescura de tenerlo todo. Prensado en frío, 100% natural.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          onClick={toggleCart}
          className="mt-10 px-10 py-4 bg-freshRed text-white rounded-full font-bold tracking-widest shadow-xl"
        >
          ORDENAR PACK PREMIUM
        </motion.button>
        
        {/* Imagen de Producto */}
        <div className="mt-12 relative w-64 h-96">
           <img src="/botella-hero.png" alt="Quito Fresh Botella" className="object-contain w-full h-full drop-shadow-2xl" />
        </div>
      </section>
    </main>
  );
}
