"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);
  
  // Lógica para la rotación de botellas
  const [activeIndex, setActiveIndex] = useState(0);

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

        /* DISEÑO DE LA RUEDA 3D - UNA DETRÁS DE OTRA */
        .wheel-perspective {
          perspective: 2000px;
          height: 650px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .bottle-container {
          position: absolute;
          transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
          will-change: transform, opacity;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bottle-main-img {
          width: 240px;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1));
          z-index: 10;
        }

        /* NOMBRE VERTICAL SEGÚN SEÑALAMIENTO */
        .name-tag-vertical {
          position: absolute;
          left: -100px;
          top: 40%;
          transform: translateY(-50%) rotate(-90deg);
          font-family: 'Titan One', cursive;
          font-size: 3.5rem;
          white-space: nowrap;
          pointer-events: none;
          filter: url(#gel-viscosity);
          opacity: 0;
          transition: 0.5s;
        }
        .active .name-tag-vertical { opacity: 1; left: -120px; }

        .product-info-overlay {
          margin-top: -30px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          padding: 25px;
          border-radius: 30px;
          border: 1.5px solid #EEE;
          text-align: center;
          width: 300px;
          opacity: 0;
          transform: translateY(20px);
          transition: 0.5s;
          z-index: 5;
        }
        .active .product-info-overlay { opacity: 1; transform: translateY(0); }

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

        .sensory-fog-layer {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 1;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(240, 248, 255, 0.4) 100%);
          animation: fogBreathe 8s ease-in-out infinite;
        }
        @keyframes fogBreathe {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
      ` }} />

      {fogParticles.map(p => (
        <div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}

      <div className="sensory-fog-layer"></div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      <header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center', overflow: 'hidden', backgroundColor: '#FDFDFD' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontWeight: 900, fontSize: '12px', color: CELESTE_LOGO, marginBottom: '20px' }}>FRESCURA PURA</div>
          <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
          <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '0 auto', display: 'block' }} />
        </div>
      </header>

      {/* SECCIÓN MISIÓN / VISIÓN (RESTAURADA) */}
      <section style={{ position: 'relative', padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', position: 'relative', zIndex: 2 }}>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="titulo-seccion-gel">Nuestra Misión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina.</p>
          </div>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="titulo-seccion-gel">Nuestra Visión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Ser líderes en bienestar premium en Ecuador.</p>
          </div>
          <div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="text-bold" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Llevando Felicidad</h3>
            <div className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '15px' }}>2026</div>
            <p style={{ fontSize: '15px', lineHeight: 1.8 }}>Frescura absoluta del campo directamente a tu mano.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTOS CON RUEDA 3D ACTUALIZADA */}
      <section style={{ padding: '100px 20px', position: 'relative', zIndex: 2 }}>
        <h2 className="text-surtido-gel">NUESTRO SURTIDO PREMIUM</h2>
        
        <div className="wheel-perspective">
          {products.map((p, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;

            return (
              <div 
                key={p.id}
                className={`bottle-container ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateX(${offset * 120}px) translateZ(${-Math.abs(offset) * 250}px) rotateY(${offset * -15}deg)`,
                  zIndex: 100 - Math.abs(offset),
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                  filter: !isActive ? 'brightness(0.6) blur(2px)' : 'none'
                }}
              >
                {/* NOMBRE VERTICAL AL COSTADO */}
                <div className="name-tag-vertical" style={{ color: p.available ? p.accent : '#CCC' }}>
                  {p.name}
                </div>

                <img src={BOTELLA_MARACUMORA_ASSET} alt={p.name} className="bottle-main-img" style={isActive ? { filter: `drop-shadow(0 30px 50px ${p.accent}33)` } : {}} />

                <div className="product-info-overlay">
                  <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '10px' }}>{p.tag}</div>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>{p.desc}</p>
                  {p.available ? (
                    <>
                      <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>${p.price.toFixed(2)}</div>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
                    </>
                  ) : (
                    <button disabled style={{ background: '#F5F5F5', color: '#BBB', border: 'none', padding: '15px', borderRadius: '50px', fontWeight: 900, width: '100%' }}>PRÓXIMAMENTE</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER (RESTAURADO) */}
      <footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 20 }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '55px', marginBottom: '30px', filter: 'brightness(2)' }} />
        <div style={{ fontSize: '10px', opacity: 0.4, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Hecho por <span style={{ fontWeight: 800 }}>ECOS Branding</span> & <span style={{ fontWeight: 800 }}>ORCA Studios</span> © 2026.
        </div>
      </footer>

      {/* CARRITO (RESTAURADO) */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{ flex: 1 }}>
                  <div className="text-bold" style={{ fontSize: '1.2rem', color: i.accent }}>{i.name}</div>
                  <div style={{ fontSize: '13px', color: CELESTE_LOGO, fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>+</button>
                  <button onClick={() => removeItem(i.id)} style={{ marginLeft: '5px', border: 'none', background: 'none' }}>❌</button>
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
              <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #DDD', color: '#999', padding: '12px', borderRadius: '50px', marginBottom: '15px' }}>VACIAR TODO</button>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
