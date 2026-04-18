"use client";
import React, { useState, useEffect } from 'react';

/**
 * QUITO FRESH - VERSIÓN CORREGIDA VÉRTIGO
 * Ajustado a los estándares de Víctor Carvajal.
 */

export default function QuitoFreshDefinitivo() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fogParticles, setFogParticles] = useState([]);

  const CELESTE_LOGO = "#00ADEF";

  useEffect(() => {
    setMounted(true);
  }, []);

  // SISTEMA DE NIEBLA INTERACTIVA (Siente la frescura al tocar/mover)
  const addFog = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (!x || !y) return;

    const id = Math.random();
    setFogParticles(prev => [...prev.slice(-15), { id, x, y }]);
    setTimeout(() => {
      setFogParticles(prev => prev.filter(p => p.id !== id));
    }, 1200);
  };

  const products = [
    { id: 1, name: "Maracumora", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "Green Boost", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "Gold Citrus", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
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
    const items = cart.map(i => `🥤 *${i.name}* (${i.qty} unid.)`).join('\n');
    const message = encodeURIComponent(
      `*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n\n` +
      `Hola, quiero elevar mi energía con estos extractos puros:\n\n${items}\n\n` +
      `*────────────────────*\n` +
      `💰 *TOTAL A PAGAR: $${total}*\n` +
      `*────────────────────*\n\n` +
      `📍 *Por favor, confírmenme el tiempo de entrega.*`
    );
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div 
      onMouseMove={addFog} 
      onTouchMove={addFog}
      style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
        
        .font-titan { font-family: 'Titan One', cursive; }
        
        /* EFECTO CARAMELO MARACUMORA (Como la imagen 2 que te gusta) */
        .text-gel-premium {
          color: white;
          text-shadow: 0px 0px 15px ${CELESTE_LOGO}, 0px 0px 25px ${CELESTE_LOGO}99;
          filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
        }

        /* NIEBLA SENSORIAL */
        .fog-particle {
          position: fixed; pointer-events: none; z-index: 9999;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
          border-radius: 50%; filter: blur(20px);
          animation: fogFade 1.2s forwards;
        }

        @keyframes fogFade {
          0% { opacity: 0.5; transform: scale(0.4) translateY(0); }
          100% { opacity: 0; transform: scale(2.5) translateY(-30px); }
        }

        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; background: white; transition: 0.4s; }
        .btn-celeste { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px 30px; font-weight: 900; cursor: pointer; transition: 0.3s; }
        .btn-celeste:hover { transform: scale(1.05); }
      ` }} />

      {/* CAPA DE NIEBLA INTERACTIVA */}
      {fogParticles.map(p => (
        <div key={p.id} className="fog-particle" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}

      {/* NAVBAR */}
      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '55px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-celeste" style={{ fontSize: '13px' }}>MI PACK ({cart.length})</button>
      </nav>

      {/* HERO */}
      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="font-titan" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '20px' }}>
          TU VIDA <br/> <span className="text-gel-premium" style={{ fontSize: '5rem' }}>SALUDABLE</span>
        </h1>
        <img src="1000786698.png" style={{ maxWidth: '320px', margin: '0 auto', display: 'block' }} />
      </header>

      {/* SECCIÓN PRODUCTOS */}
      <section style={{ padding: '40px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: '2rem', marginBottom: '50px' }}>NUESTRO SURTIDO PREMIUM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card" style={{ borderColor: p.available ? p.accent : '#EEE' }}>
              <span style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px' }}>{p.tag}</span>
              <h3 className="font-titan text-gel-premium" style={{ color: p.available ? p.accent : '#CCC', fontSize: '2.8rem', margin: '15px 0' }}>{p.name}</h3>
              <p style={{ color: '#888', fontSize: '14px', marginBottom: '25px' }}>{p.desc}</p>
              {p.price && <p style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '25px' }}>${p.price.toFixed(2)}</p>}
              <button 
                onClick={() => addToCart(p)}
                className="btn-celeste" 
                style={{ background: p.available ? p.accent : '#F5F5F5', color: p.available ? 'white' : '#BBB', width: '100%' }}
                disabled={!p.available}
              >
                {p.available ? 'AÑADIR AL PACK' : 'PRÓXIMAMENTE'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL CARRITO */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 1000, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            <h3 style={{ fontWeight: 900 }}>MI SELECCIÓN</h3>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px' }}>✕</button>
          </div>
          <div style={{ flex: 1 }}>
            {cart.map(item => (
              <div key={item.id} style={{ marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #F9F9F9' }}>
                <p style={{ fontWeight: 900, color: item.accent }}>{item.name} x{item.qty}</p>
                <p style={{ color: CELESTE_LOGO, fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <button onClick={sendWhatsApp} className="btn-celeste" style={{ background: '#25D366', fontSize: '16px' }}>CONFIRMAR POR WHATSAPP 📲</button>
        </div>
      )}
    </div>
  );
}
