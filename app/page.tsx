"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function QuitoFreshElite() {
  // --- ESTADOS Y LÓGICA BASE (NO TOCADOS) ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);
  
  // Estado para la rueda de productos
  const [activeProductId, setActiveProductId] = useState(1);
  const wheelRef = useRef(null);

  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; 
  const BOTELLA_ASSET = "/1000788391.png";

  useEffect(() => {
    setMounted(true);
    const handleInteraction = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      setMousePos({ x, y });
      const id = Math.random();
      setFogParticles(prev => [...prev.slice(-15), { id, x, y }]);
      setTimeout(() => setFogParticles(prev => prev.filter(p => p.id !== id)), 1000);
    };
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchmove', handleInteraction);

    // METADATOS ORIGINALES (PRESERVADOS)
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

  // LOS 8 PRODUCTOS (INTEGRIDAD TOTAL)
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

  const scrollWheel = (dir) => {
    if (wheelRef.current) {
      const move = dir === 'next' ? 380 : -380;
      wheelRef.current.scrollBy({ left: move, behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      {/* ESTILOS CSS - MEJORADOS SOLO EN SECCIÓN PRODUCTOS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        
        /* Efecto de Gel (PRESERVADO) */
        .gel-effect { filter: url(#gel-viscosity); }

        /* RUEDA DE PRODUCTOS PROFESIONAL */
        .wheel-wrapper {
          position: relative;
          padding: 80px 0;
          width: 100%;
        }
        .wheel-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 50px;
          padding: 100px 20%;
          scrollbar-width: none;
        }
        .wheel-container::-webkit-scrollbar { display: none; }

        .wheel-item {
          flex: 0 0 320px;
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        /* Nombre Vertical (Top 25k) */
        .vertical-name {
          position: absolute;
          left: -110px;
          top: 45%;
          transform: translateY(-50%) rotate(-90deg);
          font-family: 'Titan One', cursive;
          font-size: 3.8rem;
          white-space: nowrap;
          pointer-events: none;
          transition: 0.5s ease;
          z-index: 1;
        }

        /* Botella Ghost (Invisibles Próximamente) */
        .bottle-main {
          width: 240px;
          transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 2;
        }
        .bottle-ghost {
          opacity: 0.04;
          filter: grayscale(1) blur(1px);
        }

        .info-card-reveal {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: 0.6s ease;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          width: 300px;
          border-radius: 35px;
          border: 1px solid #F0F0F0;
          text-align: center;
          margin-top: -20px;
          z-index: 5;
        }
        .info-card-reveal.active {
          max-height: 450px;
          opacity: 1;
          margin-top: 30px;
          padding: 35px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.06);
        }

        /* Flechas de Navegación */
        .nav-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: #FFF; border: 1px solid #EEE;
          width: 60px; height: 60px; border-radius: 50%;
          cursor: pointer; z-index: 10; font-size: 24px;
          transition: 0.3s; display: flex; align-items: center; justify-content: center;
        }
        .nav-arrow:hover { background: ${CELESTE_LOGO}; color: white; border-color: ${CELESTE_LOGO}; }

        /* Niebla (PRESERVADO) */
        .fog-puff {
          position: fixed; pointer-events: none; z-index: 9999;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
          border-radius: 50%; filter: blur(15px);
          animation: puffOut 1.2s ease-out forwards;
        }
        @keyframes puffOut {
          0% { opacity: 0.6; transform: scale(0.3); }
          100% { opacity: 0; transform: scale(2.5); }
        }
      ` }} />

      {/* SVG FILTERS (PRESERVADOS) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-viscosity">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.1" specularExponent="35" lightingColor="#FFFFFF" result="spec">
            <fePointLight x="-5000" y="-10000" z="10000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </svg>

      {/* NIEBLA SENSORIAL (PRESERVADO) */}
      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}

      {/* NAVEGACIÓN (PRESERVADO) */}
      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000 }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '55px' }} />
        <button onClick={() => setIsCartOpen(true)} className="text-bold" style={{ background: CELESTE_LOGO, color: '#FFF', border: 'none', padding: '12px 30px', borderRadius: '50px', cursor: 'pointer', fontSize: '13px' }}>MI PACK ({cart.length})</button>
      </nav>

      {/* HERO (PRESERVADO) */}
      <header style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: '4.5rem', lineHeight: 0.9 }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span><br/>EMPIEZA AQUÍ.</h1>
      </header>

      {/* MISIÓN Y VISIÓN (RESTAURADO E ÍNTEGRO) */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
          <h3 className="gel-effect" style={{ fontFamily: 'Titan One', color: CELESTE_LOGO, fontSize: '1.8rem', marginBottom: '20px' }}>Nuestra Misión</h3>
          <p style={{ lineHeight: '1.8', fontSize: '15px' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, preservando su esencia vital en cada gota para un bienestar real.</p>
        </div>
        <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
          <h3 className="gel-effect" style={{ fontFamily: 'Titan One', color: CELESTE_LOGO, fontSize: '1.8rem', marginBottom: '20px' }}>Nuestra Visión</h3>
          <p style={{ lineHeight: '1.8', fontSize: '15px' }}>Ser referentes del bienestar premium en Ecuador, elevando el estándar de la alimentación consciente con tecnología y pasión.</p>
        </div>
        <div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="text-bold" style={{ fontSize: '4rem', margin: 0, lineHeight: 1 }}>2026</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '10px' }}>Felicidad directa a tu mano.</p>
        </div>
      </section>

      {/* SECCIÓN PRODUCTOS: INTERVENCIÓN SOLICITADA */}
      <section className="wheel-wrapper">
        <h2 className="gel-effect" style={{ textAlign: 'center', fontFamily: 'Titan One', color: CELESTE_LOGO, fontSize: '3.5rem', marginBottom: '40px' }}>NUESTRO SURTIDO</h2>
        
        <button className="nav-arrow" style={{ left: '5%' }} onClick={() => scrollWheel('prev')}>‹</button>
        <button className="nav-arrow" style={{ right: '5%' }} onClick={() => scrollWheel('next')}>›</button>

        <div className="wheel-container" ref={wheelRef}>
          {products.map(p => (
            <div key={p.id} className="wheel-item" onClick={() => setActiveProductId(p.id)}>
              {/* Nombre Vertical Dinámico */}
              <div className="vertical-name gel-effect" style={{ 
                color: p.available ? p.accent : '#EEE', 
                opacity: activeProductId === p.id ? 1 : 0.15,
                transform: `translateY(-50%) rotate(-90deg) scale(${activeProductId === p.id ? 1.1 : 0.9})`
              }}>
                {p.name}
              </div>
              
              {/* Botella con Efecto Ghost para no disponibles */}
              <img 
                src={BOTELLA_ASSET} 
                className={`bottle-main ${!p.available ? 'bottle-ghost' : ''}`}
                style={{ transform: activeProductId === p.id ? 'scale(1.15)' : 'scale(0.85)' }}
              />

              {/* Card de Información Revelada */}
              <div className={`info-card-reveal ${activeProductId === p.id ? 'active' : ''}`}>
                <span style={{ color: p.accent, fontWeight: 900, fontSize: '12px', letterSpacing: '2px' }}>{p.tag}</span>
                <p style={{ margin: '15px 0', fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{p.desc}</p>
                {p.available ? (
                  <>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>$1.00</div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }} 
                      style={{ background: p.accent, color: '#FFF', border: 'none', width: '100%', padding: '18px', borderRadius: '50px', fontWeight: 900, cursor: 'pointer' }}
                    >
                      AÑADIR AL PACK
                    </button>
                  </>
                ) : (
                  <div style={{ color: '#CCC', fontWeight: 900, marginTop: '20px' }}>MUY PRONTO</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER (PRESERVADO) */}
      <footer style={{ background: '#000', color: '#FFF', padding: '100px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer" style={{ height: '45px', filter: 'brightness(2)', marginBottom: '30px' }} />
        <p style={{ fontSize: '11px', opacity: 0.3, letterSpacing: '2px' }}>HECHO POR ECOS BRANDING & ORCA STUDIOS © 2026</p>
      </footer>

      {/* CARRITO (PRESERVADO) */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.5)' }} onClick={() => setIsCartOpen(false)}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '100%', background: '#FFF', padding: '40px' }} onClick={e => e.stopPropagation()}>
            <h2 className="text-bold">MI PACK</h2>
            <div style={{ margin: '40px 0' }}>{cart.length === 0 && "Tu pack está vacío."}</div>
            {cart.length > 0 && <button onClick={sendWhatsApp} style={{ width: '100%', background: '#25D366', color: '#FFF', padding: '20px', borderRadius: '50px', border: 'none', fontWeight: 900 }}>PEDIR POR WHATSAPP</button>}
          </div>
        </div>
      )}
    </div>
  );
}
