"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshMaestroFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fogParticles, setFogParticles] = useState([]);

  const SITE_URL = "https://quitofresh.vercel.app"; 
  const CELESTE_LOGO = "#00ADEF"; 

  useEffect(() => {
    setMounted(true);
    // Inyección de Meta Tags (Manteniendo lo que funciona)
    const forceMeta = (p, c) => {
      let el = document.querySelector(`meta[property="${p}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', p); document.head.appendChild(el); }
      el.setAttribute('content', c);
    };
    forceMeta('og:title', 'Quito Fresh | Pureza Real');
    forceMeta('og:image', 'https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg');
  }, []);

  // SISTEMA DE NIEBLA INTERACTIVA (CORREGIDO)
  const triggerFog = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    const id = Date.now();
    setFogParticles(prev => [...prev.slice(-10), { id, x, y }]);
    setTimeout(() => setFogParticles(prev => prev.filter(p => p.id !== id)), 1500);
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

  const sendWhatsApp = () => {
    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
    const message = `*🏔️ ¡PEDIDO QUITO FRESH! 🍃*\n\nHola, quiero mi Pack Saludable:\n\n` +
      cart.map(i => `🥤 *${i.name}* (${i.qty} un.)`).join('\n') +
      `\n\n*TOTAL: $${total}*\n\n✨ _Enviado desde quitofresh.app_`;
    window.open(`https://wa.me/593995849214?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div onMouseMove={triggerFog} onTouchMove={triggerFog} style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}>
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-viscosity"><feGaussianBlur stdDeviation="2" result="blur" /><feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="40" lightingColor="#FFF" result="spec"><fePointLight x="-5000" y="-10000" z="10000" /></feSpecularLighting><feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" /><feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" /></filter>
      </svg>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        
        .text-gel-caramelo-premium {
          font-family: 'Titan One', cursive;
          color: white;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.05), 0px 0px 15px ${CELESTE_LOGO}, 0px 0px 30px ${CELESTE_LOGO}66;
          filter: url(#gel-viscosity);
        }

        .fog-particle {
          position: fixed; pointer-events: none; background: radial-gradient(circle, rgba(200, 240, 255, 0.4) 0%, transparent 70%);
          border-radius: 50%; z-index: 9999; filter: blur(20px); animation: fadeOut 1.5s forwards;
        }
        @keyframes fadeOut { 0% { opacity: 0.5; transform: scale(0.5); } 100% { opacity: 0; transform: scale(2.5); } }

        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; transition: 0.3s; width: 100%; }
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; background: white; transition: 0.4s; }
      ` }} />

      {/* NIEBLA INTERACTIVA */}
      {fogParticles.map(p => (
        <div key={p.id} className="fog-particle" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }}></div>
      ))}

      {/* NAVEGACIÓN */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9 }}>TU VIDA <br/><span className="text-gel-caramelo-premium" style={{ fontSize: '5.5rem' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '40px auto', display: 'block' }} />
      </header>

      {/* PRODUCTOS (COLORES CORREGIDOS) */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#1A1A1A' }}>NUESTRO SURTIDO PREMIUM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card" style={{ borderColor: p.available ? p.accent : '#EEE' }}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '12px', marginBottom: '10px' }}>{p.tag}</div>
              <h3 className="text-gel-caramelo-premium" style={{ fontSize: '2.8rem', color: p.available ? p.accent : '#CCC', marginBottom: '15px' }}>{p.name}</h3>
              <p style={{ color: '#888', marginBottom: '20px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px' }}>${p.price.toFixed(2)}</div>}
              {p.available ? (
                <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
              ) : (
                <button disabled style={{ background: '#F5F5F5', color: '#BBB', border: 'none', padding: '15px', borderRadius: '50px', width: '100%' }}>PRÓXIMAMENTE</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CARRITO */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE' }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div><div className="text-bold" style={{ color: i.accent }}>{i.name}</div><div>${(i.price * i.qty).toFixed(2)}</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={() => updateQty(i.id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: '1px solid #EEE' }}>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP 📲</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
