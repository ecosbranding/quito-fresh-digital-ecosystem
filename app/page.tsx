"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Leaf, Zap, ShieldCheck } from "lucide-react";

export default function QuitoFreshMaster() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={targetRef} className="relative overflow-hidden">
      {/* Navegación Minimalista */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference p-8 flex justify-between items-center">
        <span className="font-display text-2xl font-bold text-white tracking-tighter">QUITO FRESH</span>
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full px-6 border border-white/20">
          <ShoppingCart className="text-white w-6 h-6" />
        </div>
      </nav>

      {/* HERO SECTION - CINEMATOGRÁFICO */}
      <section className="relative h-[120vh] flex items-center justify-center bg-deepDark">
        <motion.div style={{ y }} className="absolute inset-0 opacity-40">
           {/* Fondo degradado dinámico */}
           <div className="absolute inset-0 bg-gradient-to-b from-freshRed/20 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-[15vw] font-display font-bold leading-none text-white select-none"
          >
            QUITO <span className="text-freshRed italic">FRESH</span>
          </motion.h1>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="relative mt-[-10vh] animate-float"
          >
            <img 
              src="/botella-hero.png" 
              alt="Quito Fresh Premium" 
              className="mx-auto w-full max-w-[500px] drop-shadow-[0_50px_50px_rgba(211,47,47,0.4)]"
            />
          </motion.div>
        </div>
      </section>

      {/* VALOR AGREGADO - THE LAB */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            { icon: Leaf, t: "100% Orgánico", d: "Fruta seleccionada de los valles andinos." },
            { icon: Zap, t: "Cold Pressed", d: "Preservamos cada enzima y nutriente." },
            { icon: ShieldCheck, t: "Sin Filtros", d: "Pureza absoluta en cada botella." }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-3xl bg-iceGray hover:bg-freshRed transition-all duration-500">
              <item.icon className="w-12 h-12 text-freshRed group-hover:text-white mb-6" />
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white font-display">{item.t}</h3>
              <p className="text-gray-500 group-hover:text-white/80">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="py-20 bg-freshRed text-center">
        <h2 className="text-4xl md:text-6xl font-display text-white mb-10">Siente la frescura de tenerlo todo.</h2>
        <button className="bg-white text-freshRed px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-110 transition-transform">
          Quiero mi Pack Semanal
        </button>
      </section>
    </main>
  );
}
