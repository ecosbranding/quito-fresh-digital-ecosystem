"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Estado para controlar qué botella muestra su información
  const [activeProductId, setActiveProductId] = useState(null);
  const carouselRef = useRef(null); // Para el control de la rueda

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);

  // CONSTANTES DEL CÓDIGO BASE (PRESERVADAS)
  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; 
  const BOTELLA_MARACUMORA_ASSET = "/1000788391.png";

  useEffect(() => {
    setMounted(true);
    
    const handleInteraction = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      setMousePos({ x, y });

      const id = Math.random();
      setFogParticles(prev => [...prev.slice(-15), { id, x, y }]);
      setTimeout(() => {
        setFogParticles(prev => prev.filter(p => p.id !== id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchmove', handleInteraction);
    
    // LÓGICA DE METADATOS (PRESERVADA)
    const forceMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    forceMeta('og:title', 'Quito Fresh | Pureza Real');
    forceMeta('og:description', 'Extractos puros prensados en frío de los Andes.');
    forceMeta('og:image', IMAGE_URL);
    forceMeta('og:url', SITE_URL);
    forceMeta('og:type', 'website');
    forceMeta('twitter:card', 'summary_large_image');

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
    };
  }, []);

  const products = [
    { id: 1, name: "Maracumora", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "Green Boost", desc: "Manzana, Apio, Espinaca y Jengibre", price: 1.00, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: 1.00, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "Gold Citrus", desc: "Maracuyá & Cítricos", price: 1.00, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
    { id: 5, name: "Vital Roots", desc: "Remolacha, Zanahoria y Naranja", price: 1.00, accent: "#D32F2F", tag: "PRÓXIMAMENTE", available: false },
    { id: 6, name: "Pure Aloe", desc: "Aloe Vera, Pepino y Menta", price: 1.00, accent: "#4CAF50", tag: "PRÓXIMAMENTE", available: false },
    { id: 7, name: "Amazon Vibe", desc: "Guayusa, Limón y Panela Natural", price: 1.00, accent: "#1B5E20", tag: "PRÓXIMAMENTE", available: false },
    { id: 8, name: "Tropic Glow", desc: "Piña, Coco y Cúrcuma", price: 1.00, accent: "#FFD600", tag: "PRÓXIMAMENTE", available: false },
  ];

  // LÓGICA DE CARRITO Y WHATSAPP (PRESERVADA)
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };
  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);
  const addToCart = (p) => {
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const sendWhatsApp = () => {
    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
    const itemsText = cart.map(i => `🥤 *${i.name.toUpperCase()}* — (${i.qty} unid.)`).join('\n');
    const message = encodeURIComponent(`*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n\n${itemsText}\n\n💰 *TOTAL: $${total}*`);
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  // Funciones de navegación para la "Rueda" profesional
  const scrollPrev = () => {
    carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };
  const scrollNext = () => {
    carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-viscosity">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.1" specularExponent="35" lightingColor="#FFFFFF" result="spec">
            <fePointLight x="-5000" y="-10000" z="10000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
        </filter>
      </svg>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Poiret+One&display=swap');

        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        
        .text-surtido-gel {
          font-family: 'Titan One', cursive;
          color: ${CELESTE_LOGO};
          text-align: center;
          font-size: 4rem;
          margin-bottom: 70px;
          line-height: 1.1;
          filter: url(#gel-viscosity);
        }

        .titulo-seccion-gel {
          font-family: 'Titan One', cursive;
          color: ${CELESTE_LOGO};
          margin-bottom: 20px;
          font-size: 1.8rem;
          text-transform: uppercase;
          filter: url(#gel-viscosity);
        }

        /* DISEÑO DE LA "RUEDA" (CARRUSEL PROFESIONAL) */
        .wheel-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 60px 0;
          gap: 20px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          perspective: 1500px; /* Efecto 3D de profundidad */
        }
        .wheel-container::-webkit-scrollbar { display: none; }

        .wheel-item {
          flex: 0 0 300px;
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        /* EL NOMBRE VERTICAL (Señalado en tu imagen) */
        .vertical-name {
          position: absolute;
          left: -80px;
          top: 45%;
          transform: translateY(-50%) rotate(-90deg);
          font-family: 'Titan One', cursive;
          font-size: 3.5rem; /* Más grande y audaz */
          white-space: nowrap;
          pointer-events: none;
          transition: 0.5s;
          filter: url(#gel-viscosity); /* Efecto de gel preservado y nítido */
          text-shadow: none;
        }

        /* Efecto de Botellas Invisibles para Próximamente */
        .bottle-asset {
          width: 220px;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
          transition: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 2;
        }
        .bottle-ghost {
          opacity: 0.05; /* Extremadamente transparente */
          filter: grayscale(1) drop-shadow(0 10px 20px rgba(0,0,0,0.05));
        }

        /* Revelación de Información de Compra */
        .reveal-info-box {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: 0.5s ease;
          text-align: center;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          width: 280px;
          margin-top: -30px;
          z-index: 5;
          border: 1px solid #EEE;
        }
        .reveal-info-box.open {
          max-height: 300px;
          opacity: 1;
          margin-top: 20px;
          padding: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        .btn-main:active { transform: scale(0.95); }

        /* Flechas de Navegación Profesionales */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: ${CELESTE_LOGO}22;
          border: none;
          color: ${CELESTE_LOGO};
          font-size: 2rem;
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: 0.3s;
        }
        .nav-arrow:hover { background: ${CELESTE_LOGO}44; }
        .prev-arrow { left: 20px; }
        .next-arrow { right: 20px; }

        /* Partículas y Niebla BASE (Preservadas) */
        .fog-puff {
          position: fixed; pointer-events: none; z-index: 9999;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
          border-radius: 50%; filter: blur(15px);
          animation: puffOut 1.2s ease-out forwards;
        }
        @keyframes puffOut {
          0% { opacity: 0.6; transform: scale(0.3) translateY(0); }
          100% { opacity: 0; transform: scale(2.5) translateY(-20px); }
        }
        .sensory-fog-layer {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 10;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(240, 248, 255, 0.4) 100%);
          animation: fogBreathe 8s ease-in-out infinite;
        }
        @keyframes fogBreathe {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      ` }} />

      {/* Capa sensorial y partículas BASE (Preservadas) */}
      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}
      <div className="sensory-fog-layer"></div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* Header y Misión/Visión BASE (Preservadas) */}
      <header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9 }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> EMPIEZA AQUÍ.</h1>
      </header>

      <section style={{ position: 'relative', padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="titulo-seccion-gel">Nuestra Misión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8 }}>Nutrir a nuestra comunidad con extractos puros.</p>
          </div>
          <div style={{ background: #F9F9F9, padding: '50px', borderRadius: '40px' }}>
            <h3 className="titulo-seccion-gel">Nuestra Visión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8 }}>Liderar el bienestar premium en Ecuador.</p>
          </div>
          <div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: 'white' }}>
            <div className="text-bold" style={{ fontSize: '3.5rem' }}>2026</div>
            <p style={{ fontSize: '15px' }}>Frescura absoluta del campo directamente a tu mano.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN ACTUALIZADA: Carrusel Profesional Tipo "Rueda" con Flechas y Revelación */}
      <section style={{ padding: '80px 0', position: 'relative' }}>
        <h2 className="text-surtido-gel">NUESTROS EXTRACTOS</h2>
        <p style={{ textAlign: 'center', color: '#AAA', fontSize: '14px', marginBottom: '40px' }}>Toca una botella para conconer más</p>
        
        {/* Flechas de Navegación */}
        <button className="nav-arrow prev-arrow" onClick={scrollPrev}>‹</button>
        <button className="nav-arrow next-arrow" onClick={scrollNext}>›</button>

        <div className="wheel-container" ref={carouselRef}>
          {products.map(p => (
            <div 
              key={p.id} 
              className="wheel-item"
              onClick={() => setActiveProductId(activeProductId === p.id ? null : p.id)}
            >
              <img 
                src={BOTELLA_MARACUMORA_ASSET} 
                alt={p.name} 
                className={`bottle-asset ${!p.available ? 'bottle-ghost' : ''}`}
              />
              
              {/* NOMBRE VERTICAL SEGÚN IMAGEN */}
              <div className="vertical-name" style={{ 
                color: p.available ? p.accent : '#CCC',
                opacity: activeProductId === p.id || p.available ? 1 : 0.4
              }}>
                {p.name}
              </div>

              {/* Caja de Revelación de Información Profesional */}
              <div className={`reveal-info-box ${activeProductId === p.id ? 'open' : ''}`}>
                <p style={{ fontSize: '14px', color: '#666', padding: '0 20px', marginBottom: '20px' }}>{p.desc}</p>
                {p.available ? (
                  <>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>${p.price.toFixed(2)}</div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }} 
                      className="btn-main" 
                      style={{ background: p.accent }}
                    >
                      AÑADIR AL PACK
                    </button>
                  </>
                ) : (
                  <div style={{ fontWeight: 800, color: '#BBB' }}>PRÓXIMAMENTE</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer y Carrito Lateral BASE (Preservados) */}
      <footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '55px', marginBottom: '30px', filter: 'brightness(2)' }} />
        <div style={{ fontSize: '10px', opacity: 0.4 }}>Hecho por ECOS Branding © 2026.</div>
      </footer>

      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div className="text-bold" style={{ fontSize: '1.2rem', color: i.accent }}>{i.name} ({i.qty})</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)}>+</button>
                  <button onClick={() => updateQty(i.id, 1)}>-</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px' }}>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
