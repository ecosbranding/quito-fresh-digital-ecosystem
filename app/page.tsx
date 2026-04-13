"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/useCart";
import Image from "next/image";

// --- SUB-COMPONENTE: HERO ---
const Hero = () => (
  <section className="relative h-screen flex items-center justify-center bg-iceWhite overflow-hidden">
    <div className="container mx-auto px-6 grid md:grid-cols-2 items-center z-10">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-8xl font-display font-bold text-deepBottle leading-tight">
          Quito <br /><span className="text-freshRed italic">Fresh</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-md">La frescura de tenerlo todo en una botella. Prensado en frío.</p>
        <button onClick={useCart.getState().toggleCart} className="mt-10 px-8 py-4 bg-freshRed text-white rounded-full font-bold shadow-2xl">
          ORDENAR AHORA
        </button>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <Image src="/botella-hero.png" alt="Quito Fresh" width={500} height={800} className="drop-shadow-2xl" />
      </motion.div>
    </div>
  </section>
);

// --- SUB-COMPONENTE: THE LAB ---
const TheLab = () => {
  const ingredients = [
    { name: "Mora Silvestre", benefit: "Antioxidantes", x: -150, y: -50 },
    { name: "Agua de Vertiente", benefit: "Pureza", x: 150, y: 50 },
  ];
  return (
    <section className="py-24 bg-deepBottle text-white text-center relative overflow-hidden">
      <h2 className="text-5xl font-display italic mb-20">La Ciencia de lo Natural</h2>
      <div className="relative h-[500px] flex items-center justify-center">
        <Image src="/botella-lab.png" width={200} height={400} alt="Lab" className="z-20" />
        {ingredients.map((ing, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: ing.x, y: ing.y }} className="absolute bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
            <p className="text-freshRed font-bold text-xs">{ing.name}</p>
            <p className="text-sm text-gray-300">{ing.benefit}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function QuitoFreshWeb() {
  return (
    <main>
      <Hero />
      <TheLab />
      <section className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-display font-bold">Fresh Pass</h2>
          <p className="text-gray-500">Tu dosis semanal de energía.</p>
        </div>
        {/* Aquí irían las SubscriptionCards */}
      </section>
    </main>
  );
}
