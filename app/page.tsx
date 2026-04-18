"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function QuitoFreshUltimate() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fogActive, setFogActive] = useState(false);
  
  const CELESTE_LOGO = "#00ADEF"; 
  const SITE_URL = "https://quitofresh.vercel.app";
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";

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
    forceMeta('og:description', 'Extractos Cold Pressed de los Andes. ¡Siente la frescura!');
    forceMeta('og:image', IMAGE_URL);
    forceMeta('og:type', 'website');
    forceMeta('og:url', SITE_URL);
  }, []);

  const products = [
    { id: 1, name: "Maracumora", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "Green Boost", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "Gold Citrus", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
    { id: 5, name: "Vital Roots", desc: "Remolacha, Zanahoria y Naranja", price: null, accent: "#D32F2F", tag: "PRÓXIMAMENTE", available: false },
    { id: 6, name: "Pure Aloe", desc: "Aloe Vera, Pepino y Menta", price: null, accent: "#4CAF50", tag: "PRÓXIMAMENTE", available: false },
    { id: 7, name: "Amazon Vibe", desc: "Guayusa, Limón y Panela Natural", price: null, accent: "#1B5E20", tag: "PRÓXIMAMENTE", available: false },
    { id: 8, name: "Tropic Glow", desc: "Piña, Coco y Cúrcuma", price: null, accent: "#FFD600", tag: "PRÓXIMAMENTE", available: false },
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

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const triggerFog = () => {
    setFogActive(true);
    setTimeout(() => setFogActive(false), 2000);
  };

  const sendWhatsApp = () => {
    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
    const message = `*🏔️ ¡QUITO FRESH - PEDIDO PREMIUM! 🍃*\n\n` +
      `Hola equipo, quiero sentir la frescura real. Este es mi pack:\n\n` +
      cart.map(i => `🥤 *${i.name.toUpperCase()}* — (${i.qty} unidades)\n   _Subtotal: $${(i.price * i.qty).toFixed(2)}_`).join('\n\n') +
      `\n\n` +
      `*────────────────────*\n` +
      `💰 *TOTAL A CANCELAR: $${total}*\n` +
      `*────────────────────*\n\n` +
      `📍 _Quedo atento a la confirmación para el envío. ¡Gracias!_`;

    window.open(`https://wa.me/593995849214?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div 
      onClick={triggerFog}
      onTouchStart={triggerFog}
      style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');

        /* EFECTO CARAMELO CON GLOW CELESTE */
        .text-caramelo-premium {
          font-family: 'Titan One', cursive;
          color: white;
          text-transform: capitalize;
          background: linear-gradient(180deg, #FFFFFF 30%, #E0F7FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 0px 15px ${CELESTE_LOGO}) drop-shadow(0px 0px 30px ${CELESTE_LOGO}66);
          position: relative;
          display: inline-block;
          line-height: 1.2;
        }

        /* NIEBLA SENSORIAL */
        .fog-container {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 9999;
          transition: opacity 1s ease;
          opacity: 0.1;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        }

        .fog-breathing {
          animation: breath 8s ease-in-out infinite;
        }

        .fog-active {
          opacity: 0.6 !important;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,240,255,0.4) 100%);
        }

        @keyframes breath {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }

        .product-card {
          border: 1px solid #EEE;
          border-radius: 40px;
          padding: 40px;
          text-align: center;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: ${CELESTE_LOGO};
          box-shadow: 0 20px 40px rgba(0, 173, 239, 0.1);
        }

        .btn-main {
          background: ${CELESTE_LOGO};
          color: white;
          border: none;
          border-radius: 50px;
          padding: 18px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-main:hover {
          filter: brightness(1.1);
          box-shadow: 0 10px 20px ${CELESTE_LOGO}44;
        }
      ` }} />

      {/* CAPA DE NIEBLA SENSORIAL INTERACTIVA */}
      <div className={`fog-container fog-breathing ${fogActive ? 'fog-active' : ''}`}></div>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(15px)' }}>
        <img src="1000786698.png" alt="Quito Fresh" style={{ height: '50px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ padding: '10px 25px', fontSize: '12px' }}>
          MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO */}
      <header style={{ textAlign: 'center', padding: '100px 20px', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '14px', fontWeight: 900, color: CELESTE_LOGO, letterSpacing: '5px', marginBottom: '20px' }}>FRESCURA ANDINA</h2>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 0.9, marginBottom: '40px' }}>
            TU CUERPO <br />
            <span className="text-caramelo-premium" style={{ fontSize: '5.5rem' }}>Saludable</span>
          </h1>
          <img src="1000786698.png" style={{ maxWidth: '400px', margin: '0 auto' }} alt="Logo Principal" />
        </div>
      </header>

      {/* PRODUCTOS */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 900, marginBottom: '60px' }}>
          Surtido <span className="text-caramelo-premium">Premium</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card">
              <span style={{ fontSize: '10px', fontWeight: 900, color: p.available ? p.accent : '#CCC', letterSpacing: '2px' }}>{p.tag}</span>
              <h3 className="text-caramelo-premium" style={{ fontSize: '2.5rem', margin: '15px 0', filter: `drop-shadow(0px 0px 15px ${p.available ? p.accent : '#CCC'})` }}>
                {p.name}
              </h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>{p.desc}</p>
              
              {p.available ? (
                <>
                  <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '30px' }}>${p.price.toFixed(2)}</div>
                  <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent, width: '100%' }}>Añadir al Pack</button>
                </>
              ) : (
                <button disabled style={{ width: '100%', padding: '18px', borderRadius: '50px', background: '#F5F5F5', color: '#BBB', border: 'none', fontWeight: 900 }}>PRÓXIMAMENTE</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '100px 20px', background: '#000', color: 'white', textAlign: 'center' }}>
        <img src="1000786698.png" style={{ height: '60px', filter: 'brightness(3)', marginBottom: '30px' }} alt="Logo Footer" />
        <p style={{ fontSize: '12px', opacity: 0.5, letterSpacing: '2px' }}>QUITO FRESH — PUREZA REAL © 2026</p>
      </footer>

      {/* CARRITO */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '450px', height: '100%', background: 'white', zIndex: 10000, boxShadow: '-20px 0 60px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', animation: 'slideIn 0.5s ease' }}>
          <style>{`
            @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          `}</style>
          
          <div style={{ padding: '40px', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 900, fontSize: '20px' }}>TU SELECCIÓN 🧊</h2>
            <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>

          <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#CCC', fontWeight: 900, marginTop: '100px' }}>TU PACK ESTÁ VACÍO</div>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 900, color: item.accent, margin: 0 }}>{item.name.toUpperCase()}</h4>
                    <span style={{ fontSize: '12px', color: '#999' }}>${item.price.toFixed(2)} c/u</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #EEE', background: 'white' }}>-</button>
                    <span style={{ fontWeight: 900 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #EEE', background: 'white' }}>+</button>
                    <button onClick={() => removeItem(item.id)} style={{ marginLeft: '10px', border: 'none', background: 'none', cursor: 'pointer' }}>❌</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ padding: '40px', borderTop: '1px solid #EEE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 900, marginBottom: '30px' }}>
                <span>TOTAL</span>
                <span style={{ color: CELESTE_LOGO }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              <button onClick={sendWhatsApp} className="btn-main" style={{ width: '100%', background: '#25D366' }}>
                COMPLETAR PEDIDO WHATSAPP
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
