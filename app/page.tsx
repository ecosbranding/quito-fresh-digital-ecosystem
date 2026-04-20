"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);
  
  // NUEVO ESTADO PARA LA RUEDA 3D
  const [activeIndex, setActiveIndex] = useState(0);

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
  ];

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
    const message = encodeURIComponent(
      `*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n` +
      `*────────────────────*\n\n` +
      `Hola, quiero elevar mi energía con el siguiente Pack:\n\n` +
      `${itemsText}\n\n` +
      `*────────────────────*\n` +
      `💰 *TOTAL A PAGAR: $${total}*\n` +
      `*────────────────────*\n\n` +
      `📍 _Por favor, confírmenme el tiempo de entrega para disfrutar de mi extracto 100% puro._`
    );
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
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
          margin-bottom: 20px;
          filter: url(#gel-viscosity);
        }

        /* DISEÑO DE LA RUEDA 3D */
        .wheel-container {
          position: relative;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1500px;
          overflow: visible;
        }

        .bottle-stack-item {
          position: absolute;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 250px;
        }

        .bottle-img {
          width: 220px;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
          z-index: 2;
        }

        /* EL NOMBRE VERTICAL (Señalado en tu imagen) */
        .vertical-name {
          position: absolute;
          left: -80px;
          top: 45%;
          transform: translateY(-50%) rotate(-90deg);
          font-family: 'Titan One', cursive;
          font-size: 3.5rem;
          white-space: nowrap;
          pointer-events: none;
          filter: url(#gel-viscosity);
          transition: 0.5s opacity;
          opacity: 0;
        }
        .active .vertical-name { opacity: 1; }

        .info-card-overlay {
          opacity: 0;
          transform: translateY(20px);
          transition: 0.5s;
          text-align: center;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 30px;
          margin-top: -40px;
          z-index: 5;
          width: 280px;
          border: 1px solid #EEE;
        }
        .active .info-card-overlay { opacity: 1; transform: translateY(0); }

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

        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
      ` }} />

      {/* Partículas y Nav (Preservados) */}
      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}

      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* Header (Preservado) */}
      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9 }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> EMPIEZA AQUÍ.</h1>
      </header>

      {/* SECCIÓN ACTUALIZADA: RUEDA 3D Y NOMBRE VERTICAL */}
      <section style={{ padding: '50px 0' }}>
        <h2 className="text-surtido-gel">NUESTROS EXTRACTOS</h2>
        <p style={{ textAlign: 'center', color: '#999', marginBottom: '40px' }}>Toca una botella para centrarla</p>
        
        <div className="wheel-container">
          {products.map((p, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;

            return (
              <div 
                key={p.id}
                className={`bottle-stack-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateX(${offset * 100}px) translateZ(${-Math.abs(offset) * 200}px) rotateY(${offset * -15}deg)`,
                  zIndex: 100 - Math.abs(offset),
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                  filter: !isActive ? 'brightness(0.6) blur(1px)' : 'none'
                }}
              >
                {/* NOMBRE VERTICAL SEGÚN IMAGEN */}
                <div className="vertical-name" style={{ color: p.available ? p.accent : '#DDD' }}>
                  {p.name}
                </div>

                <img src={BOTELLA_MARACUMORA_ASSET} alt={p.name} className="bottle-img" />

                <div className="info-card-overlay">
                  <div style={{ color: p.accent, fontWeight: 900, fontSize: '12px', marginBottom: '5px' }}>{p.tag}</div>
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>{p.desc}</p>
                  {p.available ? (
                    <>
                      <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '15px' }}>${p.price.toFixed(2)}</div>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
                    </>
                  ) : (
                    <div style={{ fontWeight: 800, color: '#CCC' }}>PRÓXIMAMENTE</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer y Carrito (Preservados) */}
      <footer style={{ background: '#000', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '50px', marginBottom: '20px', filter: 'brightness(2)' }} />
        <div style={{ fontSize: '10px', opacity: 0.4 }}>Hecho por ORCA Studios © 2026.</div>
      </footer>

      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className="text-bold" style={{ color: i.accent }}>{i.name} ({i.qty})</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)}>-</button>
                  <button onClick={() => updateQty(i.id, 1)}>+</button>
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
