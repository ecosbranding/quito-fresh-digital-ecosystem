"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fogParticles, setFogParticles] = useState([]);

  const CELESTE_LOGO = "#00ADEF"; 

  useEffect(() => {
    setMounted(true);
    const handleInteraction = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      const id = Math.random();
      setFogParticles(prev => [...prev.slice(-12), { id, x, y }]);
      setTimeout(() => {
        setFogParticles(prev => prev.filter(p => p.id !== id));
      }, 1000);
    };
    window.addEventListener('mousemove', handleInteraction);
    return () => window.removeEventListener('mousemove', handleInteraction);
  }, []);

  const products = [
    { id: 1, name: "Maracumora", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "Green Boost", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "Gold Citrus", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
  ];

  // --- LÓGICA DE ACTUALIZACIÓN ---
  const addToCart = (p) => {
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id)); // ACTUALIZACIÓN 2
  const clearCart = () => setCart([]); // ACTUALIZACIÓN 1

  const sendWhatsApp = () => {
    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
    const itemsText = cart.map(i => `🥤 *${i.name.toUpperCase()}* — (${i.qty} unid.)`).join('\n');
    const message = encodeURIComponent(`*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n\nPedido:\n${itemsText}\n\n*TOTAL: $${total}*`);
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
        .text-gel { font-family: 'Titan One', cursive; color: white; filter: url(#gel-viscosity); text-shadow: 0px 3px 0px rgba(0,0,0,0.1); }
        .titulo-celeste { font-family: 'Titan One', cursive; color: ${CELESTE_LOGO}; text-align: center; font-size: 3.5rem; }
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; }
        .fog-puff { position: fixed; pointer-events: none; z-index: 9999; background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%); border-radius: 50%; filter: blur(15px); animation: puff 1s forwards; }
        @keyframes puff { 0% { opacity: 0.5; transform: scale(0.5); } 100% { opacity: 0; transform: scale(2); } }
      ` }} />

      {/* SVG FILTERS */}
      <svg style={{ position: 'absolute', height: 0 }}><filter id="gel-viscosity"><feGaussianBlur stdDeviation="1.2" /><feSpecularLighting surfaceScale="5" specularExponent="30" lightingColor="#fff"><fePointLight x="-50" y="-100" z="200" /></feSpecularLighting><feComposite in2="SourceAlpha" operator="in" /><feComposite in="SourceGraphic" operator="arithmetic" k2="1" k3="1" /></filter></svg>

      {fogParticles.map(p => <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: 100, height: 100 }} />)}

      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', sticky: 'top', background: 'white' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '50px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '10px 20px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      <section style={{ padding: '80px 5%' }}>
        <h2 className="titulo-celeste">NUESTRO SURTIDO PREMIUM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '50px' }}>
          {products.map(p => (
            <div key={p.id} style={{ border: '1.5px solid #EEE', borderRadius: '40px', padding: '40px', textAlign: 'center' }}>
              <h3 className="text-gel" style={{ fontSize: '2.5rem', color: p.available ? p.accent : '#CCC' }}>{p.name}</h3>
              <p style={{ color: '#888', margin: '15px 0' }}>{p.desc}</p>
              {p.available ? <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR</button> : <button disabled style={{ background: '#F5F5F5', color: '#BBB', borderRadius: '50px', padding: '15px', width: '100%', border: 'none' }}>PRÓXIMAMENTE</button>}
            </div>
          ))}
        </div>
      </section>

      {/* CARRITO CON ACTUALIZACIONES */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
          <div style={{ position: 'absolute', right: 0, top: 0, width: '100%', maxWidth: '400px', height: '100%', background: 'white', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <h3 style={{ fontWeight: 900 }}>TU SELECCIÓN</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cart.map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 900, color: i.accent }}>{i.name}</div>
                    <div style={{ fontSize: '12px' }}>${(i.price * i.qty).toFixed(2)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => updateQty(i.id, -1)}>-</button>
                    <span>{i.qty}</span>
                    <button onClick={() => updateQty(i.id, 1)}>+</button>
                    <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none' }}>❌</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px' }}>
                <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #DDD', padding: '10px', borderRadius: '50px', marginBottom: '10px' }}>VACIAR TODO EL PACK</button>
                <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
