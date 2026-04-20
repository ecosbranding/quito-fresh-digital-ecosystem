"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // Mantenemos el estado de partículas para no romper referencias si las usas luego
  const [fogParticles, setFogParticles] = useState([]);
  // ESTADO PARA LA RUEDA (NUEVO)
  const [activeProductId, setActiveProductId] = useState(null);

  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; 
  const BOTELLA_MARACUMORA_ASSET = "/1000788391.png";

  useEffect(() => {
    setMounted(true);
    
    // SEO & META (TU CÓDIGO ORIGINAL INTACTO)
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
      `*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n*────────────────────*\n\n` +
      `Hola, quiero elevar mi energía con el siguiente Pack:\n\n${itemsText}\n\n` +
      `*────────────────────*\n💰 *TOTAL A PAGAR: $${total}*\n*────────────────────*\n\n` +
      `📍 _Por favor, confírmenme el tiempo de entrega para disfrutar de mi extracto 100% puro._`
    );
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* GOTAS DE SUDOR FRÍO - REEMPLAZO DE NIEBLA */}
      <div className="sweat-overlay">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="sweat-drop" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 5}s` }}></div>
        ))}
      </div>

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
        
        .sweat-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5; }
        .sweat-drop { position: absolute; width: 2px; height: 12px; background: rgba(0, 173, 239, 0.15); border-radius: 10px; top: -20px; animation: sweatFall linear infinite; }
        @keyframes sweatFall { to { transform: translateY(110vh); } }

        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .text-surtido-gel { font-family: 'Titan One', cursive; color: ${CELESTE_LOGO}; text-align: center; font-size: 4rem; margin-bottom: 70px; line-height: 1.1; filter: url(#gel-viscosity); }
        .titulo-seccion-gel { font-family: 'Titan One', cursive; color: ${CELESTE_LOGO}; margin-bottom: 20px; font-size: 1.8rem; text-transform: uppercase; filter: url(#gel-viscosity); }
        
        /* ESTILOS DE LA RUEDA - CAPTURA 1 Y 2 */
        .wheel-wrapper { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 60px; padding: 40px 10% 200px; scrollbar-width: none; }
        .wheel-wrapper::-webkit-scrollbar { display: none; }
        .product-item { flex: 0 0 280px; scroll-snap-align: center; position: relative; display: flex; flex-direction: column; align-items: center; }
        
        .vertical-label { 
          position: absolute; left: -10px; top: 50%; transform: rotate(-90deg) translateY(-50%); 
          font-family: 'Titan One', cursive; font-size: 3.5rem; transition: 0.3s; z-index: 1; pointer-events: none;
        }

        .bottle-img { width: 180px; z-index: 2; cursor: pointer; transition: 0.3s; }
        .bottle-img:hover { transform: scale(1.05); }
        .bottle-next { filter: blur(3px) grayscale(0.6); opacity: 0.5; }

        .info-popup { 
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.7); 
          width: 300px; background: white; border-radius: 35px; padding: 30px; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.15); z-index: 100; opacity: 0; pointer-events: none; 
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 1px solid #F0F0F0; text-align: center;
        }
        .info-popup.active { opacity: 1; transform: translate(-50%, -50%) scale(1); pointer-events: auto; }
        
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
      ` }} />

      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      <header style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#FDFDFD' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontWeight: 900, fontSize: '12px', color: CELESTE_LOGO, marginBottom: '20px' }}>FRESCURA PURA</div>
          <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
          <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '0 auto', display: 'block' }} />
        </div>
      </header>

      {/* SECCIONES MISIÓN/VISIÓN (TU CÓDIGO ORIGINAL) */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="titulo-seccion-gel">Nuestra Misión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina.</p>
          </div>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="titulo-seccion-gel">Nuestra Visión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Ser líderes en bienestar premium en Ecuador.</p>
          </div>
          <div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: 'white' }}>
            <h3 className="text-bold" style={{ fontSize: '1.2rem' }}>Llevando Felicidad</h3>
            <div className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 1 }}>2026</div>
          </div>
        </div>
      </section>

      {/* SECCIÓN RUEDA CORREGIDA (CAPTURA 1 Y 2) */}
      <section style={{ padding: '80px 0' }}>
        <h2 className="text-surtido-gel">NUESTRO SURTIDO</h2>
        <div className="wheel-wrapper">
          {products.map(p => (
            <div key={p.id} className="product-item">
              <div className="vertical-label" style={{ color: p.accent, opacity: p.available ? 0.7 : 0.2, filter: p.available ? 'none' : 'blur(2px)' }}>{p.name}</div>
              <img 
                src={BOTELLA_MARACUMORA_ASSET} 
                className={`bottle-img ${!p.available ? 'bottle-next' : ''}`} 
                onClick={() => setActiveProductId(activeProductId === p.id ? null : p.id)}
              />
              <div className={`info-popup ${activeProductId === p.id ? 'active' : ''}`}>
                <div style={{ textAlign: 'right', cursor: 'pointer', fontWeight: 900 }} onClick={() => setActiveProductId(null)}>✕</div>
                <div style={{ color: p.accent, fontWeight: 900, fontSize: '10px' }}>{p.tag}</div>
                <h3 style={{ fontFamily: 'Titan One', color: p.accent, fontSize: '2rem', margin: '10px 0' }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: '#666' }}>{p.desc}</p>
                {p.available ? (
                  <>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '15px 0' }}>$1.00</div>
                    <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
                  </>
                ) : (
                  <div style={{ marginTop: '20px', color: '#999', fontWeight: 900 }}>PRÓXIMAMENTE</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: '#000', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" style={{ height: '55px', marginBottom: '20px', filter: 'brightness(2)' }} />
        <div style={{ fontSize: '10px', opacity: 0.4 }}>Hecho por ECOS Branding & ORCA Studios © 2026.</div>
      </footer>

      {/* CARRITO (TU LÓGICA ORIGINAL RESTAURADA) */}
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
                  <div style={{ fontSize: '13px', color: CELESTE_LOGO, fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>+</button>
                  <button onClick={() => removeItem(i.id)}>❌</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: `1px solid ${CELESTE_LOGO}22` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '20px' }}>
                <span>TOTAL</span>
                <span style={{ color: CELESTE_LOGO }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              <button onClick={clearCart} style={{ width: '100%', marginBottom: '10px', background: 'none', border: '1px solid #DDD', borderRadius: '50px', padding: '10px' }}>VACIAR PACK</button>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
