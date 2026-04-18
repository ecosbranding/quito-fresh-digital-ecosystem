"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);

  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; 

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
    
    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
    };
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

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Filtro de Viscosidad para Efecto Gel */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-viscosity-clean">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.2" specularExponent="35" lightingColor="#FFFFFF" result="spec">
            <fePointLight x="-5000" y="-10000" z="10000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </svg>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        .text-gel { font-family: 'Titan One', cursive; filter: url(#gel-viscosity-clean); line-height: 1.1; }
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: white; }
        .featured { border: 4px solid #E91E63; }
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        .fog-puff { position: fixed; pointer-events: none; z-index: 9999; background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%); border-radius: 50%; filter: blur(15px); animation: puffOut 1.2s forwards; }
        @keyframes puffOut { 0% { opacity: 0.6; transform: scale(0.3); } 100% { opacity: 0; transform: scale(2.5); } }
      ` }} />

      {/* Navegación */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>
          MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* Hero */}
      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9 }}>
          TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.
        </h1>
      </header>

      {/* Misión, Visión y Llevando Felicidad */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="text-gel" style={{ color: CELESTE_LOGO, fontSize: '1.8rem' }}>Nuestra Misión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina.</p>
          </div>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="text-gel" style={{ color: CELESTE_LOGO, fontSize: '1.8rem' }}>Nuestra Visión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Ser líderes en bienestar premium en Ecuador.</p>
          </div>
          <div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: 'white' }}>
            <h3 className="text-bold" style={{ fontSize: '1.2rem' }}>Llevando Felicidad</h3>
            <div className="text-bold" style={{ fontSize: '3.5rem' }}>2026</div>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>Frescura absoluta del campo directamente a tu mano.</p>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-gel" style={{ color: CELESTE_LOGO, textAlign: 'center', fontSize: '3.5rem', marginBottom: '60px' }}>
          NUESTRO SURTIDO PREMIUM
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-gel" style={{ fontSize: '2.5rem', margin: '0 0 10px', color: p.available ? p.accent : '#999' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '30px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>${p.price.toFixed(2)}</div>}
              <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.available ? p.accent : '#EEE' }} disabled={!p.available}>
                {p.available ? 'AÑADIR AL PACK' : 'PRÓXIMAMENTE'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pie de Página Web */}
      <footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '55px', marginBottom: '30px', filter: 'brightness(2)' }} />
        <div style={{ fontSize: '10px', opacity: 0.4, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Hecho por <span style={{ fontWeight: 800 }}>ECOS Branding</span> & <span style={{ fontWeight: 800 }}>ORCA Studios</span> © 2026.
        </div>
      </footer>

      {/* Carrito con Suma Total y Vaciar */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE' }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{ flex: 1 }}>
                  <div className="text-bold" style={{ color: i.accent }}>{i.name}</div>
                  <div style={{ fontSize: '13px', color: CELESTE_LOGO, fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>+</button>
                  <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}>❌</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: `1px solid ${CELESTE_LOGO}22` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '25px' }}>
                <span>TOTAL</span>
                <span style={{ color: CELESTE_LOGO }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #DDD', color: '#999', padding: '12px', borderRadius: '50px', fontWeight: 800, fontSize: '11px', marginBottom: '15px', cursor: 'pointer' }}>
                VACIAR TODO EL PACK
              </button>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP 📲</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
