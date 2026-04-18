"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshMaestroFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; 

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
    forceMeta('og:description', 'Extractos puros prensados en frío de los Andes.');
    forceMeta('og:image', IMAGE_URL);
    forceMeta('og:url', SITE_URL);
  }, []);

  const products = [
    { id: 1, name: "Maracumora", desc: "La fusión perfecta: Maracuyá y Mora silvestre.", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "Green Boost", desc: "Manzana verde, Apio, Espinaca y un toque de Jengibre.", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "Berry Bliss", desc: "Mix de frutos rojos seleccionados.", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "Vital Roots", desc: "Remolacha, Zanahoria y Naranja premium.", price: null, accent: "#D32F2F", tag: "PRÓXIMAMENTE", available: false }
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
    const header = `*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n\n`;
    const items = cart.map(i => `🥤 *${i.name.toUpperCase()}*\n   ${i.qty} unidades — $${(i.price * i.qty).toFixed(2)}`).join('\n\n');
    const message = encodeURIComponent(`${header}Hola, quiero mi Pack Saludable:\n\n${items}\n\n*TOTAL: $${total}*\n\n✨ _Orden generada en quitofresh.app_`);
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-viscosity">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="30" lightingColor="#CEE9F2" result="spec">
            <fePointLight x="-5000" y="-10000" z="10000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </svg>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Inter:wght@400;900&display=swap');

        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        
        .text-gel-caramelo-premium {
          font-family: 'Titan One', cursive;
          color: white;
          text-shadow: 
            0px 4px 0px rgba(0,0,0,0.1), 
            0px 0px 30px ${CELESTE_LOGO},
            0px 0px 50px ${CELESTE_LOGO}99;
          filter: url(#gel-viscosity);
          line-height: 1.1;
        }

        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: white; position: relative; z-index: 2; }
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        
        .sensory-fog-layer {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 10;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(240, 248, 255, 0.4) 100%);
          animation: fogBreathe 8s ease-in-out infinite;
        }

        @keyframes fogBreathe {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      ` }} />

      <div className="sensory-fog-layer"></div>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '55px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO */}
      <header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center', overflow: 'hidden' }}>
        <img src="1000786975.png" style={{ position: 'absolute', top: '-50px', right: '-100px', width: '400px', opacity: 0.6 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9 }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
          <img src="1000786698.png" style={{ maxWidth: '350px', margin: '40px auto', display: 'block' }} />
        </div>
      </header>

      {/* PRODUCTOS */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-gel-caramelo-premium" style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '60px', color: '#1A1A1A' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card" style={{ borderColor: p.available ? p.accent : '#EEE' }}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-gel-caramelo-premium" style={{ fontSize: '2.5rem', color: p.available ? p.accent : '#999' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#888', margin: '20px 0' }}>{p.desc}</p>
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
            <span className="text-bold">TU PACK</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div><div className="text-bold" style={{ color: i.accent }}>{i.name}</div><div>${(i.price * i.qty).toFixed(2)}</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)}>-</button><span style={{fontWeight:900}}>{i.qty}</span><button onClick={() => updateQty(i.id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '30px', borderTop: '1px solid #EEE' }}>
             <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP 📲</button>
          </div>
        </div>
      )}
    </div>
  );
}
