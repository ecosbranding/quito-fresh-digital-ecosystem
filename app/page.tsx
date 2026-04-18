"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshMaestroFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fogParticles, setFogParticles] = useState([]); // Sistema de frescura interactiva

  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF";

  useEffect(() => {
    setMounted(true);
    
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
  }, []);

  // FUNCIÓN DE NIEBLA INTERACTIVA (Punto 2)
  const handleInteraction = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (!x || !y) return;

    const id = Math.random();
    setFogParticles(prev => [...prev.slice(-20), { id, x, y }]);
    setTimeout(() => {
      setFogParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  const products = [
    { id: 1, name: "Maracumora", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "Green Boost", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "Gold Citrus", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
  ];

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const addToCart = (p) => {
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  // WHATSAPP ELITE (Punto 3)
  const sendWhatsApp = () => {
    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
    const orderItems = cart.map(i => `🥤 *${i.name.toUpperCase()}* — (${i.qty} unid.)`).join('\n');
    
    const message = encodeURIComponent(
      `*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n` +
      `*────────────────────*\n\n` +
      `Hola, quiero elevar mi energía con el siguiente Pack:\n\n` +
      `${orderItems}\n\n` +
      `*────────────────────*\n` +
      `💰 *TOTAL A PAGAR: $${total}*\n` +
      `*────────────────────*\n\n` +
      `📍 _Por favor, confírmenme el tiempo de entrega para disfrutar de mi extracto 100% puro._`
    );
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div 
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}
    >
      
      {/* SVG FILTERS MEJORADOS (Punto 1: Visibilidad del difuminado) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-viscosity">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="6" specularConstant="1.2" specularExponent="35" lightingColor="#CEE9F2" result="spec">
            <fePointLight x="-5000" y="-10000" z="10000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
        </filter>
      </svg>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Poiret+One&display=swap');

        .font-titan { font-family: 'Titan One', cursive; }
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        
        .text-gel-caramelo-premium {
          font-family: 'Titan One', cursive;
          position: relative;
          color: white;
          text-shadow: 
            0px 4px 0px rgba(0,0,0,0.1), 
            0px 0px 25px ${CELESTE_LOGO}AA,
            0px 0px 45px ${CELESTE_LOGO}66;
          filter: url(#gel-viscosity);
          line-height: 1.1;
        }

        /* NIEBLA INTERACTIVA (Punto 2) */
        .fog-puff {
          position: fixed; pointer-events: none; z-index: 9999;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 75%);
          border-radius: 50%; filter: blur(12px);
          animation: puffOut 1s ease-out forwards;
        }

        @keyframes puffOut {
          0% { opacity: 0.7; transform: scale(0.2); }
          100% { opacity: 0; transform: scale(2.5); }
        }

        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; background: white; transition: 0.4s; }
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; }
        
        .sensory-fog-layer {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 5;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(240, 248, 255, 0.3) 100%);
          animation: fogBreathe 8s ease-in-out infinite;
        }

        @keyframes fogBreathe {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
      ` }} />

      {/* RENDER DE NIEBLA INTERACTIVA */}
      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 40, top: p.y - 40, width: '80px', height: '80px' }} />
      ))}
      <div className="sensory-fog-layer"></div>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '55px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO */}
      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9 }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786698.png" style={{ maxWidth: '350px', margin: '40px auto', display: 'block' }} />
      </header>

      {/* PRODUCTOS */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-gel-caramelo-premium" style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '60px', color: '#1A1A1A' }}>NUESTRO SURTIDO PREMIUM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card" style={{ borderColor: p.available ? p.accent : '#EEE' }}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-gel-caramelo-premium" style={{ fontSize: '2.5rem', color: p.available ? p.accent : '#999' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '30px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>${p.price.toFixed(2)}</div>}
              {p.available ? (
                <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
              ) : (
                <button disabled style={{ background: '#F5F5F5', color: '#BBB', border: 'none', padding: '18px', borderRadius: '50px', width: '100%', fontWeight: 900 }}>PRÓXIMAMENTE</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MODAL CARRITO */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE' }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div className="text-bold" style={{ color: i.accent }}>{i.name}</div>
                  <div style={{ color: CELESTE_LOGO, fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ borderRadius: '50%', width: '25px', height: '25px', border: '1px solid #EEE' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ borderRadius: '50%', width: '25px', height: '25px', border: '1px solid #EEE' }}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '30px', borderTop: '1px solid #EEE' }}>
            <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" style={{ height: '50px', marginBottom: '20px', filter: 'brightness(2)' }} />
        <p style={{ fontSize: '10px', opacity: 0.4 }}>ORCA Studios © 2026. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
