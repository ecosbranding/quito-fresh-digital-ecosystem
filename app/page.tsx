"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);

  // CONFIGURACIÓN DE IDENTIDAD Y ASSETS
  const SITE_URL = "https://quitofresh.vercel.app";
  const CELESTE_LOGO = "#00ADEF";
  // Nombre del archivo que diseñamos con las gotas
  const BOTELLA_MARACUMORA = "/1000788391.png"; 

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

  const sendWhatsApp = () => {
    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
    const itemsText = cart.map(i => `🥤 *${i.name.toUpperCase()}* — (${i.qty} unid.)`).join('\n');
    const message = encodeURIComponent(`*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n*────────────────────*\n\nHola, quiero elevar mi energía con el siguiente Pack:\n\n${itemsText}\n\n*────────────────────*\n💰 *TOTAL A PAGAR: $${total}*\n*────────────────────*\n\n📍 _Por favor, confírmenme el tiempo de entrega._`);
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* FILTRO SVG DE VISCOSIDAD (EFECTO GEL) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-viscosity">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="50" lightingColor="#FFFFFF" result="spec">
            <fePointLight x="-5000" y="-10000" z="10000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
        </filter>
      </svg>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');

        .text-gel {
          font-family: 'Titan One', cursive;
          filter: url(#gel-viscosity);
          line-height: 1.1;
        }

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

        .featured-card { 
          border: 3px solid #E91E63; 
          border-radius: 45px;
          padding: 40px;
          background: white;
          position: relative;
          overflow: visible;
          box-shadow: 0 20px 50px rgba(233, 30, 99, 0.1);
          transition: 0.4s;
        }

        .bottle-float {
          position: absolute;
          top: -70px;
          right: -10px;
          width: 190px;
          filter: drop-shadow(0 25px 35px rgba(0,0,0,0.25));
          z-index: 10;
          pointer-events: none;
          transition: transform 0.5s ease;
        }

        .featured-card:hover .bottle-float {
          transform: translateY(-10px) rotate(3deg) scale(1.05);
        }

        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 18px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        .btn-main:active { transform: scale(0.96); }

        .nav-glass {
          position: sticky; top: 0; z-index: 1000; padding: 20px 30px; 
          display: flex; justifyContent: space-between; alignItems: center; 
          background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);
          border-bottom: 1px solid ${CELESTE_LOGO}22;
        }
      ` }} />

      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}

      <nav className="nav-glass" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <img src="/logo-quito-fresh.png" alt="Logo" style={{ height: '50px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '12px' }}>
          MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontWeight: 900, fontSize: '3.5rem', lineHeight: 0.9, margin: '0 0 30px' }}>
          TU VIDA <span style={{ color: CELESTE_LOGO }}>SALUDABLE</span><br/>EMPIEZA AQUÍ.
        </h1>
        <img src="/hero-image.png" alt="Quito Fresh Hero" style={{ maxWidth: '300px', margin: '0 auto' }} />
      </header>

      {/* SECCIÓN MISIÓN/VISIÓN */}
      <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#F9F9F9', padding: '40px', borderRadius: '35px' }}>
          <h3 className="text-gel" style={{ color: CELESTE_LOGO, fontSize: '1.5rem', marginBottom: '15px' }}>NUESTRA MISIÓN</h3>
          <p style={{ fontSize: '14px', color: '#555' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina.</p>
        </div>
        <div style={{ background: '#F9F9F9', padding: '40px', borderRadius: '35px' }}>
          <h3 className="text-gel" style={{ color: CELESTE_LOGO, fontSize: '1.5rem', marginBottom: '15px' }}>NUESTRA VISIÓN</h3>
          <p style={{ fontSize: '14px', color: '#555' }}>Ser líderes en bienestar premium en Ecuador.</p>
        </div>
        <div style={{ background: CELESTE_LOGO, padding: '40px', borderRadius: '35px', color: 'white' }}>
          <h3 style={{ fontWeight: 900, marginBottom: '5px' }}>LLEVANDO FELICIDAD</h3>
          <div style={{ fontSize: '3rem', fontWeight: 900 }}>2026</div>
          <p style={{ fontSize: '14px' }}>Frescura absoluta del campo directamente a tu mano.</p>
        </div>
      </section>

      {/* SURTIDO PREMIUM CON BOTELLA FLOTANTE */}
      <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 className="text-gel" style={{ color: CELESTE_LOGO, fontSize: '3.5rem', textAlign: 'center', marginBottom: '100px' }}>
          NUESTRO SURTIDO PREMIUM
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px 30px' }}>
          {products.map(p => (
            <div key={p.id} className={p.id === 1 ? 'featured-card' : ''} style={p.id !== 1 ? { border: '1.5px solid #EEE', borderRadius: '40px', padding: '40px', textAlign: 'center', opacity: p.available ? 1 : 0.6 } : {}}>
              
              {p.id === 1 && (
                <div className="bottle-float">
                  <img src={BOTELLA_MARACUMORA} alt="Maracumora Ultra Fresh" style={{ width: '100%' }} />
                </div>
              )}

              <div style={{ position: 'relative', zIndex: 5 }}>
                <div style={{ color: p.accent, fontWeight: 900, fontSize: '11px', marginBottom: '10px' }}>{p.tag}</div>
                <h3 className="text-gel" style={{ fontSize: '2.5rem', color: p.accent, marginBottom: '10px' }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '25px', maxWidth: p.id === 1 ? '180px' : '100%' }}>{p.desc}</p>
                
                {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '25px' }}>${p.price.toFixed(2)}</div>}
                
                <button 
                  onClick={() => addToCart(p)}
                  disabled={!p.available}
                  className="btn-main" 
                  style={{ background: p.available ? p.accent : '#F0F0F0', color: p.available ? 'white' : '#CCC' }}
                >
                  {p.available ? 'AÑADIR AL PACK' : 'PRÓXIMAMENTE'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER ORCA STUDIOS */}
      <footer style={{ background: '#000', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <img src="/logo-footer.png" alt="Quito Fresh" style={{ height: '40px', marginBottom: '20px', filter: 'brightness(2)' }} />
        <p style={{ fontSize: '10px', opacity: 0.4, letterSpacing: '1px' }}>
          HECHO POR ECOS BRANDING & <strong>ORCA STUDIOS</strong> © 2026.
        </p>
      </footer>

      {/* CARRITO LATERAL */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 50px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE' }}>
            <span style={{ fontWeight: 900 }}>TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontWeight: 900, color: i.accent }}>{i.name}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #DDD' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #DDD' }}>+</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: '1px solid #EEE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900, marginBottom: '20px' }}>
                <span>TOTAL</span>
                <span style={{ color: CELESTE_LOGO }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
