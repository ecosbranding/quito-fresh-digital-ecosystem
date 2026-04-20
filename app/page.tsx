"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);
  
  // NUEVO ESTADO PARA LA RUEDA (DENTRO DEL COMPONENTE BASE)
  const [activeProductId, setActiveProductId] = useState(1);
  const wheelRef = useRef(null);

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
          margin-bottom: 70px;
          line-height: 1.1;
          filter: url(#gel-viscosity);
        }

        .titulo-seccion-gel {
          font-family: 'Titan One', cursive;
          color: ${CELESTE_LOGO};
          margin-bottom: 20px;
          font-size: 1.8rem;
          text-transform: uppercase;
          filter: url(#gel-viscosity);
        }

        /* ESTILOS DE LA RUEDA DE PRODUCTOS */
        .wheel-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 50px;
          padding: 80px 20%;
          scrollbar-width: none;
        }
        .wheel-container::-webkit-scrollbar { display: none; }

        .wheel-item {
          flex: 0 0 320px;
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        .vertical-name {
          position: absolute;
          left: -110px;
          top: 45%;
          transform: translateY(-50%) rotate(-90deg);
          font-family: 'Titan One', cursive;
          font-size: 3.8rem;
          white-space: nowrap;
          pointer-events: none;
          transition: 0.5s ease;
          z-index: 1;
        }

        .bottle-main {
          width: 200px;
          transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 2;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15));
        }

        .bottle-ghost { opacity: 0.04; filter: grayscale(1) blur(1px); }

        .product-info-reveal {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: 0.6s ease;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          width: 280px;
          border-radius: 35px;
          border: 1px solid #F0F0F0;
          text-align: center;
          margin-top: -20px;
          z-index: 5;
        }
        .product-info-reveal.active {
          max-height: 400px;
          opacity: 1;
          margin-top: 25px;
          padding: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.06);
        }

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

        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
      ` }} />

      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}

      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      <header style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#FDFDFD' }}>
        <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '0 auto', display: 'block' }} />
      </header>

      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="titulo-seccion-gel">Nuestra Misión</h3>
            <p>Nutrir a nuestra comunidad con extractos puros de la tierra andina.</p>
          </div>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="titulo-seccion-gel">Nuestra Visión</h3>
            <p>Ser líderes en bienestar premium en Ecuador.</p>
          </div>
          <div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 1 }}>2026</div>
            <p>Frescura absoluta del campo directamente a tu mano.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN PRODUCTOS ACTUALIZADA A FORMATO RUEDA */}
      <section style={{ padding: '100px 0', position: 'relative' }}>
        <h2 className="text-surtido-gel">NUESTRO SURTIDO PREMIUM</h2>
        
        <div className="wheel-container" ref={wheelRef}>
          {products.map(p => (
            <div key={p.id} className="wheel-item" onClick={() => setActiveProductId(p.id)}>
              <div className="vertical-name" style={{ 
                color: p.available ? p.accent : '#EEE', 
                opacity: activeProductId === p.id ? 1 : 0.15,
                filter: activeProductId === p.id ? 'url(#gel-viscosity)' : 'none',
                transform: `translateY(-50%) rotate(-90deg) scale(${activeProductId === p.id ? 1.1 : 0.9})`
              }}>
                {p.name}
              </div>
              
              <img 
                src={p.id === 1 ? BOTELLA_MARACUMORA_ASSET : BOTELLA_MARACUMORA_ASSET} 
                className={`bottle-main ${!p.available ? 'bottle-ghost' : ''}`}
                style={{ transform: activeProductId === p.id ? 'scale(1.2)' : 'scale(0.85)' }}
              />

              <div className={`product-info-reveal ${activeProductId === p.id ? 'active' : ''}`}>
                <div style={{ color: p.accent, fontWeight: 900, fontSize: '11px', marginBottom: '10px' }}>{p.tag}</div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>{p.desc}</p>
                {p.available ? (
                  <>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>$1.00</div>
                    <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
                  </>
                ) : (
                  <div style={{ fontWeight: 900, color: '#CCC' }}>PRÓXIMAMENTE</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '55px', marginBottom: '30px', filter: 'brightness(2)' }} />
        <div style={{ fontSize: '10px', opacity: 0.4 }}>ECOS Branding & ORCA Studios © 2026.</div>
      </footer>

      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{ flex: 1 }}>
                  <div className="text-bold" style={{ fontSize: '1.2rem', color: i.accent }}>{i.name}</div>
                  <div style={{ fontSize: '13px', color: CELESTE_LOGO }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)}>+</button>
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
    </div>
  );
}
