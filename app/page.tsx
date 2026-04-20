"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Estado para controlar qué botella muestra su información
  const [activeProductId, setActiveProductId] = useState(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);

  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; 
  const BOTELLA_MARACUMORA_ASSET = "1000788391.png";

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
    { id: 7, name: "Amazon Vibe", desc: "Guayusa, Limón y Panela Natural", price: 1.00, accent: "#1B5E20", tag: "PRÓXIMAMENTE", available: false },
    { id: 8, name: "Tropic Glow", desc: "Piña, Coco y Cúrcuma", price: 1.00, accent: "#FFD600", tag: "PRÓXIMAMENTE", available: false },
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
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="6" specularConstant="1.5" specularExponent="50" lightingColor="#FFFFFF" result="spec">
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
          line-height: 1.1;
          filter: url(#gel-viscosity);
        }

        .text-gel-caramelo-premium {
          font-family: 'Titan One', cursive;
          filter: url(#gel-viscosity);
          line-height: 1.1;
          transition: 0.3s ease;
        }

        /* Estructura de la Rueda (Carousel) */
        .wheel-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 60px 0;
          gap: 20px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
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

        /* Efecto Transparente para botellas Próximamente */
        .bottle-img {
          width: 220px;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
          transition: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .bottle-ghost {
          opacity: 0.3;
          filter: grayscale(1) drop-shadow(0 10px 20px rgba(0,0,0,0.05));
        }
        .wheel-item:hover .bottle-img {
          transform: scale(1.05) translateY(-10px);
        }

        /* Revelación de Información */
        .product-reveal-info {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: 0.5s ease-in-out;
          text-align: center;
          width: 100%;
          margin-top: 0;
        }
        .product-reveal-info.active {
          max-height: 250px;
          opacity: 1;
          margin-top: 20px;
        }

        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        .btn-main:active { transform: scale(0.95); }
        
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

      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontWeight: 900, fontSize: '12px', color: CELESTE_LOGO, marginBottom: '20px' }}>ESTILO DE VIDA FRESH</div>
        <h1 className="text-bold" style={{ fontSize: '3rem', lineHeight: 1, margin: 0 }}>EXPLORA EL <span style={{ color: CELESTE_LOGO }}>SABOR</span></h1>
      </header>

      {/* SECCIÓN ACTUALIZADA: Carrusel Tipo Rueda con Interacción */}
      <section style={{ padding: '40px 0', position: 'relative' }}>
        <h2 className="text-surtido-gel">NUESTROS EXTRACTOS</h2>
        <p style={{ textAlign: 'center', color: '#AAA', fontSize: '14px', marginBottom: '20px' }}>Desliza y toca la botella para conocer más</p>
        
        <div className="wheel-container">
          {products.map(p => (
            <div 
              key={p.id} 
              className="wheel-item"
              onClick={() => setActiveProductId(activeProductId === p.id ? null : p.id)}
            >
              <img 
                src={BOTELLA_MARACUMORA_ASSET} 
                alt={p.name} 
                className={`bottle-img ${!p.available ? 'bottle-ghost' : ''}`}
              />
              
              <h3 className="text-gel-caramelo-premium" style={{ 
                fontSize: '2rem', 
                marginTop: '15px', 
                color: p.available ? p.accent : '#CCC',
                opacity: activeProductId === p.id || p.available ? 1 : 0.5
              }}>
                {p.name}
              </h3>

              {/* Contenido que se revela al hacer Click */}
              <div className={`product-reveal-info ${activeProductId === p.id ? 'active' : ''}`}>
                <p style={{ fontSize: '14px', color: '#888', padding: '0 40px', marginBottom: '15px' }}>{p.desc}</p>
                {p.available ? (
                  <div style={{ padding: '0 30px' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '15px' }}>${p.price.toFixed(2)}</div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }} 
                      className="btn-main" 
                      style={{ background: p.accent }}
                    >
                      AÑADIR AL PACK
                    </button>
                  </div>
                ) : (
                  <div style={{ fontWeight: 900, color: '#BBB', textTransform: 'uppercase' }}>Próximamente</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer y Carrito se mantienen idénticos para no romper funcionalidad */}
      <footer style={{ background: '#000', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '40px', marginBottom: '20px', filter: 'brightness(2)' }} />
        <div style={{ fontSize: '10px', opacity: 0.4 }}>ORCA Studios © 2026.</div>
      </footer>

      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
            <span className="text-bold">TU PACK</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{ flex: 1 }}>
                  <div className="text-bold" style={{ color: i.accent }}>{i.name}</div>
                  <div style={{ fontSize: '13px', color: CELESTE_LOGO }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>+</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: `1px solid ${CELESTE_LOGO}22` }}>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
            </div>
          )}
        </div>
      )}

      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}
    </div>
  );
}
