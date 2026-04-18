"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshDefinitivo() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  const CELESTE_LOGO = "#00ADEF";

  useEffect(() => {
    setMounted(true);
  }, []);

  // SISTEMA DE NIEBLA SENSORIAL AL TACTO
  const handleInteraction = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (!x || !y) return;

    const id = Date.now() + Math.random();
    setParticles(prev => [...prev.slice(-12), { id, x, y }]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);
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
    const items = cart.map(i => `🥤 *${i.name}* x${i.qty}`).join('\n');
    const message = encodeURIComponent(
      `*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n\n` +
      `Hola, quiero elevar mi energía con estos extractos:\n\n${items}\n\n` +
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
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
        
        .font-titan { font-family: 'Titan One', cursive; }
        
        .text-gel {
          color: white;
          text-shadow: 0px 0px 15px ${CELESTE_LOGO}, 0px 0px 25px ${CELESTE_LOGO}88;
          filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
        }

        .fog-particle {
          position: fixed; pointer-events: none; z-index: 9999;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
          border-radius: 50%; filter: blur(15px);
          animation: particleFade 1s forwards;
        }

        @keyframes particleFade {
          0% { opacity: 0.6; transform: scale(0.3); }
          100% { opacity: 0; transform: scale(2); }
        }

        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.3s; }
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px 30px; font-weight: 900; cursor: pointer; }
      ` }} />

      {/* NIEBLA DINÁMICA */}
      {particles.map(p => (
        <div key={p.id} className="fog-particle" style={{ left: p.x - 40, top: p.y - 40, width: '80px', height: '80px' }} />
      ))}

      {/* NAV */}
      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderBottom: '1px solid #EEE', position: 'sticky', top: 0, zIndex: 100 }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '50px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main">PACK ({cart.length})</button>
      </nav>

      {/* HERO */}
      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="font-titan" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '20px' }}>
          TU VIDA <br/> <span className="text-gel" style={{ fontSize: '5rem' }}>SALUDABLE</span>
        </h1>
        <img src="1000786698.png" style={{ maxWidth: '300px', margin: '0 auto' }} />
      </header>

      {/* PRODUCTOS */}
      <section style={{ padding: '40px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: '2rem', marginBottom: '40px' }}>NUESTRO SURTIDO PREMIUM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card" style={{ borderColor: p.available ? p.accent : '#EEE' }}>
              <span style={{ color: p.available ? p.accent : '#CCC', fontSize: '12px', fontWeight: 900 }}>{p.tag}</span>
              <h3 className="font-titan text-gel" style={{ color: p.available ? p.accent : '#CCC', fontSize: '2.5rem', margin: '15px 0' }}>{p.name}</h3>
              <p style={{ color: '#888', marginBottom: '20px' }}>{p.desc}</p>
              {p.price && <p style={{ fontSize: '2.5rem', fontWeight: 900 }}>${p.price.toFixed(2)}</p>}
              <button 
                onClick={() => addToCart(p)}
                className="btn-main" 
                style={{ background: p.available ? p.accent : '#EEE', color: p.available ? 'white' : '#BBB', width: '100%', marginTop: '20px' }}
                disabled={!p.available}
              >
                {p.available ? 'AÑADIR AL PACK' : 'MUY PRONTO'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL CARRITO */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '350px', height: '100%', background: 'white', zIndex: 1000, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h3 style={{ fontWeight: 900 }}>MI SELECCIÓN</h3>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>✕</button>
          </div>
          <div style={{ flex: 1 }}>
            {cart.map(item => (
              <div key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #F5F5F5', paddingBottom: '10px' }}>
                <p style={{ fontWeight: 900 }}>{item.name} x{item.qty}</p>
                <p style={{ color: CELESTE_LOGO }}>${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP 📲</button>
        </div>
      )}
    </div>
  );
}
