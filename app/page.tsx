"use client";
import { Leaf, Zap, ShieldCheck } from "lucide-react";

export default function QuitoFreshMasterAlpha() {
  return (
    <>
      {/* Inyección directa de Tailwind y Fuentes para asegurar lujo visual instantáneo */}
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Inter:wght@300;400;700&display=swap" rel="stylesheet" />
      <style>{`
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .bg-ice-gray { background-color: #F8FAFC; }
        .text-fresh-red { color: #D32F2F; }
        .bg-fresh-red { background-color: #D32F2F; }
        .bg-deep-dark { background-color: #0A0A0A; }
      `}</style>

      <main className="font-sans antialiased text-deep-dark overflow-hidden">
        {/* Navegación de Lujo Minimalista */}
        <nav className="fixed top-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-deep-dark/90 backdrop-blur-lg border-b border-white/10">
          <span className="font-display text-2xl font-bold tracking-tighter text-white">QUITO FRESH</span>
          <button className="bg-fresh-red text-white text-xs px-6 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">
            SHOP NOW
          </button>
        </nav>

        {/* HERO SECTION - Experiencia Inmersiva */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 bg-deep-dark overflow-hidden">
          {/* Fondo degradado dinámico */}
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-b from-freshRed/20 to-transparent" />
          </div>

          <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
            {/* Título Monumental */}
            <h1 className="text-[18vw] font-display font-bold leading-none tracking-tighter text-white select-none relative">
              QUITO
              <span className="text-fresh-red italic absolute left-1/2 -translate-x-1/2 -bottom-[40%] text-[15vw]">FRESH</span>
            </h1>

            {/* Imagen de Producto con Efecto de Flotación */}
            <div className="relative mt-24 mb-16 transform hover:scale-105 transition-transform duration-700 ease-out">
              {/* Sombra de suelo premium */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-12 bg-black/50 blur-3xl rounded-full" />
              <img 
                src="/botella-hero.png" 
                alt="Quito Fresh Premium Cold-Pressed Juice" 
                className="relative z-10 mx-auto w-full max-w-[450px]"
              />
            </div>

            {/* Subtítulo y CTA */}
            <div className="relative z-20 mt-[-10vh]">
              <p className="text-white/70 text-base md:text-lg font-light max-w-lg mx-auto mb-10">
                La frescura de tenerlo todo. Pureza andina en cada botella.
              </p>
              <button className="bg-white text-fresh-red px-14 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform">
                PEDIR MI PACK PREMIUM
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE BENEFICIOS - THE LAB */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="text-5xl font-display font-bold italic text-deep-dark mb-4">La Ciencia de lo Natural</h2>
              <p className="text-gray-500 font-light">Nuestro compromiso con la pureza absoluta.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { icon: Leaf, t: "100% Orgánico", d: "Mora silvestre seleccionada de los valles andinos." },
                { icon: Zap, t: "Cold Pressed", d: "Preservamos enzimas y nutrientes esenciales." },
                { icon: ShieldCheck, t: "Sin Filtros", d: "Pureza absoluta, sin colorantes ni preservantes." }
              ].map((item, i) => (
                <div key={i} className="group p-12 rounded-[2rem] bg-ice-gray hover:bg-fresh-red transition-all duration-500 transform hover:-translate-y-2">
                  <div className="flex justify-center md:justify-start">
                    <item.icon className="w-16 h-16 text-fresh-red group-hover:text-white mb-8 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white font-display text-center md:text-left transition-colors">{item.t}</h3>
                  <p className="text-gray-500 group-hover:text-white/80 text-center md:text-left transition-colors">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION FINAL */}
        <section className="py-24 bg-fresh-red text-center">
          <h2 className="text-5xl md:text-6xl font-display font-bold italic text-white mb-12">Despierta tu Vitalidad Hoy</h2>
          <button className="bg-deep-dark text-white px-16 py-6 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg hover:scale-110 transition-transform">
            Quiero mi Pack Semanal
          </button>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-deep-dark text-white/50 text-center text-xs border-t border-white/10">
          © 2026 Quito Fresh | Powered by ECOS Branding & ORCA Studios
        </footer>
      </main>
    </>
  );
}
